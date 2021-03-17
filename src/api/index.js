import request from "@/utils/request";

export function getCounts(params) {
  return request({
    url: "/getCounts",
    method: "get",
    params
  });
}

export function subscribe(data) {
  return request({
    url: "/api/subscribe/new",
    method: "post",
    data
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
export function getList() {
  return request({
    url: "/api/user/list",
    method: "get"
  });
}
export function add(data) {
  return request({
    url: "/api/user/new",
    method: "post",
    data
  });
}
export function update(id, data) {
  return request({
    url: "/api/user/update",
    method: "post",
    data,
    params: {
      id
    }
  });
}
