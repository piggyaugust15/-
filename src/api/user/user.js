import request from '@/utils/request'


export function getUserInfo(id) {
    return request({
        url: '/person/user/' + id,
        method: 'post',
    })
}

export function changeBacImg(image) {
    return request({
        url: '/person/user/' + image,
        method: 'get',
    })
}