import reporter from 'redux-reporter';

//TODO:
export default reporter(({ type, payload }) => {
    try {
        window.optimizely.push(['trackEvent', type, payload])
    } catch (err) {}
}, ({ meta = {} }) => meta.experiments)
