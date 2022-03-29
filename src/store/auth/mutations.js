export function setAuthState (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isAdmin = data.isAdmin
  state.user = data.user
}

export function setLoad (state, load) {
  state.load = load
}