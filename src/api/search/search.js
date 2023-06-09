import request from '@/utils/request'

export function searchSights(keywords) {
  return request({
    url: '/search/suggest/' + keywords,
    method: 'get',
  })
}

export function searchAll(query) {
  return request({
    url: '/search/all/' + query,
    method: 'get',
    // params: query
  })
}

export function hotSearch() {
  return request({
    url: '/hotSights/getTop',
    method: 'get',
    // params: query
  })
}
