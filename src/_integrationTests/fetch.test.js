import moxios from "moxios";
import { testStore } from "../testHelper/testUtils";
import { fetchCartDetails } from "../actions/cart/cart.actions";

describe("fetchCartDetails", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("Store is updated correctly", () => {
        const expectedState = [
            {
                products: [
                    {
                        productId: 123456,
                        productName: "Sofa",
                        productQty: 2,
                        productPrice: 500,
                        productNotes: "A must need"
                    },
                    {
                        productId: 784456,
                        productName: "Tables",
                        productQty: 2,
                        productPrice: 6000,
                        productNotes: ""
                    }
                ]
            }
        ];

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });
        });

        return store.dispatch(fetchCartDetails()).then(() => {
            const newState = store.getState().cart.products;
            expect(newState).toEqual(expectedState[0].products);
        });
    });
});
