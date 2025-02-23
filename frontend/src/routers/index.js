import BlogDetailPage from "../pages/BlogDetailPage";
import BookingHotelPage from "../pages/BookingHotelPage";
import CustomerPage from "../pages/CustomerPage";
import NewsPage from "../pages/NewsPage";
import OfferPage from "../pages/OfferPage";
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
    path: "/blog-detail",
    page: BlogDetailPage,
    isShowHeader: true,
  },
  {
    path: "/booking-hotel",
    page: BookingHotelPage,
    isShowHeader: true,
  }
];
