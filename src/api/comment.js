import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/api/comment/list",
    method: "get",
    params
  });
}
export function addComment(data) {
  return request({
    url: "/api/comment/add",
    method: "post",
    data
  });
}
