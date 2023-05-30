import request from '@/utils/request'

export function getCulByWays(num) {
  return request({
    url: '/creativity/person/'+num ,
    method: 'get',
  })
}

export function deleteManuscript(id) {
  return request({
    url: '/creativity/delete/'+id ,
    method: 'delete',
  })
}

export function getEditCulDetail(id) {
  return request({
    url: '/creativity/edit/' + id,
    method: 'get'
  })
}
export function getDraft() {
  return request({
    url: '/creativity/getDraft',
    method: 'get',
  })
}

//culcreationHome
export function getCulHome(value1,value2) {
  return request({
    url: '/creativity/lazy/fall/'+value1+'/'+value2,
    method: 'get',
  })
}