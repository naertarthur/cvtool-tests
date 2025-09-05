const { $ } = require("@wdio/globals");

class CertificatePage {
  get inputCertificate() {
    return $('input[name="certificate[certificate]"]');
  }

  get inputDistributor() {
    return $('input[name="certificate[distributor]"]');
  }

  get inputYear() {
    return $("#datepicker-year");
  }

  get saveBtn() {
    return $("#js-submit-btn");
  }

  get dropDownCertificate() {
    return $("#select2-select2dropdown1-container");
  }
  optionInDropDown(optionText) {
    return $(
      `//li[@role="option" and normalize-space(text())="${optionText}"]`
    );
  }
  async selectCuratedCertificate(optionText) {
    await this.dropDownCertificate.click();
    const option = await this.optionInDropDown(optionText);
    await option.waitForDisplayed();
    await option.click();
  }
  get dropDownDistributor() {
    return $("#select2-select2dropdown2-container");
  }
  optionInDistributorDropdown(optionText) {
    return $(
      `//li[@role="option" and normalize-space(text())="${optionText}"]`
    );
  }
  async selectCuratedDistributor(optionText) {
    await this.dropDownDistributor.click();
    const option = await this.optionInDistributorDropdown(optionText);
    await option.waitForDisplayed();
    await option.click();
  }
  async addCertificateWithDropdowns(certificateName, distributorName, year) {
    await this.selectCuratedCertificate(certificateName);
    await this.selectCuratedDistributor(distributorName);
    await this.yearInput.setValue(year);
    await this.saveBtn.click();
  }
   async addCertificateWithInputs(certificateName, distributorName, year) {
    await this.inputCertificate.setValue(certificateName);
    await this.inputDistributor.setValue(distributorName);
    await this.inputYear.setValue(year);
    await this.saveBtn.click();
  }
}
module.exports = new CertificatePage();
