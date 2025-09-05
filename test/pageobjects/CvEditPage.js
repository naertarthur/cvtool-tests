const { $, browser } = require("@wdio/globals");

class CvEditPage {
  get addCertificateBtn() {
    return $('a[href="/certificates/new"]');
  }

  async open() {
    await browser.url(
      "https://brightest-portal-staging.herokuapp.com/curriculum_vitae_preview/edit"
    );
    await this.addCertificateBtn.waitForDisplayed({ timeout: 10000 });
  }

  async clickAddCertificate() {
    const btn = await this.addCertificateBtn;
    await btn.scrollIntoView();
    await btn.waitForClickable({ timeout: 10000 });
    await btn.click();
  }
}

module.exports = new CvEditPage();
