import { useState } from "react";
import { Card, Avatar } from "antd";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { LuUserPen } from "react-icons/lu";
import styled from "styled-components";
import { useHotelBooking } from "../context/HotelBookingContext";
import ModalUpdateProfile from "../components/ModalComponent/ModalUpdateProfile";
import ModalChangePassword from "../components/ModalComponent/ModalChangePassword";

const ProfileSection = styled.section`
  height: 60vh;
  display: flex;
  justify-content: center;
  padding: 40px;
  background-color: #f3f4f6;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const GradientBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
  background: linear-gradient(to bottom right, #f6d365, #fd9f85);
`;

const IconContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const InfoBox = styled.div`
  width: 60%;
  padding: 20px;
  background: white;
`;

const Divider = styled.hr`
  margin: 10px 0;
`;

const ProfilePage = () => {
  const { user, setUser, accessToken, setAccessToken } = useHotelBooking();

  const [isModalUpdateProfile, setIsModalUpdateProfile] = useState(false);
  const [isModalChangePassword, setIsModalChangePassword] = useState(false);

  const showModalUpdateProfile = () => {
    setIsModalUpdateProfile(true);
  };

  const showModalChangePassword = () => {
    setIsModalChangePassword(true);
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        <GradientBox>
          <Avatar
            size={80}
            src={
              user?.avatar ||
              "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            }
          />
          <h5 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
            {user?.full_name}
          </h5>
          <IconContainer>
            <LuUserPen
              style={{ fontSize: "1.25rem" }}
              onClick={showModalUpdateProfile}
            />
            {user?.authProvider === "local" && (
              <AiOutlineUserSwitch
                style={{ fontSize: "1.25rem" }}
                onClick={showModalChangePassword}
              />
            )}
          </IconContainer>
        </GradientBox>
        <InfoBox>
          <Card.Meta
            title="Information"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          />
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              color: "gray",
              marginBottom: "12px",
            }}
          >
            <div>
              <h6 style={{ fontWeight: "bold" }}>Email</h6>
              <p>{user?.email || "Chưa có email"}</p>
            </div>
            <div>
              <h6 style={{ fontWeight: "bold" }}>Số điện thoại</h6>
              <p>{user?.phone || "Chưa có số điện thoại"}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              color: "gray",
              marginBottom: "12px",
            }}
          >
            <div>
              <h6 style={{ fontWeight: "bold" }}>Ngày tạo tài khoản</h6>
              <p>{user?.createdAt || "Không có ngày tạo"}</p>
            </div>
          </div>
        </InfoBox>
      </ProfileContainer>
      <ModalUpdateProfile
        isModalUpdateProfile={isModalUpdateProfile}
        setIsModalUpdateProfile={setIsModalUpdateProfile}
        profile={user}
        setUser={setUser}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
      <ModalChangePassword
        isModalChangePassword={isModalChangePassword}
        setIsModalChangePassword={setIsModalChangePassword}
      />
    </ProfileSection>
  );
};

export default ProfilePage;
