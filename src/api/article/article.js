import request from '@/utils/request'
import {keyword} from "chalk";

// 查询文章列表
export function listArticle(query) {
  return request({
    url: '/system/article/list',
    method: 'get',
    params: query
  })
}

// 查询文章详细
export function getArticle(articleId) {
  return request({
    url: '/system/article/' + articleId,
    method: 'get'
  })
}

// 新增文章
export function addArticle(data) {
  return request({
    url: '/system/article',
    method: 'post',
    data: data
  })
}

// 修改文章
export function updateArticle(data) {
  return request({
    url: '/system/article',
    method: 'put',
    data: data
  })
}

// 删除文章
export function delArticle(articleId) {
  return request({
    url: '/system/article/' + articleId,
    method: 'delete'
  })
}

// 文章点赞与取消
export function addArticleLike(articleId) {
  return request({
    url: '/article/like/' + articleId,
    method: 'get'
  })

}
// 文章浏览
export function addArticleView(articleId) {
  return request({
    url: '/article/view/' + articleId,
    method: 'get'
  })
}

// 文章免登录浏览
export function addArticleViewByAnonymous(articleId) {
  return request({
    url: '/article/view/anonymous/' + articleId,
    method: 'get'
  })
}
// 文章收藏与取消
export function addArticleCollect(articleId) {
  return request({
    url: '/article/collect/' + articleId,
    method: 'get'
  })
}

// 创作
export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data: data
  })
}

// 获取用户收藏列表
export function getFavArticle() {
  return request({
    url: '/article/collect/getAll',
    method: 'get'
  })
}

//获取用户历史点赞记录
export function readArticleLike() {
  return request({
    url: '/article/like/getAll',
    method: 'get'
  })
}

// 获取历史浏览记录
export function readArticleView() {
  return request({
    url: '/article/view/getAll',
    method: 'get'
  })
}

// 获取文章详细信息
export function getArticleDetail(articleId) {
  return request({
    url: '/article/getDetail/' + articleId,
    method: 'post'
  })
}

// 获取用户文章列表  分页
export function getArticleList(id) {
  return request({
    url: '/article/getAllArticle/'+id,
    method: 'post',
    // params: query
  })
}

// 获取文章稿件
export function getDraft() {
  return request({
    url: '/article/getDraft',
    method: 'get',
  })
}

export function getUsersArticleByWays(num) {
  return request({
    url: '/article/person/' + num,
    method: 'get'
  })
}

//创作中心删除稿件
export function deleteUserManuscript(array) {
  return request({
    url: '/article/delete/' + array,
    method: 'delete'
  })
}

//编辑界面获得文章参数
export function getEditArticleDetail(num) {
  return request({
    url: '/article/edit/' + num,
    method: 'get'
  })
}

//通过草稿箱修改文章
export function editArticle(data) {
  return request({
    url: '/article/ReCreate',
    method: 'post',
    data: data
  })
}

export function getHisArticle() {
  return request({
    url: '/article/view/getAll',
    method: 'get',
  })
}

//articleHomeapi
export function getPoster(value1,value2) {
  return request({
    url: '/page/typeset/'+value1+'/'+value2,
    method:'get'
  })
}

export function getTopArticle() {
  return request({
    url: '/article/TopArticle',
    method: 'get',
  })
}

export function getHotArticle() {
  return request({
    url: '/article/hotArticle',
    method: 'get',
  })
}

export function getSuggestArticle(keywords) {
  return request({
    url: '/search/article/'+keywords,
    method: 'get',
  })
}

export function getPaginationArticle(query) {
  return request({
    url: '/article/articleShow',
    method: 'get',
    params:query
  })
}