import request from '@/utils/request'

export function getCulByWays(num,query) {
  return request({
    url: '/creativity/person/'+num ,
    params:query,
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
export function getCulHome(query) {
  return request({
    url: '/creativity/lazy/fall',
    method: 'get',
    params:query
  })
}

export function getCulHasFaved(culCreativityId) {
  return request({
    url: '/creativity/ifCollect/'+culCreativityId,
    method: 'get',
  })
}

export function getCulHomeSwiper() {
  return request({
    url: '/album/swiper',
    method: 'get',
  })
}

//获得专辑内文分页
export function getCulAlbumList(query,id) {
  return request({
    url: '/album/info/'+id,
    params:query,
    method: 'get',
  })
}

//获得专辑信息
export function getCulAlbumInfo(id) {
  return request({
    url: '/album/albumInfo/'+id,
    method: 'get',
  })
}