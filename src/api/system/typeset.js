import request from '@/utils/request'

// 查询动态排版列表
export function listTypeset(query) {
  return request({
    url: '/system/typeset/list',
    method: 'get',
    params: query
  })
}

// 查询动态排版详细
export function getTypeset(typesetId) {
  return request({
    url: '/system/typeset/' + typesetId,
    method: 'get'
  })
}

// 新增动态排版
export function addTypeset(data) {
  return request({
    url: '/system/typeset',
    method: 'post',
    data: data
  })
}

// 修改动态排版
export function updateTypeset(data) {
  return request({
    url: '/system/typeset',
    method: 'put',
    data: data
  })
}

// 删除动态排版
export function delTypeset(typesetId) {
  return request({
    url: '/system/typeset/' + typesetId,
    method: 'delete'
  })
}

export function getDyTypeset(typesetPage, typesetPosition) {
  return request({
    url: '/page/typeset/' + typesetPage + '/' + typesetPosition,
    method: 'get'
  })
}

export function getHomeThreeSights() {
  return request({
    url: '/page/typeset/Sights',
    method: 'get'
  })
}

export function getHomeThreeCulCreation() {
  return request({
    url: '/page/typeset/cul',
    method: 'get'
  })
}


