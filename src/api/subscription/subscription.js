import request from '@/utils/request'

export const getSubscriptionList = (data) => {
  return request({
    url: '/creativity/lazy',
    method: 'get',
    params:data
  })
}