# react-redux-optimizely

[![Build Status](https://travis-ci.org/ezekielchentnik/react-redux-optimizely.svg)](https://travis-ci.org/ezekielchentnik/react-redux-optimizely)
[![npm version](https://img.shields.io/npm/v/react-redux-optimizely.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-optimizely)

React Component(s) and helpers for running Optimizely experiments in a React/Redux Application.

## Installation

```js
npm install --save react-redux-optimizely
```

### Connecting an experiment
```js
import React from 'react';
import connect from 'react-redux-optimizely';

let Header = ({ variant, isActive }) => {
    if (variant) {
        return (<h1>Variant</h1>);
    }
    return (<h1>Base</h1>);
};

export default connect('MY_EXP_NAME')(Header);
```

### Configuring Optimizely
```js
// todo
```

### Experiment Conditions
```js
// todo
```

### Activate Experiment on render
```js
// todo
```

## Configure Redux Middleware
```js
// todo
```

### Goal Tracking
```js
// todo
```
