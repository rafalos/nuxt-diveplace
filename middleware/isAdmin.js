export default function ({ store, redirect, route}) {
    if (!store.state.auth || store.state.authUser.admin == false) {
      return redirect('/')
    }
  }