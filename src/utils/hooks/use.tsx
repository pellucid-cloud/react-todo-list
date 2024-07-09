const PROMISE_STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

function decidePromiseState(promise:Promise<never>) {
  const t = {};
  return Promise.race([promise, t])
      .then(v => (v === t) ? PROMISE_STATE.PENDING : PROMISE_STATE.FULFILLED)
      .catch(() => PROMISE_STATE.REJECTED)
}

export async function use(promise: Promise<never>) {
  const status = await decidePromiseState(promise)
  if (status === PROMISE_STATE.FULFILLED) {
    return await Promise.resolve(promise)
  } else if (status === PROMISE_STATE.REJECTED) {
    throw await Promise.reject(promise)
  } else if (status === PROMISE_STATE.PENDING) {
    throw promise;
  }
}
