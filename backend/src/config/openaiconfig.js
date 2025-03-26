require("dotenv").config();
const axios = require("axios");

const customPrompt = {
  "chào": "Chào bạn! Mình có thể giúp gì cho bạn?",
  "đặt phòng": `Bạn hãy làm theo các bước sau 
  B1: ấn vô nút đặt phòng trên trang web. 
  B2: Chọn phòng và số lượng phòng bạn mong muốn và ấn đặt ngay. 
  B3: Nhập thông tin của bạn.
  B4: Bạn hãy kiểm tra lại hóa đơn xem trước sau đó chọn phương thức thanh toán.
  B5: Ấn đặt phòng và trải nghiệm những dịch vụ tuyệt vời chúng tôi mang lại cho bạn.`,
  "Gợi ý phòng": "Bạn hãy đọc mô tả các phòng của chúng tôi để lựa chọn phòng theo giá tiền và nhu cầu cá nhân của bạn nha! Chúc bạn có kỳ nghỉ dưỡng tuyệt vời!",
  "Phòng rẻ nhất": "Hiện tại phòng rẻ nhất của chúng tôi đang là Standard Room",
  "Phòng đắt nhất": "Hiện tại phòng đắt nhất của chúng tôi đang là Luxury Room",
  "Phòng nào đẹp nhất": "Tất cả các phòng đều được thiết kế và trang trí rất đẹp, bạn có thể xem mô tả của từng phòng để chọn phòng phù hợp với nhu cầu của mình nhé!",
};

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

const openAIRequest = async (userInput) => {
  let tempalteResponse = null;
  
  // Kiểm tra xem câu hỏi của người dùng có khớp với customPrompt không
  for (let key in customPrompt) {
    if (userInput.toLowerCase().includes(key.toLowerCase().trim())) {
      tempalteResponse = customPrompt[key];
      break;
    }
  }
  if (tempalteResponse) {
    return tempalteResponse;
  }

  // Nếu không khớp, gọi OpenAI API
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4o-mini", // Sử dụng mô hình GPT-4 hoặc GPT-3.5
        messages: [{ role: "user", content: userInput }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    throw new Error("Lỗi khi gọi OpenAI API");
  }
};

module.exports = { openAIRequest };
