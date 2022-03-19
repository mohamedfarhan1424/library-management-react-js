const initState = {
    name: "",
    email: "",
    username:"",
    isAuthenticated: false,
    phoneno:"",
    books:{},
    nums:0,
  };
  export function reducer(state = initState, action) {
    switch (action.type) {
      case "LOG_IN":
        return {
          ...state,
          name: action.payload.name,
          email: action.payload.email,
          username: action.payload.username,
          isAuthenticated: action.payload.isAuthenticated,
          phoneno:action.payload.phoneno,
        };
        case "BOOKS":
          return {
            ...state,
            books:action.payload.books,
          };
          case "ROWS":
            return {
              ...state,
              nums:action.payload.nums,
            };
      case "LOGOUT":
        return {
          ...initState,
        };
  
      default:
        return { ...state };
    }
  }