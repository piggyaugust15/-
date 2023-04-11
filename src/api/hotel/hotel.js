import request from '@/utils/request'

export function getHotelList(id) {
  return request({
    url: '/around/hotel/'+id ,
    method: 'get',
  })
}

export function getRestaurantList(id) {
  return request({
    url: '/around/rest/'+id ,
    method: 'get',
  })
}