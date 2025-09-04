const { $, browser, expect } = require("@wdio/globals");

class RegisterPage {
  get inputFirstName() {
    return $("#user_first_name");
  }

  get inputLastName() {
    return $("#user_last_name");
  }

  get inputEmail() {
    return $("#user_email");
  }

  get inputPassword() {
    return $("#user_password");
  }

  get inputPasswordConfirm() {
    return $("#user_password_confirmation");
  }
  get signInButton() {
    return $('button[type="submit"]');
  }
  get validationErrors(){
    return $$('.invalid-feedback');
  }
  get serverErrorMessages(){
    return $$('.alert ul li');
  }
  async open(){
    await browser.url('https://brightest-portal-staging.herokuapp.com/users/sign_up')
  }
  async register(firstName, lastName, email, password, confirmPassword){
    await this.inputFirstName.setValue(firstName)
    await this.inputLastName.setValue(lastName)
    await this.inputEmail.setValue(email)
    await this.inputPassword.setValue(password)
    await this.inputPasswordConfirm.setValue(confirmPassword)
    await this.signInButton.click();
  }
}

module.exports = new RegisterPage();
