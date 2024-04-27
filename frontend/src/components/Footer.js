import React from "react";

const Footer = () => {
  const contentHeight = document.body.clientHeight;
  const viewportHeight = window.innerHeight;

  return (
    <footer
      className={
        contentHeight > viewportHeight
          ? "mt-4  bg-gray-800 text-white text-center py-4  w-full"
          : "fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center py-4"
      }
    >
      <p>&copy; 2024 HealWell. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
