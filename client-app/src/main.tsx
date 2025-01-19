import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import store from "./app/redux/stores/index.ts";
import { Provider } from "react-redux";
import { router } from "./app/router/Routes.tsx";


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
