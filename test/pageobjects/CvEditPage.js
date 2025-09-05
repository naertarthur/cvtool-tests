const { $ } = require("@wdio/globals");

class CvEditPage {
  get addCertificateBtn() {
    return $('a[href="/certificates/new"]');
  }

  async open() {
    await browser.open(
      "https://brightest-portal-staging.herokuapp.com/curriculum_vitae_preview/edit"
    );
  }

  async clickAddCertificate() {
    await this.addCertificateBtn.click();
  }
}

module.exports = new CvEditPage();
