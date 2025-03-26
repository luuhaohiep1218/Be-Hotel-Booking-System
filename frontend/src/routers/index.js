import AboutUs from "../pages/AboutUsPage";
import AdminManageAccount from "../pages/AdminAccountPage";
import AdminDashboard from "../pages/Admindashboard";
import AdminServicePage from "../pages/AdminService";
import AllNewsPage from "../pages/AllNewsPage";
import CheckoutPage from "../pages/CheckOutPage";
import FeedbackDetail from "../pages/FeedBackDetail";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginSuccess from "../pages/LoginSuccess";
import ManageRoom from "../pages/ManageRoom";
import ManageService from "../pages/ManageService";
import Mktdashboard from "../pages/MktDashboard";
import FeedbackListPage from "../pages/MktFeedbackList";
import MktCustomerList from "../pages/MktListCustomer";
import MktPostList from "../pages/MktPostList";
import NewsDetail from "../pages/NewsDetail";
import ProfilePage from "../pages/ProfilePage";
import RoomDetail from "../pages/RoomDetail";
import RoomListPage from "../pages/RoomListPage";
import ServiceDetail from "../pages/ServiceDetail";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import StaffDashboard from "../pages/StaffDashboard";
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
    allowedRoles: ["MARKETING"],
  },
  {
    path: "/mktPostList",
    page: MktPostList,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["MARKETING"],
  },
  {
    path: "/mktCustomerList",
    page: MktCustomerList,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["MARKETING"],
  },
  {
    path: "/mktfeedbacklist",
    page: FeedbackListPage,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["MARKETING"],
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
    path: "room/:roomName",
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
    path: "/return-vnpay",
    page: VNPayReturn,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "/admin",
    page: AdminManageAccount,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/admin-dashboard",
    page: AdminDashboard,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/admin-service",
    page: AdminServicePage,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/manage-service",
    page: ManageService,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["STAFF", "ADMIN"],
  },
  {
    path: "/staff-dashboard",
    page: StaffDashboard,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["STAFF"],
  },
  {
    path: "/manage-room",
    page: ManageRoom,
    isShowHeader: false,
    isPrivate: true,
    allowedRoles: ["STAFF", "ADMIN"],
  },
];
