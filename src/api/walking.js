import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/api/walking/list",
    method: "get",
    params
  });
}

export function add(data) {
  return request({
    url: "/api/walking/new",
    method: "post",
    data
  });
}
export function update(id, data) {
  return request({
    url: "/api/walking/update",
    method: "post",
    data,
    params: {
      id
    }
  });
}

export function addWalkingLike(data) {
  return request({
    url: "/api/walking/addLike",
    method: "post",
    data
  });
}
export function cancelWalkingLike(data) {
  return request({
    url: "/api/walking/cancelLike",
    method: "post",
    data
  });
}
