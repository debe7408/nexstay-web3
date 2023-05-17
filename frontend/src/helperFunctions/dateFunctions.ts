export const formatDate = (date: Date | string) => {
  if (typeof date === "string") date = new Date(date);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateDayDifference = (
  date1: Date | string,
  date2: Date | string
) => {
  if (typeof date1 === "string") date1 = new Date(date1);
  if (typeof date2 === "string") date2 = new Date(date2);

  const timeDifference = date1.getTime() - date2.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  if (dayDifference < 0) return 1;

  return dayDifference;
};
