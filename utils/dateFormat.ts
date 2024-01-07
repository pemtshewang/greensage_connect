import format from "date-fns/format";
export const changeToISO = (dateTime: Date) => {
  const formatted = format(dateTime as Date, "yyyy-MM-dd'T'HH:mm:ss");
  return formatted
}
