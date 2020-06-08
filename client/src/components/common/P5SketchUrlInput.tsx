import { Input } from "antd";
import { useState, useEffect } from "react";
import {
  isValidSketchUrl,
  getOwnerFromSketchUrl,
  getIdFromSketchUrl,
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
      if (isValidSketchUrl(valueInClipboard)) {
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
    if (isValidSketchUrl(inputUrl)) {
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
      owner: getOwnerFromSketchUrl(inputUrl),
      id: getIdFromSketchUrl(inputUrl),
    });
  };

  return (
    <>
      <style>{style}</style>
      <Input
        value={inputUrl}
        onChange={handleInputChange}
        placeholder="Link to p5 web editor sketch"
        className="input"
      />
    </>
  );
};

const style = `
    .input {
        width:100%;
        margin-top:1rem;
    }
`;

export default P5SketchUrlInput;
