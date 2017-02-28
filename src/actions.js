import { ACTIVATE } from './reducer';

export function activate(experimentName, userId) {
  return (dispatch, getState, optimizelyInstance) => {
    const variation = optimizelyClientInstance.activate(experimentName, userId)
    return {
        type: ACTIVATE,
        payload: {
          variation,
        }
    }
  }
}

export function track(action, userId) {
  return (dispatch, getState, optimizelyInstance) => {
    optimizelyInstance.track(action, userId);
  }
}

