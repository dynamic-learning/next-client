import { useState, useEffect } from "react";
import { FiEdit3, FiSave } from "react-icons/fi";

interface Props {
  value: string;
  Element: any;
  onEdit(temp: string): void;
  isEditable: boolean;
  style?: any;
}

const EditableElement = (props: Props) => {
  const { value, Element, onEdit, isEditable, style } = props;

  // tempValue - temporary value for holding the edited value
  const [tempValue, setTempValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Initially, temp value is assigned the actual value
    setTempValue(value);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempValue(value);
  };

  const handleFinishEdit = () => {
    onEdit(tempValue);
    setTempValue(tempValue);
    setIsEditing(false);
  };

  const handleChange = (e: any) => {
    setTempValue(e.target.value);
  };

  const EditIcon = () =>
    isEditing ? (
      <FiSave onClick={handleFinishEdit} className="edit-icon" />
    ) : (
      <FiEdit3 onClick={handleEditClick} className="edit-icon" />
    );

  return (
    <>
      <style>{styles}</style>
      <div className="editable-content">
        {isEditing ? (
          <Element
            Element={Element}
            onChange={handleChange}
            value={tempValue}
          />
        ) : (
          <div className="text" style={style}>
            {tempValue}
          </div>
        )}
        {isEditable ? <EditIcon /> : null}
      </div>
    </>
  );
};

const styles = `
  .editable-content {
    display:flex;
    justify-content: space-between;
  }
  .edit-icon {
    cursor:pointer;
    margin:0.5rem;
  }
  .text {
    max-width:90%;
  }
`;

export default EditableElement;
