import NewsPage from "../pages/NewsPage";
import ServicePage from "../pages/ServicePage";
import CustomerPage from "../pages/CustomerPage";
import OfferPage from "../pages/OfferPage";

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
  {
    path: "/customer",
    page: CustomerPage,
    isShowHeader: true,
  },
  {
    path: "/offer",
    page: OfferPage,
    isShowHeader: true,
  },
];