import { CanvasSimType } from "../../../../types";
import { useRef, useEffect } from "react";

interface Props {
  sim: CanvasSimType;
  isTransforming: boolean;
  onItemUpdate(
    updatedItem: CanvasSimType,
    index: number,
    itemType: string
  ): void;
  index: number;
}

const Sim = (props: Props) => {
  const { sim, isTransforming, onItemUpdate, index } = props;
  const { size, owner, id, savedState } = sim;

  const iframeRefInit: any = null;
  const simRefInit: any = null;

  const iframeRef = useRef(iframeRefInit);
  const savedStateRef = useRef(null);
  const simRef = useRef(simRefInit);

  let channel: any;

  useEffect(() => {
    channel = new MessageChannel();
    channel.port1.onmessage = onMessage;
    iframeRef.current.onload = onIframeLoad;
  }, []);

  const onMessage = (e: any) => {
    if (e.data.action === "saveToDL") {
      updateSim(e.data.payload);
    } else if (e.data.action === "loadToIframe") {
      loadDataToIframe();
    }
  };

  const onIframeLoad = () => {
    initiateConnectionWithIframeAndPassState();
  };

  const initiateConnectionWithIframeAndPassState = () => {
    iframeRef.current.contentWindow.postMessage(
      { action: "initialLoadToIframe", payload: savedState },
      "*",
      [channel.port2]
    );
  };

  // To ensure the sim state passed to iframe is the latest
  useEffect(() => {
    savedStateRef.current = savedState;
    loadDataToIframe();
  }, [savedState]);

  useEffect(() => {
    simRef.current = sim;
  }, [sim]);

  const loadDataToIframe = () => {
    iframeRef.current.contentWindow.postMessage(
      { action: "loadToIframe", payload: savedStateRef.current },
      "*"
    );
  };

  const updateSim = (data: any) => {
    onItemUpdate(
      {
        ...simRef.current,
        savedState: data,
      },
      index,
      "sims"
    );
  };

  return (
    <>
      <style>{getStyle(isTransforming)}</style>
      <iframe
        ref={iframeRef}
        className="iframe"
        scrolling="no"
        width={size.width}
        height={size.height}
        src={`https://editor.p5js.org/${owner}/embed/${id}`}
      />
    </>
  );
};

const getStyle = (isTransforming: boolean) => `
    .iframe {
        border:3px solid #303030;
        pointer-events:${isTransforming ? "none" : ""};
    }
`;

export default Sim;
