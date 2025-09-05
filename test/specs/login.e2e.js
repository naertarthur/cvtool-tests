const LoginPage = require("../pageobjects/LoginPage");
const { browser, expect } = require("@wdio/globals");

it("Show an error for invalid password", async () => {
  await LoginPage.open();

  await LoginPage.login("arthur.naert@brightest.be", "fake");
  await browser.pause(1500);
  await expect(LoginPage.errorMessage).toBeDisplayed();
  await expect(LoginPage.errorMessage).toHaveText("Invalid Email or password.");
});

it("Show an error for invalid email", async () => {
  await LoginPage.open();

  await LoginPage.login("fake@brightest.be", "Test12345!");
  await browser.pause(1500);

  await expect(LoginPage.errorMessage).toBeDisplayed();
  await expect(LoginPage.errorMessage).toHaveText("Invalid Email or password.");
});
it("Login works with valid credentials", async () => {
  await LoginPage.open();

  await LoginPage.login("johndoe1@brightestt.be", "Test12345!");
  await browser.pause(1500);
  await expect(browser).toHaveUrl(
    "https://brightest-portal-staging.herokuapp.com/"
  );
});
