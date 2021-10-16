const initialState = {
  email: "",
  password: "",
  error: "",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "email": {
      return {
        ...state,
        email: action.payload,
      };
    }

    case "password": {
      return {
        ...state,
        password: action.payload,
      };
    }

    case "error": {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export { initialState, loginReducer };
