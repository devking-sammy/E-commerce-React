import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RootLayout = () => {
  return (
    <div>
      {/* Simple Header/Nav */}
      <Navbar />
      {/* <header className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl font-bold">My E-Commerce</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about-us" className="mr-4">About</Link>
          <Link to="/services" className="mr-4">Services</Link>
          <Link to="/shop" className="mr-4">Shop</Link>
        </nav>
      </header> */}

      {/* Page content */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* Simple Footer */}
     <Footer />
    </div>
  );
};

export default RootLayout;
