import request from '@/utils/request'


export function getUserInfo(id) {
    return request({
        url: '/person/user/'+id ,
        method: 'post',
    })
}

export function changeBacImg(image) {
    return request({
        url: '/person/user/' + image,
        method: 'get',
    })
}

export function getUserProfile() {
    return request({
        url: '/person/user/getInfo',
        method: 'get',
    })
}
export function changeUserProfile(data) {
    return request({
        url: '/person/user/update',
        method: 'post',
        data:data
    })
}

export function handleSubscribe(id) {
    return request({
        url: '/inter/add/'+id,
        method: 'get',
    })
}

export function getFansList() {
    return request({
        url: '/inter/showFans',
        method: 'get',
    })
}

export function getSubList() {
    return request({
        url: '/inter/showConcerns',
        method: 'get',
    })
}