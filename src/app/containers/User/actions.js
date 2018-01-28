export const types = {
  LOADING: 'actions.user.loading',
  CONNECT: 'actions.user.connect',
  DISCONNECT: 'actions.user.disconnect',
};

export function startLoading() {
  return {
    type: types.LOADING,
    loading: true,
  };
}

export function stopLoading() {
  return {
    type: types.LOADING,
    loading: false,
  };
}

export function connect(user) {
  return {
    type: types.CONNECT,
    user: user,
  };
}

export function disconnect() {
  return {
    type: types.DISCONNECT,
  };
}

export default {
  types,
  connect,
  disconnect,
  startLoading,
  stopLoading,
};