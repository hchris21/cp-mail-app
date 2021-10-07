import moment from "moment";

const formatDate = (date, basicFormat = false) => {
  if (basicFormat) {
    return moment(date).format("ddd DD/MM/YYYY h:mm A");
  }

  const currentDate = moment().format("DD/MM/YYYY h:mm A");
  const formattedDate = moment(date).format("DD/MM/YYYY h:mm A");

  if (
    moment(formattedDate, "DD/MM/YYYY h:mm A").isSame(
      moment(currentDate, "DD/MM/YYYY h:mm A"),
      "day"
    )
  ) {
    return moment(date).format("hh:mm A");
  }
  if (
    moment(formattedDate, "DD/MM/YYYY h:mm A").isSame(
      moment(currentDate, "DD/MM/YYYY h:mm A"),
      "week"
    )
  ) {
    return moment(date).format("ddd h:mm A");
  }

  return moment(date).format("ddd MM/DD");
};

export default formatDate;
