export const state = () => ({
    readNum: 0,
    loveNum: 0
})

export const mutations = {
    updateReadNum(state, val) {
        if (val) { state.readNum = val } else { state.readNum += 1 }
    },
    updateLoveNum(state, val) {
        if (val) { state.loveNum = val } else { state.loveNum += 1 }
    }
}