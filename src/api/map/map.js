import {requestLocal} from "@/utils/requestLocal";

export function getMap() {
  return request({
    url: '/js/map',
    method: 'get',
  })
}