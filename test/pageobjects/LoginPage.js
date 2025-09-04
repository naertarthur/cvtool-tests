const { $, browser, expect } = require("@wdio/globals");

class LoginPage {
  get inputEmail() {
    return $("#user_email");
  }

  get inputPassword() {
    return $("#user_password");
  }

  get loginButton() {
    return $('button[type="submit"]');
  }

  get errorMessage() {
    return $(".toast-message");
  }
  async open() {
    await browser.url(
      "https://brightest-portal-staging.herokuapp.com/users/sign_in"
    );
  }
  async login(username, password) {
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = new LoginPage();
