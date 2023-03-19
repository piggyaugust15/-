import request from '@/utils/request'

// 查询合作伙伴列表
export function listPartner(query) {
  return request({
    url: '/system/partner/list',
    method: 'get',
    params: query
  })
}

// 查询合作伙伴详细
export function getPartner(partnerId) {
  return request({
    url: '/system/partner/' + partnerId,
    method: 'get'
  })
}

// 新增合作伙伴
export function addPartner(data) {
  return request({
    url: '/system/partner',
    method: 'post',
    data: data
  })
}

// 修改合作伙伴
export function updatePartner(data) {
  return request({
    url: '/system/partner',
    method: 'put',
    data: data
  })
}

// 删除合作伙伴
export function delPartner(partnerId) {
  return request({
    url: '/system/partner/' + partnerId,
    method: 'delete'
  })
}

// 获得伙伴
export function getPartnerByRandom() {
  return request({
    url: '/partner/getShow',
    method: 'get'
  })
}
// 获取所有伙伴 分页
export function getAllPartner() {
  return request({
    url: '/partner/showAll',
    method: 'get'
  })
}