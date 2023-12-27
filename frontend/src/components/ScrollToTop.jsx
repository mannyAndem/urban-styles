import { useEffect } from "react";

const ScrollToTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo(top);
  });

  return children;
};

export default ScrollToTop;
