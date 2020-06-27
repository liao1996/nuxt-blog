export const state = () => ({
  counter: 2,
  isPhone: false,
})

export const mutations = {
  PCORPHONE(state, bool) {
    state.isPhone = bool
  }
}
