import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
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
