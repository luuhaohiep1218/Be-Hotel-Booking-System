import AboutUs from "../pages/AboutUsPage";
import AllNewsPage from "../pages/AllNewsPage";
import FeedbackDetail from "../pages/FeedBackDetail";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginSuccess from "../pages/LoginSuccess";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import NewsDetail from "../pages/NewsDetail";
import RoomListPage from "../pages/RoomListPage";
import ServiceDetail from "../pages/ServiceDetail";
import { ManageService } from "../pages/ManageService";

import TestServiceDetail from "../pages/TestServiceDetail";

export const routes = [
  {
    path: "/Blog",
    page: AllNewsPage,
    isShowHeader: true,
  },
  {
    path: "/Blog/:blogId",
    page: NewsDetail,
    isShowHeader: true,
  },
  {
    path: "/feedback/:id",
    page: FeedbackDetail,
    isShowHeader: true,
  },
  {
    path: "/service",
    page: ServicePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/service/:serviceId",
    page: ServiceDetail,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/service-detail",
    page: TestServiceDetail,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/signup",
    page: SignupPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/feedback",
    page: FeedbackPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "/login-success",
    page: LoginSuccess,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/us",
    page: AboutUs,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/room-list",
    page: RoomListPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "/manage-service",
    page: ManageService,
    isShowHeader: true,
    isPrivate: false,
  }
];
