import dayjs from "dayjs";
/**
 *  格式化时间
 * @param {Date} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, format) {
  return dayjs(time).format(format || "YYYY-MM-DD");
}

/**
 *  防抖
 * @param {Function} func
 * @param {Number} wait
 * @returns {Boolean} immediate
 */
export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = new Date().getTime() - timestamp;
    // console.log(last);
    if (last < wait && last >= 0) {
      // console.log(1);
      timeout = setTimeout(later, wait - last);
    } else {
      // console.log(2);
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
