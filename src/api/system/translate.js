import request from '@/utils/request'
import front from "@/store/modules/front";

// 查询动态播报列表
export function translate(voice,from,to) {
  return request({
    url: '/sound/'+voice+'/'+from+'/'+to,
    method: 'get',
  })
}

export function paraTranslate(source,id,position) {
  return request({
    url: '/sound/'+source+'/'+id+'/'+position+'/'+front.state.lang,
    method: 'get',
  })
}

export function getLangList() {
  return request({
    url: '/sound/allAudio',
    method: 'get',
  })
}
