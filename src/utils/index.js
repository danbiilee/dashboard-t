export const convertDateFormat = (d) => {
  const year = d.getFullYear();
  const mm = ("0" + (d.getMonth() + 1)).slice(-2);
  const dd = ("0" + d.getDate()).slice(-2);
  return `${year}-${mm}-${dd}`;
};

export const getStartDate = () => {
  const d = new Date();
  const dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 7);
  return d;
};

export const getAddedDay = (s) => {
  const d = new Date(s);
  d.setDate(d.getDate() + 1);
  return d;
};

export const getRangeMinDate = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  return d;
};

export const filterDropDownList = (list) => {
  return list.filter((item) => item.active).sort((a, b) => a.order - b.order);
};
