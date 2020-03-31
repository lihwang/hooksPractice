/**
 * 时间函数只保留天
 * @param {Date} timestamp 时间或者时间戳
 */
export function h0(timestamp = Date.now()) {
  let target = new Date(timestamp);
  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);
  return target.getTime();
}
