import { render, screen } from "@testing-library/react";
import App from "./index.js";

test("renders", () => {
	render(<App />);
	const anything = screen.getByText("");
	expect(anything).toBeInTheDocument();
});
