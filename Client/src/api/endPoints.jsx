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

    },
    WISHLIST: {

    },
    PROFILE: {
      GET_PROFILE: "/profile",
      UPDATE_PROFILE: "/profile",
    },
    ORDERS: {
      CREATE: "/orders",
      GET_USER_ORDERS: "/orders/user",
      GET_SINGLE_ORDER: (id) => `/orders/${id}`,
    },
  };
  
  export default endPoints;
  