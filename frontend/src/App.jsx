import "./App.css";
// import UserForm from "./components/Form/UserForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
// // import ProfessionForm from "./components/Form/ProfessionForm.jsx";
// import Main from "./components/Form/Main.jsx";
import MainBody from "./components/main-body/MainBody.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <MainBody /> },
        // {
        //   path: "/professinalForm",
        //   element: <ProfessionForm />,
        // },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
