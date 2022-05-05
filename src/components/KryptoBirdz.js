import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import KryptoBirdDetail from "./KryptoBirdDetail";
import PageNotFound from "./PageNotFound";
import Header from "./Header";

import store from "../redux/store/Store";
import { Provider } from "react-redux"; //change them to App.js after completion

class KryptoBirdz extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kryptoBird/:id" element={<KryptoBirdDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    );
  }
}

export default KryptoBirdz;
