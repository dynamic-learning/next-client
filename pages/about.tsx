import About from "../src/components/about/index";

const AboutPage = ({ text }: any) => {
  return <About description={text} />;
};

export const getServerSideProps = async () => {
  const about = await fetch(
    "https://raw.githubusercontent.com/dynamic-learning/next-client/dev/about.md"
  );
  const text = await about.text();
  return { props: { text } };
};

export default AboutPage;
