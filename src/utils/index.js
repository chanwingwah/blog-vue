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
 * @param {Boolean} immediate
 * @returns {Function}
 */

 export function  debounce (func, wait="300", immediate="true") {
  let timer
  const debounced = function ()  {
    let context = this;
    clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, arguments)
    } else {
      timer = setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    }
  }
  return debounced
}
