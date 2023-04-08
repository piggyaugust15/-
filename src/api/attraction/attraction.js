import request from '@/utils/request'

// 查询景点列表
export function getAttractionList() {
  return request({
    url: '/hotSights/randomSights',
    method: 'get',
  })
}

export function getAttractionFav() {
  return request({
    url: '/record/collect/getAll',
    method: 'get',
  })
}

export function getAttractionHistory() {
  return request({
    url: '/record/view/getAll',
    method: 'get',
  })
}