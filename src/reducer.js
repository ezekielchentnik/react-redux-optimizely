export const ACTIVATE = '@@exp/ACTIVATE'

export default function experimentReducer(state = {}, { type, payload } = {}) {
  if (type === ACTIVATE) {
    return Object.assign({}, state, {
      [payload.experimentName]: payload.variation
    })
  }
  return state
}
