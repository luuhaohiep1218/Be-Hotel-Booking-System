import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import API, { refreshAccessToken } from "../../utils/axiosInstance";

const ModalUpdateProfile = ({
  isModalUpdateProfile,
  setIsModalUpdateProfile,
  profile,
  setUser,
  accessToken,
  setAccessToken,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Khi mở modal, cập nhật dữ liệu form
  useEffect(() => {
    if (profile && isModalUpdateProfile) {
      form.setFieldsValue(profile); // ✅ Đảm bảo form luôn cập nhật
    }
  }, [profile, isModalUpdateProfile, form]);

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
      setIsModalUpdateProfile(false);
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          setAccessToken(newToken); // ✅ Cập nhật token mới
          try {
            // ✅ Thử gửi lại request với token mới
            const retryResponse = await API.patch(
              "/user/update-profile",
              values,
              {
                headers: { Authorization: `Bearer ${newToken}` },
              }
            );

            message.success("Hồ sơ cập nhật thành công! 🎉");

            setUser(retryResponse.data);
            setIsModalUpdateProfile(false);
          } catch (retryError) {
            console.error("❌ Lỗi sau khi refresh token:", retryError);
            message.error("Cập nhật thất bại! Vui lòng thử lại.");
          }
        } else {
          message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        }
      } else {
        const errorMsg =
          error.response?.data?.message ||
          "Cập nhật thất bại! Vui lòng thử lại.";
        message.error(errorMsg);
      }
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
      destroyOnClose // ✅ Giải phóng bộ nhớ khi đóng modal
    >
      <Form
        form={form}
        name="update-profile"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
