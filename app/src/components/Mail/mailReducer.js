const initialState = {
  to: "",
  message: "",
  subject: "",
  error: "",
};

const mailReducer = (state, action) => {
  switch (action.type) {
    case "to": {
      return {
        ...state,
        to: action.payload,
      };
    }

    case "message": {
      return {
        ...state,
        message: action.payload,
      };
    }

    case "subject": {
      return {
        ...state,
        subject: action.payload,
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

export { initialState, mailReducer };
