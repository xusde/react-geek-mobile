import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { articles } from "./apis/articles.ts";

articles.fetchChannels().then((res) => console.log(res.data.data.channels));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);
