const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  error: "",
};

const registerReducer = (state, action) => {
  switch (action.type) {
    case "firstname": {
      return {
        ...state,
        firstName: action.payload,
      };
    }

    case "lastname": {
      return {
        ...state,
        lastName: action.payload,
      };
    }

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

export { initialState, registerReducer };
