import Workbook from "../src/components/workbook";
import { Provider } from "react-redux";
import store from "../src/redux/stores";
import { getTitleAndCreateNewWorkbook } from "../src/components/workbook/helpers";
import { SlideType } from "../src/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const WorkbookPage = () => {
  const router = useRouter();
  const [ initialSlides, setInitialSlides ] = useState(null)
  const [initialCurSlide, setInitialCurSlide] = useState(0);

  const saveWorkbook = async (slides: Array<SlideType>) => {
    const _id = await getTitleAndCreateNewWorkbook(slides, "Eneter the title for the new workbook.");
    if(_id) {
      await router.push(`workbook/${_id}`);
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem("savedState");
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      setInitialSlides(parsedState.slides);
      setInitialCurSlide(parsedState.curSlide);
      localStorage.removeItem("savedState");
    }
  }, []);

  const props = {
    initialSlides,
    initialCurSlide: initialCurSlide,
    updateWorkbook: saveWorkbook,
  };

  return (
    <Provider store={store}>
      {/*@ts-ignore*/}
      <Workbook {...props} />
    </Provider>
  );
};

export default WorkbookPage;
