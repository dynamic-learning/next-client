import Workbook from "../src/components/workbook";
import { Provider } from "react-redux";
import store from "../src/redux/stores";
import { getTitleAndCreateNewWorkbook } from "../src/components/workbook/helpers";
import { SlideType } from "../src/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const WorkbookPage = () => {
  const router = useRouter();
  const [ slides, setSlides ] = useState(null)
  const [initialCurSlide, setInitialCurSlide] = useState(0);

  const saveWorkbook = async (slides: Array<SlideType>) => {
    const _id = await getTitleAndCreateNewWorkbook(slides);
    await router.push(`workbook/${_id}`);
  };

  useEffect(() => {
    const savedState = localStorage.getItem("savedState");
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      setSlides(parsedState.slides);
      setInitialCurSlide(parsedState.curSlide);
      localStorage.removeItem("savedState");
    }
  }, []);

  const props = {
    initialSlides: slides,
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
