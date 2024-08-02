import NavBar from "../NavBar";
import React from "react";
import { screen, render } from "@testing-library/react";
import { navLinks } from "../../data/navLinks";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime"; // Import the router context
import mockRouter from "next-router-mock";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider } from "../Auth/AuthContext";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe("Tests for NavBar component", () => {
  beforeEach(() => {
    // Set the mocked usePathname to return a specific path
    usePathname.mockReturnValue("/");

    render(
      <RouterContext.Provider value={mockRouter}>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </RouterContext.Provider>
    );
  });

  it("Shows Navigation links", () => {
    navLinks.forEach((link) => {
        const title = screen.getAllByText(link.title);
        expect(title.length).toBeGreaterThan(0); // Ensure at least one element with the text is found
    });
  });
});
