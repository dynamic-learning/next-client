import Workbook from "../../src/components/workbook";
import { Provider } from "react-redux";
import store from "../../src/redux/stores";
import { getWorkbook } from "../../src/api/queries";
import { SlideType } from "../../src/types";
import { updateWorkbook } from "../../src/api/mutations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const WorkbookPage = () => {
  const [workbook, setWorkbook] = useState(null);
  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    if (_id) {
      //@ts-ignore
      getWorkbook(_id).then((res) => {
        setWorkbook(res.workbook);
      });
    }
  }, [_id]);

  const slides: Array<SlideType> = workbook
    ? //@ts-ignore
      JSON.parse(workbook.slides)
    : null;

  const props = { initialSlides: slides, _id, updateWorkbook };
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <Workbook {...props} />
    </Provider>
  );
};

export default WorkbookPage;
