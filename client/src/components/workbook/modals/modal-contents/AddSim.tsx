import { Input } from "antd";
import { useState, useEffect } from "react";
import {
  isValidSketchUrl,
  getOwnerFromSketchUrl,
  getIdFromSketchUrl,
} from "../../../../utils";

const AddSim = ({ getSim }: any) => {
  const [inputUrl, setInputUrl] = useState("");
  const [sketchOwner, setSketchOwner] = useState("");
  const [sketchId, setSketchId] = useState("");

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

  const setSketchOwnerAndId = (inputUrl: string) => {
    setSketchOwner(getOwnerFromSketchUrl(inputUrl));
    setSketchId(getIdFromSketchUrl(inputUrl));
    getSim({
      owner: getOwnerFromSketchUrl(inputUrl),
      id: getIdFromSketchUrl(inputUrl),
    });
  };

  return (
    <div>
      <style>{style}</style>
      <Input
        value={inputUrl}
        onChange={handleInputChange}
        placeholder="Link to p5 web editor sketch"
        className="input"
      />
      {sketchOwner && sketchId ? (
        <iframe
          width={640}
          height={360}
          scrolling="no"
          src={`https://editor.p5js.org/${sketchOwner}/embed/${sketchId}`}
        ></iframe>
      ) : null}
    </div>
  );
};

const style = `
    .input {
        width:640px;
        margin-bottom:1rem;
    }
`;

export default AddSim;
