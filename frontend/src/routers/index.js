import NewsPage from "../pages/NewsPage";
import ServicePage from "../pages/ServicePage";
import CustomerPage from "../pages/CustomerPage";
import OfferPage from "../pages/OfferPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import FeedbackPage from "../pages/FeedbackPage";
import LoginSuccess from "../pages/LoginSuccess";

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
];
