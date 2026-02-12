import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http.js";
import { UserProvider } from "./context/UserContext.jsx";
import MainBody from "./components/main-body/MainBody.jsx";
import RootLayout from "./pages/RootLayout.jsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
        <Routes>
          <Route  path="/" element={<RootLayout />}>
          <Route index element={<MainBody/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
