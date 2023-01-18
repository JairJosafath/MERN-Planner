export function formatDate(date: string) {
  if (date) {
    const date_obj = new Date(date);

    return `${date_obj.getUTCFullYear()}-${
      date_obj.getUTCMonth() + 1 > 9
        ? date_obj.getUTCMonth() + 1
        : "0" + (date_obj.getUTCMonth() + 1)
    }-${
      date_obj.getUTCDate() > 9
        ? date_obj.getUTCDate()
        : "0" + date_obj.getUTCDate()
    }`;
  } else {
    return "";
  }
}
