import request from '@/utils/request'

//  取消 增加 关注
export function addConcerns(userId) {
    return request({
        url: '/inter/add/' + userId,
        method: 'get'
    })
}
// 展示粉丝列表
export function showFans() {
    return request({
        url: '/inter/showFans',
        method: 'get'
    })
}
// 展示关注列表
export function showConcerns() {
    return request({
        url: '/inter/showConcerns',
        method: 'get'
    })
}