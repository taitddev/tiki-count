export const convertDate = (dateIn) => {
  var date = new Date(0);
  date.setUTCSeconds(dateIn);

  return date.toLocaleDateString("en-GB");
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
