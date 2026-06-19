import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteProgress() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <>
      <style>{`@keyframes routeProgress{0%{width:0%}60%{width:75%}100%{width:96%}}`}</style>
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] bg-primary-container"
        style={{
          animation: "routeProgress .8s cubic-bezier(.25,.8,.3,1) forwards",
          boxShadow: "0 0 8px rgba(226,0,26,.5)",
        }}
      />
    </>
  );
}
