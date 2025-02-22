import AllNewsPage from "../pages/AllNewsPage";
import ServicePage from "../pages/ServicePage";
import NewsDetail from "../pages/NewsDetail";
import OnlyNew from "../pages/OnlyNew";
import OnlyDiscount from "../pages/OnlyDiscount";
import DiscountDetail from "../pages/DiscountDetail";
import OnlyFeedbacks from "../pages/OnlyFeedback";
import FeedbackDetail from "../pages/FeedBackDetail";

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
  },
];
