import request from '@/utils/request'

// 查询标签选择列表
export function listTags(query) {
  return request({
    url: '/system/tags/list',
    method: 'get',
    params: query
  })
}

// 查询标签选择详细
export function getTags(tagsId) {
  return request({
    url: '/system/tags/' + tagsId,
    method: 'get'
  })
}

// 新增标签选择
export function addTags(data) {
  return request({
    url: '/system/tags',
    method: 'post',
    data: data
  })
}

// 修改标签选择
export function updateTags(data) {
  return request({
    url: '/system/tags',
    method: 'put',
    data: data
  })
}

// 删除标签选择
export function delTags(tagsId) {
  return request({
    url: '/system/tags/' + tagsId,
    method: 'delete'
  })
}
