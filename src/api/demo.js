import request from "@/utils/request";
import qs from "qs";

// 常用请求
export function formData(params) {
  return request({
    url: "/formData",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(params, { indices: false })
  });
}
// formData格式 上传文件
export function formDataFile(data) {
  return request({
    url: "/formDataFile",
    method: "post",
    data
  });
}

export function postBody(data) {
  return request({
    url: "/postBody",
    method: "post",
    data
  });
}

export function getQuery(params) {
  // query
  return request({
    url: "/getQuery",
    method: "get",
    params
  });
}

export function postQuery(params) {
  // query
  return request({
    url: "/postQuery",
    method: "post",
    params
  });
}

export function getPath(id) {
  return request({
    url: "/getPath/" + id,
    method: "get"
  });
}
