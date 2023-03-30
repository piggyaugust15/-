import request from '@/utils/request'

export function getData() {
  return request({
    url: '/statistic/water' ,
    method: 'get',
  })
}

export function getLeftPie() {
  return request({
    url: '/statistic/leftPie' ,
    method: 'get',
  })
}

export function getMedium() {
  return request({
    url: '/statistic/medium' ,
    method: 'get',
  })
}