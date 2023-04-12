import request from '@/utils/request'

// 查询动态播报列表
export function listVoice(query) {
  return request({
    url: '/system/voice/list',
    method: 'get',
    params: query
  })
}

// 查询动态播报详细
export function getVoice(voiceId) {
  return request({
    url: '/system/voice/' + voiceId,
    method: 'get'
  })
}

// 新增动态播报
export function addVoice(data) {
  return request({
    url: '/system/voice',
    method: 'post',
    data: data
  })
}

// 修改动态播报
export function updateVoice(data) {
  return request({
    url: '/system/voice',
    method: 'put',
    data: data
  })
}

// 删除动态播报
export function delVoice(voiceId) {
  return request({
    url: '/system/voice/' + voiceId,
    method: 'delete'
  })
}
