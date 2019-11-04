import React from "react";
import { mount } from "enzyme";
import CheckPropTypes from "check-prop-types";

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/";

/**
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - val of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

/**
 * @function checkProps
 * @param {Component} component
 * @param {Props} confirmingProps
 * @returns {errors}
 */
export const checkProps = (component, confirmingProps) => {
    const propError = CheckPropTypes(
        component.propTypes,
        confirmingProps,
        "prop",
        component.name
    );
    expect(propError).toBeUndefined();
};

/**
 * @function renderHook
 * @param {hook} component - custom dynamic hook
 * @returns {results} object which contains any methods mentioned inside the custom dynamic hook
 */
export const renderHook = hook => {
    let results;
    function HookWrapper() {
        results = hook();
        return null;
    }
    mount(<HookWrapper />);

    return results;
};

export const testStore = initialState => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
    return store;
};
