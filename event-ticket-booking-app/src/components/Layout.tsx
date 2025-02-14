import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <>
      <Toaster />
      <main className="bg-[#02191D] py-6">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
