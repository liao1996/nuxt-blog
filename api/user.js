import request from '@/service'

//首页
export const getUserInfo = (code) => {
  return request.get(`lz/account/callback.htm?code=${code}`);
}