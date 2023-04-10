import request from '@/utils/request'

// 查询活动列表
export function getActivityList() {
  return request({
    url: '/activity/person/carousel',
    method: 'get',
  })
}

export function getActivityPic() {
  return request({
    url: '/person/activity/picture',
    method: 'get',
  })
}

export function getMoreActivity() {
  return request({
    url: '/activity/person/hot',
    method: 'get',
  })
}

export function getDetailActivity(id) {
  return request({
    url: '/activity/detail/'+id,
    method: 'get',
  })
}