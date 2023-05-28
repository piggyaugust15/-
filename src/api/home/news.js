import request from '@/utils/request'

// 查询新闻列表
export function listNews(query) {
  return request({
    url: '/home/news/list',
    method: 'get',
    params: query
  })
}

// 查询新闻详细
export function getNews(newsId) {
  return request({
    url: '/home/news/' + newsId,
    method: 'get'
  })
}

// 新增新闻
export function addNews(data) {
  return request({
    url: '/home/news',
    method: 'post',
    data: data
  })
}

// 修改新闻
export function updateNews(data) {
  return request({
    url: '/home/news',
    method: 'put',
    data: data
  })
}

// 删除新闻
export function delNews(newsId) {
  return request({
    url: '/home/news/' + newsId,
    method: 'delete'
  })
}

export function getAll() {
  return request({
    url: '/permitAll/News/allNews',
    method:'post'
  })
}


//前端
export function getRecentlyNews() {
  return request({
    url: '/permitAll/News/getRecentlyNew',
    method:'get'
  })
}

export function getCarousel() {
  return request({
    url: '/permitAll/News/swiper',
    method:'get'
  })
}

export function getDetail(newsId) {
  return request({
    url: '/permitAll/News/getInfo/'+newsId,
    method:'get'
  })
}

export function getColumn(id) {
  return request({
    url: '/permitAll/News/column/'+id,
    method:'get'
  })
}

export function getSimilarNews(id) {
  return request({
    url: '/permitAll/News/similarNews/'+id,
    method:'get'
  })
}

export function getPoster(value1,value2) {
  return request({
    url: '/page/typeset/'+value1+'/'+value2,
    method:'get'
  })
}