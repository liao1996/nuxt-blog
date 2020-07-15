export const state = () => ({
    userName: ""
})
// export const actions = {
//     // nuxtServerInit is called by Nuxt.js before server-rendering every page
//     nuxtServerInit({ commit }, { req }) {
//         if (req.session && req.session.sessionToken) {
//             console.log("用户已经登录");
//             commit("SET_USER", req.session.sessionToken);
//         }
//     },
// }
export const mutations = {
    setUser(state, user) {
        state.userName = user;
    },
}