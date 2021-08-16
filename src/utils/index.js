export const convertDateFormat = (d, flag) => {
  const year = d.getFullYear();
  const mm = ("0" + (d.getMonth() + 1)).slice(-2);
  const dd = ("0" + d.getDate()).slice(-2);
  return flag ? `${mm}-${dd}` : `${year}-${mm}-${dd}`;
};

export const getStartDate = (d) => {
  const dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 29);
  return d;
};

export const getMinFromEndDate = (str) => {
  const d = new Date(str);
  const dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 29);
  return d;
};

const getAddedDay = (s) => {
  const d = new Date(s);
  d.setDate(d.getDate() + 1);
  return d;
};

export const getDateList = (start, end) => {
  const result = [];
  let curr = start;
  while (curr <= end) {
    result.push(curr);
    curr = convertDateFormat(getAddedDay(curr));
  }
  return result;
};

export const getListConvertedKey = (list) => {
  const result = [];
  for (let item of list) {
    const obj = {};
    for (let key in item) {
      obj[key.toUpperCase()] = item[key];
    }
    result.push(obj);
  }
  return result;
};
