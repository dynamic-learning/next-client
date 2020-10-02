import { createWorkbook, updateWorkbook } from "../../api/mutations";
import { SlideType } from "../../types";

export const getTitleAndCreateNewWorkbook = async (
  slides: Array<SlideType>
) => {
  const title = prompt("Enter the title of the workbook");

  if (!title) {
    alert("Title cannot be empty");
    return;
  }

  const res = await createWorkbook({ title });
  const _id = res.createWorkbook._id;

  await updateWorkbook({
    _id,
    field: "slides",
    value: JSON.stringify(JSON.stringify(slides)),
  });

  return _id;
};
