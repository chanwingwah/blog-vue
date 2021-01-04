import moment from "moment";
/**
 *  格式化时间
 * @param {Date} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, format) {
  return moment(time).format(format || "YYYY-MM-DD");
}
