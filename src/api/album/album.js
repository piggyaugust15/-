import request from '@/utils/request'

// 查询文创专栏列表
export function listAlbum(query) {
  return request({
    url: '/system/album/list',
    method: 'get',
    params: query
  })
}

// 查询文创专栏详细
export function getAlbum(albumId) {
  return request({
    url: '/system/album/' + albumId,
    method: 'get'
  })
}

// 新增文创专栏
export function addAlbum(data) {
  return request({
    url: '/system/album',
    method: 'post',
    data: data
  })
}

// 修改文创专栏
export function updateAlbum(data) {
  return request({
    url: '/system/album',
    method: 'put',
    data: data
  })
}

// 删除文创专栏
export function delAlbum(albumId) {
  return request({
    url: '/system/album/' + albumId,
    method: 'delete'
  })
}
