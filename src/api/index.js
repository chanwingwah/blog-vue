import request from "@/utils/request";

export function getCounts(params) {
  return request({
    url: "/getCounts",
    method: "get",
    params
  });
}
export function login(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  });
}
export function logout() {
  return request({
    url: "/api/user/logout",
    method: "get"
  });
}
