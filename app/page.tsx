"use client";

// react/next.js
import dynamic from "next/dynamic";

// components
import Loader from "@/components/Loader";

const App = dynamic(() => import("./App"), { ssr: false, loading: () => <Loader />, });

export default App;
