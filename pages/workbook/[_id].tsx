import Workbook from "../../src/components/workbook";
import { Provider } from "react-redux";
import store from "../../src/redux/stores";
import { getWorkbook } from "../../src/api/queries";
import { SlideType } from "../../src/types";
import { updateWorkbook } from "../../src/api/mutations";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useAuth from "../../src/hooks/useAuth";
import { getTitleAndCreateNewWorkbook } from "../../src/components/workbook/helpers";

const WorkbookPage = (props: any) => {
  const router = useRouter();
  const { _id } = router.query;
  const [initialSlides, setInitialSlides] = useState(null);
  const [initialCurSlide, setIntialCurSlide] = useState(0);

  const slides: Array<SlideType> = props.workbook
    ? //@ts-ignore
      JSON.parse(props.workbook.slides)
    : null;
  const { userId } = useAuth();
  let isOwner = false;
  let title = "";

  if (props.workbook) {
    isOwner = userId === props.workbook.owner;
    title = props.workbook.title;
  }

  const saveWorkbook = async (slides: Array<SlideType>) => {
    if (isOwner) {
      await updateWorkbook({
        _id,
        field: "slides",
        value: JSON.stringify(JSON.stringify(slides)),
      });
    } else {
      const _id = await getTitleAndCreateNewWorkbook(
        slides,
        "The workbook will be duplicated and saved. Enter the title you want to give for the duplicated workbook."
      );
      if (_id) {
        await router.push(`${_id}`);
      }
    }
  };

  const createDuplicateWorkbook = async (slides: Array<SlideType>) => {
    const _id = await getTitleAndCreateNewWorkbook(
      slides,
      "The workbook will be duplicated and saved. Enter the title you want to give for the duplicated workbook."
    );
    if (_id) {
      await router.push(`${_id}`);
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem("savedState");
    const isWorkbookIDInvalid = props.workbook === null;
    if (isWorkbookIDInvalid) {
      router.push("/");
      return;
    }
    const isOpenMode = router.query.mode === "open";
    /**
     * Workbook with ID exists
     * But it is modified
     */
    if (savedState && !isOpenMode) {
      const parsedState = JSON.parse(savedState);
      setInitialSlides(parsedState.slides);
      setIntialCurSlide(parsedState.curSlide);
      localStorage.removeItem("savedState");
    } else {
      //@ts-ignore
      setInitialSlides(slides);
      clearOpenModeInUrl();
      localStorage.removeItem("savedState");
    }
  }, [props.workbook]);

  const clearOpenModeInUrl = () =>
    router.push(
      {
        pathname: `/workbook/${_id}`,
      },
      undefined,
      { shallow: true }
    );

  const inputProps = {
    initialSlides,
    initialCurSlide,
    saveWorkbook,
    title,
    isOwner,
    createDuplicateWorkbook
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
