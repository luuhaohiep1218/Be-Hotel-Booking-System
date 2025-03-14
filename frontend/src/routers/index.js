import AboutUs from "../pages/AboutUsPage";
import AllNewsPage from "../pages/AllNewsPage";
import CheckoutPage from "../pages/CheckOutPage";
import FeedbackDetail from "../pages/FeedBackDetail";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginSuccess from "../pages/LoginSuccess";
import Mktdashboard from "../pages/MktDashboard";
import MktCustomerList from "../pages/MktListCustomer";
import MktPostList from "../pages/MktPostList";
import NewsDetail from "../pages/NewsDetail";
import ProfilePage from "../pages/ProfilePage";
import RoomDetail from "../pages/RoomDetail";
import RoomListPage from "../pages/RoomListPage";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import TestServiceDetail from "../pages/TestServiceDetail";
import VNPayReturn from "../pages/VnpayReturn";

export const routes = [
  {
    path: "/Blog",
    page: AllNewsPage,
    isShowHeader: true,
  },
  {
    path: "/mktdashboard",
    page: Mktdashboard,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/mktPostList",
    page: MktPostList,
    isShowHeader: false,
  },
  {
    path: "/mktCustomerList",
    page: MktCustomerList,
    isShowHeader: false,
    isPrivate: true,
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
    path: "room-detail/:roomId",
    page: RoomDetail,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/checkout",
    page: CheckoutPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {

    path:"/return-vnpay",
    page: VNPayReturn,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path:"/test-service",
    page: TestServiceDetail,
    isShowHeader: true,
  },
];
