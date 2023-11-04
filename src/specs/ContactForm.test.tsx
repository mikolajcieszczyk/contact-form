import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactForm } from "../components/ContactForm";

describe("ContactForm", () => {
  it("renders form with all fields", () => {
    render(<ContactForm />);

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Name*");
    const surnameInput = screen.getByLabelText("Surname");
    const emailInput = screen.getByLabelText("E-mail*");
    const descriptionTextarea = screen.getByLabelText(
      "Please describe your question or issue*"
    );
    const privacyPolicyCheckbox = screen.getByLabelText(
      "I have read and agree to the Privacy Policy.*"
    );
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(nameInput).toBeInTheDocument();
    expect(surnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(privacyPolicyCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Name*");
    const emailInput = screen.getByLabelText("E-mail*");
    const descriptionTextarea = screen.getByLabelText(
      "Please describe your question or issue*"
    );
    const privacyPolicyCheckbox = screen.getByLabelText(
      "I have read and agree to the Privacy Policy.*"
    );
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "This is my question" },
    });
    fireEvent.click(privacyPolicyCheckbox);
    fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();
  });

  it("displays error message for invalid data", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Name*");
    const emailInput = screen.getByLabelText("E-mail*");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    const nameError = await screen.findByText(
      "This field is required, please complete it"
    );
    const emailError = await screen.findByText("Incorrect e-mail address");

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
  });
});
