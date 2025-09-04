const RegisterPage = require("../pageobjects/RegisterPage");
const { browser, expect } = require("@wdio/globals");

describe("Register feature", () => {
  const basePassword = "Test";

  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("Register works with correct data", async () => {
    const timestamp = Date.now();
    const email = `arthur${timestamp}@brightest.be`;

    await RegisterPage.open();
    await RegisterPage.register(
      "Arthur",
      "Naert",
      email,
      basePassword,
      basePassword
    );
    await expect(browser).toHaveUrl(
      "https://brightest-portal-staging.herokuapp.com/"
    );
  });

  it("Show validation errors when submitting empty form or field", async () => {
    await RegisterPage.open();
    await RegisterPage.signInButton.click();

    const errors = await RegisterPage.validationErrors;
    expect(errors.length).toBeGreaterThan(0);

    await expect(errors[0]).toHaveText("No, you missed this one.");
  });

  it("Show server-side error when password is too short", async () => {
    const timestamp = Date.now();
    const shortEmail = `short${timestamp}@brightest.be`;

    await RegisterPage.open();
    await RegisterPage.register("Arthur", "Naert", shortEmail, "abc", "abc");

    await expect(RegisterPage.serverErrorMessages).toBeElementsArrayOfSize({
      gte: 1,
    });

    const errors = await RegisterPage.serverErrorMessages;
    await expect(errors[0]).toHaveText(
      "Password is too short (minimum is 8 characters)"
    );
  });
});
