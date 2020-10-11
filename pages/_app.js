import "../styles/main.css";
import "antd/dist/antd.css";
import "../styles/react-tags.css";
import Favicon from "../src/components/favicon/index";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Favicon />
      <Component {...pageProps} />
    </>
  );
}
