import { Toaster } from "@/shared/ui/sonner.tsx";
import React from "react";

const Home = React.lazy(() => import("../page/Home/ui/Home.tsx"));
function App() {
  const havetoken = localStorage.getItem("todoCount");
  if (!havetoken) localStorage.setItem("todoCount", "0");
  return (
    <>
      <Toaster />
      <Home />
    </>
  );
}

export default App;
