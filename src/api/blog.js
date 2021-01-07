import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/api/blog/list",
    method: "get",
    params
  });
}
export function getDetail(params) {
  return request({
    url: "/api/blog/detail",
    method: "get",
    params
  });
}

export function addBlogLike(data) {
  return request({
    url: "/api/blog/addLike",
    method: "post",
    data
  });
}
export function cancelBlogLike(data) {
  return request({
    url: "/api/blog/cancelLike",
    method: "post",
    data
  });
}
export function addViewCount(data) {
  return request({
    url: "/api/blog/addViewCount",
    method: "post",
    data
  });
}
export function save(data) {
  return request({
    url: "/api/blog/new",
    method: "post",
    data
  });
}
export function update(id, data) {
  return request({
    url: "/api/blog/update",
    method: "post",
    data,
    params: {
      id
    }
  });
}
