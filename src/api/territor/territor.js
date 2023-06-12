import request from '@/utils/request'

// 查询国内数据列表
export function listTerritor(query) {
  return request({
    url: '/system/territor/list',
    method: 'get',
    params: query
  })
}

// 查询国内数据详细
export function getTerritor(territorId) {
  return request({
    url: '/system/territor/' + territorId,
    method: 'get'
  })
}

// 新增国内数据
export function addTerritor(data) {
  return request({
    url: '/system/territor',
    method: 'post',
    data: data
  })
}

// 修改国内数据
export function updateTerritor(data) {
  return request({
    url: '/system/territor',
    method: 'put',
    data: data
  })
}

// 删除国内数据
export function delTerritor(territorId) {
  return request({
    url: '/system/territor/' + territorId,
    method: 'delete'
  })
}
