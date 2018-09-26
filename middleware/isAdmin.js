export default function ({ store, redirect, route}) {
    if (!store.state.authUser || store.state.authUser.admin == false) {
      return redirect('/')
    }
  }