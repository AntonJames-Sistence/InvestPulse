import React from "react";
import { render, screen } from "@testing-library/react";
import Team from "../Team";
import { teamData } from "../../data/teamData";
import "@testing-library/jest-dom";

// Mock teamData in case connection errors or switching from static data
jest.mock("../../data/teamData", () => ({
  teamData: [
    {
      name: "John Doe",
      title: "Software Engineer",
      description: "Experienced in building scalable web applications.",
      img: "path/to/johndoe.jpg",
    },
    {
      name: "Jane Smith",
      title: "Product Manager",
      description: "Expert in product lifecycle management.",
      img: "path/to/janesmith.jpg",
    },
  ],
}));

describe("Tests for Team component", () => {
  beforeEach(() => {
    render(<Team />);
  });

  it("shows the team description", () => {
    expect(
      screen.getByText(/Innovative team driving impactful solutions/i)
    ).toBeInTheDocument();
  });

  it("shows each team member name", () => {
    teamData.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
    });
  });

  it("shows each team member title", () => {
    teamData.forEach((member) => {
      expect(screen.getByText(member.title)).toBeInTheDocument();
    });
  });

  it("shows each team member description", () => {
    teamData.forEach((member) => {
      expect(screen.getByText(member.description)).toBeInTheDocument();
    });
  });

  it("shows each team member image", () => {
    teamData.forEach((member) => {
      expect(screen.getByAltText(`${member.name} photo`)).toBeInTheDocument();
    });
  });
});
