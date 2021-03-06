import request from '@/service'

//首页
export const getBlogList = (id,falge,size) => {
  return request.get(`lz/index/findArticleList.htm?falge=${falge}&id=${id}&size=${size}`);
}
export const getQueryBlogList = (title) => {
  return request.get(`lz/index/findQueryArticle.htm?title=${title}`);
}
//详情
export const getThisArticle = (id) => {
  return request.get(`lz/index/findthisArticle.htm?id=${id}`);
}
//阅读数增加
export const addReadNum = (id) => {
  return request.get(`lz/index/updateReadNum.htm?id=${id}`);
}
//点赞
export const addLoveNum = (id) => {
    return request.get(`lz/index/updateLoveNum.htm?id=${id}`);
}
//获取评论
export const getTalkList = (id) => {
  return request.get(`lz/index/findTalkList.htm?id=${id}`);
}
//增加评论
export const insertTalk = (talkJson) => {
  return request.get(`lz/index/insertTalk.htm?talkJson=${talkJson}`);
}
//建议搜索
export const getQueryString = (title) => {
  return request.get(`lz/index/findQueryString.htm?title=${title}`);
}

//留言板
export const getMessageList = () => {
  return request.get(`lz/index/findMessageList.htm`);
}
//增加留言
export const insertMessage = (content) => {
  return request.get(`lz/index/insertMessage.htm?content=${content}`);
}
//查询充电站学习资料
export const getRecharge = () => {
  return request.get(`lz/index/findRecharge.htm`);
}

//口令是否正确
export const isPassword = (webPassword) => {
  return request.get(`lz/index/isPassword.htm?webPassword=${webPassword}`);
}

//发送短信
export const sendtelPhoto = (telPhoto) => {
  return request.get(`lz/index/sendtelPhoto.htm?telPhoto=${telPhoto}`);
}

//公告栏
export const getAnnouncement = () => {
  return request.get(`lz/index/findAnnouncement.htm`);
}








