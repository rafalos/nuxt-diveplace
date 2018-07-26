export default function ({ store, redirect, route}) {
    if (!store.state.auth || store.state.auth.user.admin == false) {
      return redirect('/')
    }
  }