import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { routes } from "./routers/index";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
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
  );
};

export default App;
