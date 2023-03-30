import request from '@/utils/request'

// 查询文章列表
export function getAttractionList() {
  return request({
    url: '/hotSights/randomSights',
    method: 'get',
  })
}