import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/api/walking/list",
    method: "get",
    params
  });
}
