import Login from "../Login";
import { render, screen } from "@testing-library/react";

describe("Login [COMPONENT]", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("should render the Login component without failures", () => {
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("should have a submit button", () => {
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should have a remember me checkbox", () => {
    expect(screen.getByTestId("remember-me-checkbox")).toBeInTheDocument();
  });

  it("should have a not registered link", () => {
    const noAccount = screen.getByTestId("register-link");

    expect(noAccount).toBeInTheDocument();
  });
});
