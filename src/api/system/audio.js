import request from '@/utils/request'

// 查询语音映射列表
export function listAudio(query) {
  return request({
    url: '/system/audio/list',
    method: 'get',
    params: query
  })
}

// 查询语音映射详细
export function getAudio(audioId) {
  return request({
    url: '/system/audio/' + audioId,
    method: 'get'
  })
}

// 新增语音映射
export function addAudio(data) {
  return request({
    url: '/system/audio',
    method: 'post',
    data: data
  })
}

// 修改语音映射
export function updateAudio(data) {
  return request({
    url: '/system/audio',
    method: 'put',
    data: data
  })
}

// 删除语音映射
export function delAudio(audioId) {
  return request({
    url: '/system/audio/' + audioId,
    method: 'delete'
  })
}
