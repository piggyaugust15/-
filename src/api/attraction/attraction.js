import request from '@/utils/request'
import {keywords} from "highlight.js/lib/languages/cpp";

// 查询景点列表
export function getAttractionList() {
  return request({
    url: '/hotSights/randomSights',
    method: 'get',
  })
}

export function getAttractionFav(query) {
  return request({
    url: '/record/collect/getAll',
    params:query,
    method: 'get',
  })
}

export function getAttractionHistory() {
  return request({
    url: '/record/view/getAll',
    method: 'get',
  })
}

//景点home
export function getSwiper() {
  return request({
    url: '/sights/swiper',
    method:'get'
  })
}

export function getSuggestAttraction(keywords) {
  return request({
    url: '/search/sights/'+keywords,
    method:'get'
  })
}