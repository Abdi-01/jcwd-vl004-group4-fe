import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADJUST_QTY,
    LOAD_CURRENT_ITEM,
} from '../actions/cartTypes.js'

const initialState = {
    products: [
        {
            id: 1,
            title: "paracetamole",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            category: "capsule",
            price: 15000,
            image: "https://images.k24klik.com/product/large/apotek_online_k24klik_20210624013902359225_paracetamol-triman.jpg"
        },
        {
            id: 2,
            title: 'Lisinopril',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            category: "capsule",
            price: 15000,
            image: "https://d2qjkwm11akmwu.cloudfront.net/products/210210_15-7-2019_9-47-34.jpg"
        },
        {
            id: 3,
            title: 'Omeprazole',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            category: "capsule",
            price: 25000,
            image: "https://d2qjkwm11akmwu.cloudfront.net/products/825426_4-11-2020_10-29-21.jpeg"
        }],
    cart: [
        {
            id: 3,
            title: 'Omeprazole',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            category: "capsule",
            price: 25000,
            image: "https://d2qjkwm11akmwu.cloudfront.net/products/825426_4-11-2020_10-29-21.jpeg"
        }
    ], // {id, tite, desc, img. qty}
    currentItem: null
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            // get items data from the products array
            const item = state.products.find(prod => prod.id === action.payload.id)
            // check if item is in cart already
            const inCart = state.cart.find(item => item.id === action.payload.id ? true : false)
            return {
                ...state,
                cart: inCart 
                ? state.cart.map(item => 
                    item.id === action.payload.id 
                    ? {...item, qty: item.qty + 1} : item) 
                    : [...state.cart, {...item, qty: 1}]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            };
        case ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ? {...item, qty: +action.payload.qty} : item)
            };
        case LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            };
        default:
            return state;
    }
}

