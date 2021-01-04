import request from "@/utils/request";

export function getCounts(params) {
  return request({
    url: "/getCounts",
    method: "get",
    params
  });
}
