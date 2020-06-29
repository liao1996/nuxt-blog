import axios from 'axios'
import request from '@/service'

export const getBlogList = (id,falge) => {
  return request.get(`lz/index/findArticleList.htm?falge=${falge}&id=${id}`);
}

export const getThisArticle = (id) => {
  return request.get(`lz/index/findthisArticle.htm?id=${id}`);
}

export const addReadNum = (id) => {
  return request.get(`lz/index/updateReadNum.htm?id=${id}`);
}

export const addLoveNum = (id) => {
    return request.get(`lz/index/updateLoveNum.htm?id=${id}`);
}

export const getTalkList = (id) => {
  return request.get(`lz/index/findTalkList.htm?id=${id}`);
}

export const insertTalk = (talkJson) => {
  return request.get(`lz/index/insertTalk.htm?talkJson=${talkJson}`);
}

export const GetArticle = (k, f, t) => {
  //return axios.post('lz/index/findArticleList.html',{keyword:k,fromNum:f,toNum:t});
}

export const GetArticleNum = (k) => {
  return axios.post('lz/users/articleNum', {
    keyword: k
  });
}





export const GetNotice = (f, t) => {
  return axios.post('lz/users/notice', {
    fromNum: f,
    toNum: t
  });
}

export const GetFri = () => {
  return axios.get('lz/knowledge/fri.json');
}
