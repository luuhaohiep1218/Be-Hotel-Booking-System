import NewsPage from "../pages/NewsPage";
import ServicePage from "../pages/ServicePage";

export const routes = [
  {
    path: "/",
    page: NewsPage,
    isShowHeader: true,
  },
  {
    path: "/service",
    page: ServicePage,
    isShowHeader: true,
  },
];
