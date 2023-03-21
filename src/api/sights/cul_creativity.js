import request from '@/utils/request'

// 查询文创列表
export function listCul_creativity(query) {
  return request({
    url: '/system/cul_creativity/list',
    method: 'get',
    params: query
  })
}

// 查询文创详细
export function getCul_creativity(culCreativityId) {
  return request({
    url: '/system/cul_creativity/' + culCreativityId,
    method: 'get'
  })
}

// 新增文创
export function addCul_creativity(data) {
  return request({
    url: '/system/cul_creativity',
    method: 'post',
    data: data
  })
}

// 修改文创
export function updateCul_creativity(data) {
  return request({
    url: '/system/cul_creativity',
    method: 'put',
    data: data
  })
}

// 删除文创
export function delCul_creativity(culCreativityId) {
  return request({
    url: '/system/cul_creativity/' + culCreativityId,
    method: 'delete'
  })
}

//获取规定数目的文创信息
export function getAllCul_creativity() {
  return request({
    url: '/culCreativity/getAll',
    method: 'post'
  })
}

//景点与文创绑定
export function culConnectSights(sightsId, culCreativityId) {
  return request({
    url: '/system/cul_creativity/connect/' + sightsId + '/' + culCreativityId,
    method: 'get',
  })
}



//前台
//获取文创详情
export function getCuldetail(culCreativityId) {
  return request({
    url: '/creativity/getDetail/' + culCreativityId,
    method: 'get',
  })
}
// 点赞
export function culLike(culCreativityId) {
  return request({
    url: '/creativity/like/' + culCreativityId,
    method: 'get'
  })
}

// 登陆性浏览
export function culViewByUser(culCreativityId) {
  return request({
    url: '/creativity/view/' + culCreativityId,
    method: 'get'
  })
}
// 非登陆性浏览
export function culViewByNoUser(culCreativityId) {
  return request({
    url: '/creativity/view/anonymous/' + culCreativityId,
    method: ''
  })
}

export function create(data) {
  return request({
    url: '/creativity/create',
    method: 'post',
    data: data
  })
}
//获得用户文创列表
export function getCulList(id) {
  return request({
    url: '/creativity/getAllCul/'+id,
    method: 'post',
  })
}

export function createCul(data) {
  return request({
    url: '/creativity/create',
    method: 'post',
    data:data
  })
}
//获得资料卡文创收藏
export function getFavCul() {
  return request({
    url: '/creativity/collect/getAll',
    method: 'get',
  })
}