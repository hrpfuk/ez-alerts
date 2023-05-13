import "./App.css";
import LoginPage from "./components/login/login";
import Chat from "./components/chat/chat";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/chat",
    element: <Chat></Chat>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
