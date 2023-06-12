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

export function getFansList(id,query) {
    return request({
        url: '/inter/showFans/'+id,
        params:query,
        method: 'get',
    })
}

export function getSubList(id,query) {
    return request({
        url: '/inter/showConcerns/'+id,
        params:query,
        method: 'get',
    })
}
//获得订阅界面个人信息
export function getSubscriptionInfo() {
    return request({
        url: '/person/create/intro',
        method: 'get',
    })
}

export function getUserMessage() {
    return request({
        url: '/permitAll/comment/getUnStatusComments',
        method: 'get',
    })
}

export function hasReadMessage(id) {
    return request({
        url: '/permitAll/comment/updateComments/'+id,
        method: 'get',
    })
}