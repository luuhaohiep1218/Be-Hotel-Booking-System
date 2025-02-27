import AboutUs from "../pages/AboutUsPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import BookingHotelPage from "../pages/BookingHotelPage";
import CustomerPage from "../pages/CustomerPage";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginSuccess from "../pages/LoginSuccess";
import NewsPage from "../pages/NewsPage";
import OfferPage from "../pages/OfferPage";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";

export const routes = [
  {
    path: "/",
    page: NewsPage,
    isShowHeader: true,
    isPrivate: false,
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
    path: "/blog-detail",
    page: BlogDetailPage,
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
    path: "/home",
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
    path: "/booking-hotel",
    page: BookingHotelPage,
    isShowHeader: true,
    isPrivate: false,
  },
  ,
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
    isPrivate: true,
  },
];
