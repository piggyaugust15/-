import {requestOut} from "@/utils/requestOut";

export function getMap() {
  return request({
    url: '/js/map',
    method: 'get',
  })
}