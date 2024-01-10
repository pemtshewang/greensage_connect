import format from "date-fns/format";
export const extractTime = (dateTime: Date) => {
  const time = format(dateTime as Date, "HH:mm");
  return time;
}
