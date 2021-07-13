const timeout = (s) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // reject(new Error(`${s}seconds timeout`));
      resolve(true);
    }, s * 1000);
  });
};

export const callAPI = async (url) => {
  const fetchPro = fetch(url);
  const fetchRes = await Promise.race([fetchPro, timeout(10)]);
  const response = await fetchRes.json();
  return response;
};

export const convertDateFormat = (d) => {
  const year = d.getFullYear();
  const mm = ("0" + (d.getMonth() + 1)).slice(-2);
  const dd = ("0" + d.getDate()).slice(-2);
  return `${year}-${mm}-${dd}`;
};

export const getStartDate = () => {
  const d = new Date();
  const dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 4);
  return d;
};

export const getAddedDay = (s) => {
  const d = new Date(s);
  d.setDate(d.getDate() + 1);
  return d;
};

export const filterDropDownList = (list) => {
  return list.filter((item) => item.active).sort((a, b) => a.order - b.order);
};
