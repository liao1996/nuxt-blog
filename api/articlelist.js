import axios from 'axios'
import request from '@/service'

export const getBlogList=()=>{
    return request.get('lz/index/findArticleList.htm');
}

export const GetArticle=(k,f,t)=>{
    //return axios.post('lz/index/findArticleList.html',{keyword:k,fromNum:f,toNum:t});
}

export const GetArticleNum=(k)=>{
    return axios.post('lz/users/articleNum',{keyword:k});
}

export const AddReadNum=(i)=>{
    return axios.post('lz/users/addReadNum',{id:i});
}

export const AddLoveNum=(i)=>{
    return axios.post('lz/users/addLoveNum',{id:i});
}

export const GetNotice=(f,t)=>{
    return axios.post('lz/users/notice',{fromNum:f,toNum:t});
}

export const GetFri=()=>{
    return axios.get('lz/knowledge/fri.json');
}

export const GetThisArticle=(id)=>{
    return axios.post('lz/users/thisArticle',{id:id});
}