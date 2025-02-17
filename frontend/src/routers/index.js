import NewsPage from "../pages/NewsPage";
import ServicePage from "../pages/ServicePage";
import NewsDetail from "../pages/NewsDetail";
import OnlyNew from "../pages/OnlyNew";
import OnlyGuide from "../pages/OnlyGuide";
import GuideDetail from "../pages/GuideDetail";

export const routes = [
  {
    path: "/",
    page: NewsPage,
    isShowHeader: true,
  },
  {
    path: "/onlyNew",
    page: OnlyNew,
    isShowHeader: true,
  },
  {
    path: "/onlyGuide",
    page: OnlyGuide,
    isShowHeader: true,
  },
  {
    path: "/news/:id",
    page: NewsDetail,
    isShowHeader: true,
  },
  {
    path: "/guide/:id",
    page: GuideDetail,
    isShowHeader: true,
  },
  {
    path: "/service",
    page: ServicePage,
    isShowHeader: true,
  },
];

