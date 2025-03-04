import AboutUs from "../pages/AboutUsPage";
import AllNewsPage from "../pages/AllNewsPage";
import CustomerPage from "../pages/CustomerPage";
import DiscountDetail from "../pages/DiscountDetail";
import FeedbackDetail from "../pages/FeedBackDetail";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginSuccess from "../pages/LoginSuccess";
import NewsDetail from "../pages/NewsDetail";
import OfferPage from "../pages/OfferPage";
import OnlyDiscount from "../pages/OnlyDiscount";
import OnlyFeedbacks from "../pages/OnlyFeedback";
import OnlyNew from "../pages/OnlyNew";
import ProfilePage from "../pages/ProfilePage";
import RoomListPage from "../pages/RoomListPage";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import ContactPage from "../pages/ContactPage";

export const routes = [
  {
    path: "/Blog",
    page: AllNewsPage,
    isShowHeader: true,
  },
  {
    path: "/onlyNew",
    page: OnlyNew,
    isShowHeader: true,
  },
  {
    path: "/onlyDiscount",
    page: OnlyDiscount,
    isShowHeader: true,
  },
  {
    path: "/onlyFeedbacks",
    page: OnlyFeedbacks,
    isShowHeader: true,
  },
  {
    path: "/news/:id",
    page: NewsDetail,
    isShowHeader: true,
  },
  {
    path: "/discount/:id",
    page: DiscountDetail,
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
    path: "/customer",
    page: CustomerPage,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/offer",
    page: OfferPage,
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
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
    isPrivate: false,
  },
];
