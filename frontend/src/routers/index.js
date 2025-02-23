import NewsPage from "../pages/NewsPage";
import ServicePage from "../pages/ServicePage";
import CustomerPage from "../pages/CustomerPage";
import OfferPage from "../pages/OfferPage";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUsPage";

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
  {
    path: "/home",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/us",
    page: AboutUs,
    isShowHeader: true,
  },
];
