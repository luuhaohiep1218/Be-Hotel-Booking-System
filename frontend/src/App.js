import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import "./index.css";
import { routes } from "./routers/index";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
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
