const IS_BROWSER = typeof window !== 'undefined';

function apiExists(){
    return (IS_BROWSER && window['optimizely']);
}

function getActiveExperiments() {
    return (apiExists && window['optimizely'].activeExperiments) ? window['optimizely'].activeExperiments : [];
}

function getAllExperiments() {
    return (apiExists && window['optimizely'].allExperiments) ? window['optimizely'].allExperiments : {};
}

function getVariationMap() {
    return (apiExists && window['optimizely'].variationMap) ? window['optimizely'].variationMap : {};
}

function activateExperiment(EXPERIMENT_ID){
    try {
        window['optimizely'] = window['optimizely'] || [];
        window['optimizely'].push(["activate", EXPERIMENT_ID]);
    } catch(err){
        console.error(err);
    }
}

function isEnabled(EXPERIMENT_NAME) {
    const experiment = getExperimentByName(EXPERIMENT_NAME);
    return (experiment && experiment.enabled) ? true : false;
}

function isDuplicate(EXPERIMENT_NAME) {

    const EXPERIMENTS_WITH_NAME = [];
    const allExperiments = getAllExperiments();
    for (var key in allExperiments) {
      let experiment = allExperiments[key];
      if(experiment.name === EXPERIMENT_NAME){
          EXPERIMENTS_WITH_NAME.push(key);
      }
    }
    if(EXPERIMENTS_WITH_NAME.length > 1){
        console.error('Duplicate experiment names occurred, cannot activate exp.');
        return true;
    }
    return false;
}

function getExperimentId(EXPERIMENT_NAME){
    let EXPERIMENT_ID = null;
    const allExperiments = getAllExperiments();
    for (var id in allExperiments) {
      let experiment = allExperiments[id];
      if(experiment.name === EXPERIMENT_NAME){
          EXPERIMENT_ID = id;
      }
    }

    return EXPERIMENT_ID;
}

function getExperimentById(EXPERIMENT_ID){
    const allExperiments = getAllExperiments();
    const experiment = allExperiments[EXPERIMENT_ID];
    return (experiment) ? experiment : null;
}

function getExperimentByName(EXPERIMENT_NAME){
    const EXPERIMENT_ID = getExperimentId(EXPERIMENT_NAME);
    return getExperimentById(EXPERIMENT_ID);
}

function isActive(EXPERIMENT_NAME) {
    const EXPERIMENT_ID = getExperimentId(EXPERIMENT_NAME);
    const activeExperiments = getActiveExperiments();
    const found = activeExperiments.filter((activeExperimentId) => {
        return activeExperimentId === EXPERIMENT_ID;
    });
    return !!found.length;
}

export function getVariant(EXPERIMENT_NAME) {
    const variationMap = getVariationMap();
    if(!isDuplicate(EXPERIMENT_NAME) && isEnabled(EXPERIMENT_NAME) && isActive(EXPERIMENT_NAME)){
        const EXPERIMENT_ID = getExperimentId(EXPERIMENT_NAME);
        return  variationMap[EXPERIMENT_ID];
    }
    return null;
}

export function activate(EXPERIMENT_NAME) {

    if(IS_BROWSER && isDuplicate(EXPERIMENT_NAME) || !isEnabled(EXPERIMENT_NAME)){
        return false;
    }

    const EXPERIMENT_ID = getExperimentId(EXPERIMENT_NAME);

    if(!isActive(EXPERIMENT_NAME) && EXPERIMENT_ID){
        activateExperiment(EXPERIMENT_ID);
    }

    return isActive(EXPERIMENT_NAME);
}

import React, { Component, PropTypes } from 'react';

export default (experimentName, suppressActivateOnRender = false) => (Wrapped) => {

    class Wrapper extends Component {

        render() {
            let isActive = false;
            if(!suppressActivateOnRender){
                isActive = activate(experimentName);
            }

            const variant = getVariant(experimentName);

            return (<Wrapped isActive={isActive}
                    variant={variant} {...this.props} />);

        }
    }

    Wrapper.propTypes = {
        experimentName: PropTypes.string,
        suppressActivateOnRender: PropTypes.bool
    };

    return Wrapper;
};


// use
// import React from 'react';
// import connect from 'react-redux-optimizely';
//
// let Header = ({ variant, isActive }) => {
//     // console.log('experiment', variant, isActive);
//     if (variant) {
//         return (<h1>Variant</h1>);
//     }
//     return (<h1>Base</h1>);
// };
//
// export default connect('MY_EXP_NAME')(Header);
