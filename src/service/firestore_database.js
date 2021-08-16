import { firestore } from "./firebase";

const FUNC_TEST = "FUNC_TEST";
const FUNC_TEST_DETAIL = "FUNC_TEST_DETAIL";
const RESPONSE_TIME = "RESPONSE_TIME";

export default class FirestoreDatabase {
  async getFuncTest({ type, applicationName, dates }) {
    const [startDate, endDate] = dates;
    const ref = firestore.collection(FUNC_TEST);
    const query = ref
      .where("TYPE", "==", type)
      .where("APPLICATION_NAME", "==", applicationName)
      .orderBy("START_TIME")
      .startAt(startDate)
      .endAt(endDate);

    let chartData;
    const result = [];

    try {
      chartData = await query.get().then((querySnapshot) => querySnapshot);
      chartData.forEach((doc) => {
        const data = doc.data();
        result.push({ ...data, START_TIME: data.START_TIME.split(" ")[0] });
      });
    } catch (error) {
      console.error(`Not Found ChartData ==> \n${error}`);
    }

    return new Promise((resolve) => resolve(result));
  }

  async getFuncTestDetil({ type, applicationName, deviceName, date, status }) {
    const chartref = firestore.collection(FUNC_TEST);
    const detailref = firestore.collection(FUNC_TEST_DETAIL);

    const chartQuery = chartref
      .where("TYPE", "==", type)
      .where("APPLICATION_NAME", "==", applicationName)
      .where("DEVICE_NAME", "==", deviceName)
      .orderBy("START_TIME")
      .startAt(date)
      .endAt(date + "~");
    let detailQuery;

    let chartData;
    let detailData;
    const result = [];

    try {
      chartData = await chartQuery.get().then((funcTestSnaps) => funcTestSnaps);
      chartData.forEach((doc) => {
        chartData = doc.data();
      });
    } catch (error) {
      console.error(`Not Found ChartData \n${error}`);
    }

    detailQuery = detailref
      .where("AMORE_TSQUARE_ID", "==", chartData.ID)
      .where("STATUS", "==", status);

    try {
      detailData = await detailQuery.get().then((detailSnaps) => detailSnaps);
      detailData.forEach((doc) => {
        result.push({ ...chartData, ...doc.data() });
      });
    } catch (error) {
      console.error(`Not Found DetailData \n${error}`);
    }

    return new Promise((resolve) => resolve(result));
  }

  async getResponseTime({ brandName, dates }) {
    const [startDate, endDate] = dates;
    const ref = firestore.collection(RESPONSE_TIME);
    let query;

    if (brandName === "ALL") {
      query = ref.orderBy("START_TIME").startAt(startDate).endAt(endDate);
    } else {
      query = ref
        .where("BRAND_NAME", "==", brandName)
        .orderBy("START_TIME")
        .startAt(startDate)
        .endAt(endDate);
    }

    let responseData;
    const result = [];

    try {
      responseData = await query.get().then((querySnapshot) => querySnapshot);
      responseData.forEach((doc) => {
        const data = doc.data();
        result.push({ ...data, START_TIME: data.START_TIME.split(" ")[0] });
      });
    } catch (error) {
      console.error(`Not Found ResponseData ==> \n${error}`);
    }

    return new Promise((resolve) => resolve(result));
  }
}
