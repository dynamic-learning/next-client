import { TextboxType } from "../../../../types";

type Props = {
  textbox: TextboxType;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  index: number;
};

const Textbox = (props: Props) => {
  const { textbox, onItemUpdate, index } = props;

  const { size, text } = textbox;

  // Styled jsx is causing problems getting applied to all the text boxes
  // Hence used object style
  const style = getStyle(size);

  const handleChange = (e: any) => {
    const updatedTextBox = {
      ...textbox,
      text: e.target.value,
    };

    onItemUpdate(updatedTextBox, index, "textboxes");
  };

  return (
    <>
      <textarea onChange={handleChange} style={style} value={text} />
    </>
  );
};

const getStyle = ({ width, height }: any): any => ({
  color: "white",
  backgroundColor: "black",
  border: "3px solid #303030",
  width,
  height,
  resize: "none",
  fontSize: "18px",
});

export default Textbox;
