const RegisterPage = require("../pageobjects/RegisterPage");
const { $, browser, expect } = require("@wdio/globals");

describe("Register feature", () => {
  const timestamp = Date.now();
  const validEmail = `arthur${timestamp}@brightest.be`;
  const validPassword = "Test12345!";

  it("Register works with correct data", async () => {
    await RegisterPage.open();
    await browser.pause(1500);
    await RegisterPage.register(
      "Arthur",
      "Naert",
      validEmail,
      validPassword,
      validPassword
    );
    await browser.pause(1500);
    await expect(browser).toHaveUrl(
      "https://brightest-portal-staging.herokuapp.com/"
    );
  });
});
