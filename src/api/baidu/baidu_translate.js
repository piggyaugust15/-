import request from '@/utils/requestOut'

// 查询景点列表
export function getAttractionList() {
  return request({
    url: '/hotSights/randomSights',
    method: 'get',
  })
}