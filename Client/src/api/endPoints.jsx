const endPoints = {
    AUTH: {
      LOGIN: "/users/login",
      REGISTER: "/users/register",
    },
    PRODUCTS: {
      GET_ALL_PRODUCTS: "/products",
      GET_SINGLE_PRODUCT: (id) => `/products/${id}`,
      GET_CATEGORY:(categoryname) => `/products/category/${categoryname}`,
      SEARCH: (keyword) => `/products/search?keyword=${keyword}`,
    },
    CART: {
      GET_CART: (userID) => `/cart/${userID}`,
      ADD_TO_CART: (userID) => `/cart/${userID}`,
      REMOVE_FROM_CART: (userID, productID) => `/cart/${userID}/${productID}`,
      INCREASE_CART: (userID) => `/cart/${userID}/increase`,
      DECREASE_CART: (userID) => `/cart/${userID}/decrease`,
      CART_TOTAL: (userID) => `/cart/${userID}/total-price`,
      CART_ITEMS: (userID) => `/cart/${userID}/total-items`,
      CLEAR_CART: (userID) => `/cart/${userID}/clear`,
    },
    WISHLIST: {
      GET_WISHLIST: "/wishlist",
    },
    PROFILE: {
      GET_PROFILE: (userID)=> `/account/${userID}`,
      UPDATE_PROFILE: (userID)=> `/account/${userID}`,
    },
    ORDERS: {
      CREATE: "/orders",
      GET_USER_ORDERS: "/orders/user",
      GET_SINGLE_ORDER: (id) => `/orders/${id}`,
    },
  };
  
  export default endPoints;
  