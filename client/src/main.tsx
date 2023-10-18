import ReactDOM from "react-dom/client";
import { store } from "@/store/store.ts";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";

import "@/scss/index.scss";
import "@/scss/cards.scss";
import "@/scss/variables.scss";
import "@/scss/reset.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
