import request from '@/utils/request'

export function addview(id) {
  return request({
    url: '/hotSights/view/'+id ,
    method: 'get',
  })
}

export function like(id) {
  return request({
    url: '/hotSights/like/'+id ,
    method: 'get',
  })
}

export function hit(id) {
  return request({
    url: '/hotSights/hit/'+id ,
    method: 'get',
  })
}

export function collect(id) {
  return request({
    url: '/hotSights/collect/'+id ,
    method: 'get',
  })
}

export function score(sightsId,score) {
  return request({
    url: '/hotSights/score/'+sightsId+"/"+score ,
    method: 'get',
  })
}

export function fav(id) {
  return request({
    url: '/hotSights/collect/'+id ,
    method: 'get',
  })
}