import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renders the main page", () => {
  render(<App />);
  expect(screen.getByText("Todo")).toBeInTheDocument();
  expect(screen.getByText("Deadline")).toBeInTheDocument();
  expect(screen.getByText("Search")).toBeInTheDocument();
  expect(screen.getByText("No todos to show")).toBeInTheDocument();
});
