import request from '@/utils/request'

export function getSubscriptionList(value1,value2){
  return request({
    url: '/creativity/lazy/'+value1+'/'+value2,
    method: 'get',
  })
}