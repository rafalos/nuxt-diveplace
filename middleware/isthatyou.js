export default function ({ store, redirect, route}) {
  if (!store.state.auth || store.state.auth.user.username !== route.params.name) {
    return redirect('/')
  }
}