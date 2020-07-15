export default function ({ store, redirect }) {
    if (!store.state.userName) {
      return redirect('/')
    }
  }