
import optimizely  from 'optimizely-client-sdk';

export function createInstance(datafile) {
  return optimizely.createInstance({ datafile });
}

export { experimentReducer, ACTIVATE } from './reducer'

export { activate, track } from './actions'

// export experimentMiddleware from './middleware' // TODO: NEED TO FIGURE OUT HOW TO SET THIS UP WITH THE INSTANCE OF optimizely

export { getVariation } from './selectors' // TODO: getVariation,
