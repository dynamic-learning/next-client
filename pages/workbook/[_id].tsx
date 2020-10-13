import Workbook from "../../src/components/workbook";
import { Provider } from "react-redux";
import store from "../../src/redux/stores";
import { getWorkbook } from "../../src/api/queries";
import { SlideType } from "../../src/types";
import { updateWorkbook } from "../../src/api/mutations";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const WorkbookPage = (props: any) => {
  const router = useRouter();
  const { _id } = router.query;
  const [ initialSlides, setInitialSlides ] = useState(null);
  const [ initialCurSlide, setIntialCurSlide ] = useState(0);

  const slides: Array<SlideType> = props.workbook
    ? //@ts-ignore
      JSON.parse(props.workbook.slides)
    : null;

  const saveWorkbook = async (slides: Array<SlideType>, _id: string) => {
    await updateWorkbook({
      _id,
      field: "slides",
      value: JSON.stringify(JSON.stringify(slides)),
    });
  };


  useEffect(()=>{
    const savedState = localStorage.getItem("savedState");
    if (savedState && router.query.mode !== "open") {
      const parsedState = JSON.parse(savedState)
      setInitialSlides(parsedState.slides);
      setIntialCurSlide(parsedState.curSlide);
      localStorage.removeItem("savedState");
    } else {
      //@ts-ignore
      setInitialSlides(slides)
      clearOpenModeInUrl();
    }
  },[])

  const clearOpenModeInUrl = () => router.push(
    {
      pathname: `/workbook/${_id}`
    },
    undefined,
    { shallow: true }
  );

  const inputProps = {
    initialSlides,
    initialCurSlide,
    _id,
    updateWorkbook: saveWorkbook,
    title: props.workbook.title
  };

  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <Workbook {...inputProps} />
    </Provider>
  );
};

export async function getServerSideProps(context: any) {
  const res = await getWorkbook(context.query._id);
  return {
    props: {
      ...res,
    },
  };
}

export default WorkbookPage;
