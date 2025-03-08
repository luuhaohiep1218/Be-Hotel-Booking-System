import AboutUs from "../pages/AboutUsPage";
import BookingHotelPage from "../pages/BookingHotelPage";
import CustomerPage from "../pages/CustomerPage";
import AllNewsPage from "../pages/AllNewsPage";
import CustomerPage from "../pages/CustomerPage";
import DiscountDetail from "../pages/DiscountDetail";
import FeedbackDetail from "../pages/FeedBackDetail";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginSuccess from "../pages/LoginSuccess";
import OfferPage from "../pages/OfferPage";
import ServicePage from "../pages/ServicePage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import AllNewsPage from "../pages/AllNewsPage";
import NewsDetail from "../pages/NewsDetail";
import OnlyNew from "../pages/OnlyNew";
import OnlyDiscount from "../pages/OnlyDiscount";
import DiscountDetail from "../pages/DiscountDetail";
import OnlyFeedbacks from "../pages/OnlyFeedback";
import FeedbackDetail from "../pages/FeedBackDetail";
import NewsDetail from "../pages/NewsDetail";
import OfferPage from "../pages/OfferPage";
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
    path: "/Blog/:blogId",
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
    path: "/booking-hotel",
    page: BookingHotelPage,
    isShowHeader: true,
    isPrivate: false,
  },
  ,
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
