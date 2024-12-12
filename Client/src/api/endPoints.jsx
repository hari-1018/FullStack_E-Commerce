const endPoints = {
    AUTH: {
      LOGIN: "/users/login",
      REGISTER: "/users/register",
    },
    PRODUCTS: {
      GET_ALL_PRODUCTS: "/products",
      GET_SINGLE_PRODUCT: (id) => `/products/${id}`,
      GET_CATEGORY:(categoryname) => `/products/category/${categoryname}`,
      SEARCH: "/products/searchterm",
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
      ADD_TO_WISHLIST: (userID) => `/wishlist/${userID}`,
      VIEW_WISHLIST: (userID) => `/wishlist/${userID}/`,
      REMOVE_FROM_WISHLIST: (userID, productID) => `/wishlist/${userID}/${productID}`,

    },
    PROFILE: {
      GET_PROFILE: (userID)=> `/account/${userID}`,
      UPDATE_PROFILE: (userID)=> `/account/${userID}`,
    },
    ORDERS: {
      PLACE_ORDER:(userID) => `/orders/${userID}/placeorder`,
      GET_USER_ORDERS:(userId) => `/orders/${userId}`,
    },
    ADMIN: { 
      GET_ALL_USERS: "/admin/users",
      GET_TOTAL_USERS: "/admin/dashboard/total-users",
      GET_SINGLE_USER : (userID) => `/admin/users/${userID}`,
      BLOCK_USER: (userID) => `/admin/users/block/${userID}`,
      UNBLOCK_USER: (userID) => `/admin/users/unblock/${userID}`,
      GET_ALL_PRODUCTS: "/admin/products",
      GET_TOTAL_PRODUCTS: "/admin/dashboard/total-products",
      ADD_PRODUCT: "/admin/products",
      GET_SINGLE_PRODUCT: (productID) => `/admin/products/${productID}`,
      EDIT_PRODUCT: (productID) => `/admin/products/${productID}`,
      DELETE_PRODUCT: (productID) => `/admin/products/${productID}`,
      GET_ALL_ORDERS: "/admin/orders",
      GET_TOTAL_ORDERS: "/admin/dashboard/total-orders",
      GET_RECENT_ORDER: "/admin/dashboard/recent-orders",
      GET_SINGLE_ORDER: (userID) => `/admin/orders/${userID}`,
      GET_EARNINGS: "/admin/dashboard/total-earnings",
      
    }
  };
  
  export default endPoints;
  