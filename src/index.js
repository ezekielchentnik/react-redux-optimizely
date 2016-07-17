import reporter from 'redux-reporter';
import React, { Component, PropTypes } from 'react';

function getActiveExperiments() {
    return (window['optimizely'] && window['optimizely'].activeExperiments) ? window['optimizely'].activeExperiments : []; // eslint-disable-line
}

function getVariationMap() {
    return window['optimizely'].variationMap || {}; // eslint-disable-line
}

function isEnabled(EXPERIMENT_ID) {
    return true; // todo, actually check, although this is an extraneious check
}

function getExperimentId(EXPERIMENT_NAME) {
    // todo
}

function isActive(EXPERIMENT_ID) {
    const activeExperiments = getActiveExperiments();
    const found = activeExperiments.filter((activeExperimentId) => {
        return activeExperimentId === EXPERIMENT_ID;
    });
    return !!found.length;
}

export function getVariant(EXPERIMENT_ID) {
    const variationMap = getVariationMap();
    if(isEnabled(EXPERIMENT_ID) && isActive(EXPERIMENT_ID)){
        return  variationMap[EXPERIMENT_ID];
    }
    return null;
}

export function activate(EXPERIMENT_ID) {

    if(!isEnabled(EXPERIMENT_ID)){
        return false;
    }

    if(!isActive(EXPERIMENT_ID)){ // only activate, enabled experiment
        window['optimizely'] = window['optimizely'] || []; // eslint-disable-line
        window['optimizely'].push(["activate", EXPERIMENT_ID]); // eslint-disable-line
    }

    return isActive(EXPERIMENT_ID);
}

export default (experimentId, suppressActivateOnRender = false) => (Wrapped) => {

    class Wrapper extends Component {

        render() {
            let isActive = false;
            if(!suppressActivateOnRender){
                isActive = activate(experimentId);
            }

            const variant = getVariant(experimentId);

            return (<Wrapped isActive={isActive}
                    variant={variant} {...this.props} />);

        }
    }

    Wrapper.propTypes = {
        experimentId: PropTypes.string,
        suppressActivateOnRender: PropTypes.bool
    };

    return Wrapper;
};

const goalMiddleware = reporter(({ type, payload }) => {

    window.optimizely = window.optimizely || [];
    window.optimizely.push(['trackEvent', type, payload]);

}, ({ meta = {} }) => meta.experiments);

export { goalMiddleware };
