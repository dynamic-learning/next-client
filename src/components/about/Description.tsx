import { useEffect, useState } from "react";
import showdown from "showdown";

const converter = new showdown.Converter();

const Description = () => {
  const [aboutHtml, setAboutHtml] = useState(" ");
  useEffect(() => {
    getAboutFromGit().then((html) => {
      setAboutHtml(html);
    });
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="description">
        <div dangerouslySetInnerHTML={{ __html: aboutHtml }} />
      </div>
    </>
  );
};

const style = `
    .description {
        padding:2rem;
        width:70vw;
    }
`;

const getAboutFromGit = async () => {
  const text = await getAboutText();
  return converter.makeHtml(text);
};

const getAboutText = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/dynamic-learning/next-client/splash-page/about.md"
  );
  return res.text();
};

export default Description;
