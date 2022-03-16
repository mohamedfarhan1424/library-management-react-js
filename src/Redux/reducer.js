const initState = {
    name: "",
    email: "",
    username:"",
    isAuthenticated: false,
    phoneno:"",
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
      case "LOGOUT":
        return {
          ...initState,
        };
  
      default:
        return { ...state };
    }
  }