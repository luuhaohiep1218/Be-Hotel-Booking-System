import NewsPage from "../pages/NewsPage";
import ServicePage from "../pages/ServicePage";
import NewsDetail from "../pages/NewsDetail";

export const routes = [
  {
    path: "/",
    page: NewsPage,
    isShowHeader: true,
  },
  {
    path: "/news/:id",
    page: NewsDetail,
    isShowHeader: true,
  },
  {
    path: "/service",
    page: ServicePage,
    isShowHeader: true,
  },
];

