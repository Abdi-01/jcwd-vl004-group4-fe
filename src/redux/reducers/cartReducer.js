
const initialState = {
    cartCount: 0,
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CART_COUNT":
            return {
                ...state,
                cartCount: action.payload
            };
        case "CLEAR_CART":
            return initialState
        default:
            return state;
    }
}

