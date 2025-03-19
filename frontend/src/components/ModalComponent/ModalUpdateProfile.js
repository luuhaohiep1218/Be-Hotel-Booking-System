import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import API, { refreshAccessToken } from "../../utils/axiosInstance";

const ModalUpdateProfile = ({
  isModalUpdateProfile,
  setIsModalUpdateProfile,
  profile,
  setUser,
  accessToken,
  setAccessToken, // ✅ Nhận hàm cập nhật token từ context
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue(profile);
    }
  }, [profile, form, isModalUpdateProfile]);

  const onFinish = async (values) => {
    if (!accessToken) {
      message.error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại!");
      return;
    }

    setLoading(true);
    try {
      const response = await API.patch("/user/update-profile", values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      message.success("Hồ sơ cập nhật thành công! 🎉");

      setUser((prevUser) => ({
        ...prevUser,
        ...response.data,
      }));
      setIsModalUpdateProfile(false); // ✅ Đóng modal
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("🔄 Token hết hạn, thử refresh...");
        const newToken = await refreshAccessToken();

        if (newToken) {
          setAccessToken(newToken); // ✅ Cập nhật token mới
          try {
            // ✅ Thử gửi lại request với token mới ngay lập tức
            const retryResponse = await API.patch(
              "/user/update-profile",
              values,
              {
                headers: { Authorization: `Bearer ${newToken}` },
              }
            );

            console.log(
              "✅ Cập nhật thành công (sau refresh):",
              retryResponse.data
            );
            message.success("Hồ sơ cập nhật thành công! 🎉");

            setUser(retryResponse.data);
            setIsModalUpdateProfile(false);
            return;
          } catch (retryError) {
            console.error("❌ Lỗi sau khi refresh token:", retryError);
            message.error("Cập nhật thất bại! Vui lòng thử lại.");
          }
        } else {
          message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
          return;
        }
      }

      const errorMsg =
        error.response?.data?.message || "Cập nhật thất bại! Vui lòng thử lại.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật hồ sơ"
      open={isModalUpdateProfile}
      footer={null}
      onCancel={() => setIsModalUpdateProfile(false)}
    >
      <Form
        form={form}
        name="update-profile"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={profile}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đầy đủ"
          name="full_name"
          rules={[{ required: true, message: "Vui lòng nhập tên đầy đủ" }]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => setIsModalUpdateProfile(false)}
            disabled={loading}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateProfile;
