import Workbook from "../../src/components/workbook";
import { Provider } from "react-redux";
import store from "../../src/redux/stores";
import { getWorkbook } from "../../src/api/queries";
import { SlideType } from "../../src/types";
import { updateWorkbook } from "../../src/api/mutations";
import { useRouter } from "next/router";

const WorkbookPage = (props: any) => {
  const router = useRouter();
  const { _id } = router.query;

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

  const inputProps = {
    initialSlides: slides,
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
