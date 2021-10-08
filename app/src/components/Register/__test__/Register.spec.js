import Register from "../Register";
import { render, screen } from "@testing-library/react";

describe("Register [COMPONENT]", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("should render the Register component without failures", () => {
    expect(screen.getByTestId("first-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("last-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("should have a submit button", () => {
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
});
