const crypto = require("crypto");
const querystring = require("querystring");
const moment = require("moment");
require("dotenv").config();

const createVNPayPayment = (req, res) => {
  try {
    let { amount, orderId, returnUrl } = req.body;

    if (!amount || !orderId || !returnUrl) {
      return res.status(400).json({ message: "Thiếu thông tin thanh toán!" });
    }

    // Chuyển bookingId thành số nguyên để làm orderId
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "ID đơn hàng không hợp lệ!" });
    }

    const vnp_TmnCode = process.env.VNP_TMNCODE;
    const vnp_HashSecret = process.env.VNP_HASHSECRET;
    const vnp_Url = process.env.VNP_URL;
    const vnp_ReturnUrl = returnUrl;
    const createDate = moment().format("YYYYMMDDHHmmss");
    const orderInfo = `${orderId}`;
    const orderType = "other";
    const locale = "vn";
    const currCode = "VND";
    const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnp_TmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100, // VNPay yêu cầu nhân 100
      vnp_ReturnUrl: vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    console.log("🔹 VNPay Params Before Signing:", vnp_Params);

    vnp_Params = Object.fromEntries(
      Object.entries(vnp_Params).filter(([_, v]) => v != null)
    );

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

    const signData = querystring.stringify(sortedParams, "&", "=", {
      encodeURIComponent: encodeURIComponent,
    });

    console.log("🔹 Payment Sign Data:", signData);
    console.log("🔹 VNP_HASHSECRET:", vnp_HashSecret);

    const hmac = crypto.createHmac("sha512", vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    console.log("🔹 Generated Payment Hash:", signed);

    vnp_Params["vnp_SecureHash"] = signed;
    const paymentUrl = `${vnp_Url}?${querystring.stringify(vnp_Params)}`;

    console.log("🔹 VNPay Payment URL:", paymentUrl);
    res.json({ paymentUrl });
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán VNPay:", error);
    res.status(500).json({ message: "Lỗi server khi tạo thanh toán." });
  }
};

const handleVNPayReturn = (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

 const signData = Object.keys(sortedParams)
  .map(key => `${key}=${encodeURIComponent(sortedParams[key])}`)
  .join("&");


    console.log("🔹 VNP Params:", sortedParams);
    console.log("🔹 Sign Data:", signData);
    console.log("🔹 VNP_HASHSECRET:", process.env.VNP_HASHSECRET);

    const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    console.log("🔹 Generated Hash:", signed);
    console.log("🔹 Received Hash:", secureHash);

    if (secureHash === signed) {
      if (vnp_Params["vnp_ResponseCode"] === "00") {
        res.json({ success: true, message: "Thanh toán thành công!" });
      } else {
        res.json({ success: false, message: "Thanh toán thất bại!" });
      }
    } else {
      res.status(400).json({ success: false, message: "Chữ ký không hợp lệ!" });
    }
  } catch (error) {
    console.error("Lỗi xử lý phản hồi VNPay:", error);
    res.status(500).json({ message: "Lỗi server khi xử lý phản hồi VNPay." });
  }
};

module.exports = { createVNPayPayment, handleVNPayReturn };
