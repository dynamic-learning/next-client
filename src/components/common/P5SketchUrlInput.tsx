import { Input } from "antd";
import { useState, useEffect } from "react";
import {
  isValidIframeTag,
  getOwnerFromIframeTag,
  getIdFromIframeTag,
} from "../../utils/sketch";
import { Sim } from "../../types";

interface Props {
  setSim(sim: Sim | null): void;
}

const P5SketchUrlInput = (props: Props) => {
  const { setSim } = props;

  const [inputUrl, setInputUrl] = useState("");

  useEffect(() => {
    navigator.clipboard.readText().then((valueInClipboard) => {
      if (isValidIframeTag(valueInClipboard)) {
        setInputUrl(valueInClipboard);
        setSketchOwnerAndId(valueInClipboard);
      }
    });
    return () => {
      setInputUrl("");
    };
  }, []);

  const handleInputChange = (e: any) => {
    const inputUrl = e.target.value;
    setInputUrl(inputUrl);
    if (isValidIframeTag(inputUrl)) {
      setSketchOwnerAndId(inputUrl);
    } else {
      setSketchOwnerAndId("");
    }
  };

  const setSketchOwnerAndId = (inputUrl: any) => {
    if (!inputUrl) {
      setSim(null);
      return;
    }
    setSim({
      owner: getOwnerFromIframeTag(inputUrl),
      _id: getIdFromIframeTag(inputUrl),
    });
  };

  return (
    <>
      <style>{style}</style>
      <Input
        value={inputUrl}
        onChange={handleInputChange}
        placeholder="Link to p5 web editor sketch"
        className="p5-sketch-url-input"
      />
    </>
  );
};

const style = `
    .p5-sketch-url-input {
        width:100%;
        margin-top:1rem;
    }
`;

export default P5SketchUrlInput;
