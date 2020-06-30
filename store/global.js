export const state = () => ({
    readNum: 0,
    loveNum: 0,
    blogList:[], //获取的文章
    count:0 //文章总数
})

export const mutations = {
    updateReadNum(state, val) {
        if (val) { state.readNum = val } else { state.readNum += 1 }
    },
    
    updateLoveNum(state, val) {
        if (val) { state.loveNum = val } else { state.loveNum += 1 }
    },
    updateBlogList(state, newBlogList) {
        state.blogList = newBlogList;
    },
    updateCount(state, val) {
        state.count = val;
    },
}

export const actions = {
}
