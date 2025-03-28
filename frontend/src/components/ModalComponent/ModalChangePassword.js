import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import API, { refreshAccessToken } from "../../utils/axiosInstance";
import { useHotelBooking } from "../../context/HotelBookingContext"; // Lấy từ Context

const ModalChangePassword = ({
  isModalChangePassword,
  setIsModalChangePassword,
}) => {
  const [form] = Form.useForm();
  const { accessToken, setAccessToken } = useHotelBooking(); // ✅ Lấy từ Context

  const onFinish = async (values) => {
    if (!values.oldPassword || !values.newPassword) {
      message.error("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await API.patch(
        "/user/change-password",
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      message.success("✅ Đổi mật khẩu thành công!");
      setIsModalChangePassword(false);
      form.resetFields();
    } catch (error) {
      console.error("❌ Lỗi đổi mật khẩu:", error);

      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message || "Đổi mật khẩu thất bại!";

      if (status === 401) {
        // Kiểm tra nội dung lỗi để phân biệt lỗi mật khẩu sai và token hết hạn
        if (errorMessage.includes("Mật khẩu cũ không đúng")) {
          message.error("❌ Mật khẩu cũ không đúng!");
        } else {
          if (!localStorage.getItem("refreshAttempted")) {
            localStorage.setItem("refreshAttempted", "true");

            const newToken = await refreshAccessToken();
            if (newToken) {
              setAccessToken(newToken);
              message.info("🔄 Token đã cập nhật, vui lòng thử lại!");
            } else {
              message.error(
                "❌ Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!"
              );
            }

            localStorage.removeItem("refreshAttempted");
          }
        }
      } else {
        message.error(errorMessage);
      }
    }
  };

  return (
    <Modal
      title="Thay đổi mật khẩu"
      open={isModalChangePassword}
      footer={null}
      onCancel={() => setIsModalChangePassword(false)}
    >
      <Form
        form={form}
        name="changePassword"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangePassword;
