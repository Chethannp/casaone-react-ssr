import React from "react";
import { shallow } from "enzyme";
import {
    findByTestAttr,
    checkProps,
    testStore
} from "../../../testHelper/testUtils";
import Toast from "./index";

const setUp = (props = {}) => {
    const store = testStore();
    const wrapper = shallow(<Toast store={store} {...props} />).dive();
    return wrapper;
};

describe("Should render without errors", () => {
    let component;
    beforeEach(() => {
        const props = {
            toastMessage: "Hello!"
        };
        component = setUp(props);
    });

    //Test for Data Test Attribute
    describe("Testing based on data-test attribute", () => {
        test("Should render without any erros", () => {
            const wrapper = findByTestAttr(component, "toastComponent");
            expect(wrapper.length).toBe(1);
        });
    });

    //Test for PropTypes
    describe("Checking PropTypes", () => {
        test("Should not throw a warning", () => {
            const expectedProps = {
                hideCustomToast: () => {},
                toastMessage: ""
            };

            const propsErr = checkProps(Toast, expectedProps);

            expect(propsErr).toBeUndefined();
        });
    });
});
