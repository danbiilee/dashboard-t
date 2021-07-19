import { getDateList } from "../utils";

export default class UserService {
  async checkHoliday(inputs) {
    const { startDate, endDate } = inputs;
    const { NODE_ENV, BASE_URL, REST_URL } = window.CONFIG_GLOBAL;
    const days = getDateList(startDate, endDate);
    const url = `${BASE_URL[NODE_ENV]}/${REST_URL.test[NODE_ENV]}?days=${days}`;

    const response = await fetch(url).then((res) => res.text());
    return new Promise((resolve) => {
      resolve(response);
    });
  }

  downloadExcel(inputs, levels) {
    const { state, date, name } = inputs;
    const { level2, level3 } = levels;
    const { NODE_ENV, BASE_URL, REST_URL } = window.CONFIG_GLOBAL;
    let url = `${BASE_URL[NODE_ENV]}/${REST_URL.excel[NODE_ENV]}?name=${name}&type=${level2.menuId}&date=${date}&success=${state}&application_name=${level3.menuId}`;
    url = url.replace(/\+/g, "%2B");
    window.location.href = url;
  }
}
