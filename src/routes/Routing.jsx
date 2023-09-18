import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import MainLayout from "@/layouts/MainLayout";

const Home = lazy(() => import("@/pages/Home/Home"));
const Login = lazy(() => import("@/pages/Login/Login"));

const Routing = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="absolute z-50 top-0 left-auto grid place-items-center w-full h-screen opacity-60 bg-salestrack-primary-gray">
            <CircularProgress />
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routing;
