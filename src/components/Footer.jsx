import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-700 py-8">
      <div className="max-w-7xl mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-orange-500">My Ecommerce</span>. All
          rights reserved.
        </p>
        <p className="mt-2">Inspired by Jumia • Built with ❤️ by your dev team</p>
      </div>
    </footer>
  );
};

export default Footer;
