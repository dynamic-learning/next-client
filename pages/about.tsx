import About from "../src/components/about/index";

const AboutPage = (props: any) => {
  return <About description={Object.values(props).join("")} />;
};

AboutPage.getInitialProps = async () => {
  const about = await fetch(
    "https://raw.githubusercontent.com/dynamic-learning/next-client/dev/about.md"
  );
  return about.text();
};

export default AboutPage;
