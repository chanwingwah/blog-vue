import request from "@/utils/request";
// import qs from "qs";
export function getList(params) {
  // query
  return request({
    url: "/api/book/list",
    method: "get",
    params
  });
}
