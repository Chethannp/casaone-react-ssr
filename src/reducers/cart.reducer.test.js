import cartReducer from "./cart.reducer";

describe("List Reducer", () => {
    //Check if type does not match then the reducer should return the default value which would be []
    test("Should return default state", () => {
        const newState = cartReducer(undefined, {});
        expect(newState).toEqual([]);
    });
});
