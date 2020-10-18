import "../styles/main.css";
import "antd/dist/antd.css";
import "../styles/react-tags.css";
import Favicon from "../src/components/favicon/index";
import { useEffect } from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  useEffect(()=>{
    window.onbeforeunload = onBeforeUnload
  },[])
  
  const onBeforeUnload = function(e){
    localStorage.removeItem("savedState")
  }
  
  return (
    <>
      <Favicon />
      <Component {...pageProps} />
    </>
  );
}
