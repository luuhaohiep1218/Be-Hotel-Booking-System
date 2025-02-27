import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import "./index.css";
import { routes } from "./routers/index";
import ProtectedRoute from "./components/ProtectedRoute";
import { HotelBookingProvider } from "./context/HotelBookingContext";

const App = () => {
  return (
    <HotelBookingProvider>
      <div className="App">
        <Router>
          <Routes>
            {routes.map((route) => {
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;

              return route.isPrivate ? (
                // Nếu là trang cần bảo vệ thì bọc trong ProtectedRoute
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <route.page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              ) : (
                // Nếu không cần bảo vệ, render bình thường
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <route.page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </HotelBookingProvider>
  );
};

export default App;
