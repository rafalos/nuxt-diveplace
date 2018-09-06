export default function ({ store, redirect, route}) {
  if (!store.state.authUser || store.state.authUser.username !== route.params.name) {
    return redirect('/')
  }
}