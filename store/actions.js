import request from '@/service'

export const blogList = async (store) => {
    return await request.post('lz/index/findArticleList.htm')
  }
