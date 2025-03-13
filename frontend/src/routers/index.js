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
import NewsDetail from "../pages/NewsDetail";
import ProfilePage from "../pages/ProfilePage";
import RoomDetail from "../pages/RoomDetail";
import RoomListPage from "../pages/RoomListPage";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import VNPayReturn from "../pages/VnpayReturn";
<<<<<<< HEAD
import MktPostList from "../pages/MktPostList";
=======
import AdminManageAccount from "../pages/AdminAccountPage";
>>>>>>> dca7ffadfec5b356b472428f91585362434edf1d

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
    path: "/payment-success",
    page: VNPayReturn,
    isShowHeader: true,
<<<<<<< HEAD
    isPrivate: false,
  },
=======
    isPrivate: false
  },
  {
    path:"/admin",
    page: AdminManageAccount,
    isShowHeader: true,
    isPrivate: false
  }

>>>>>>> dca7ffadfec5b356b472428f91585362434edf1d
];
