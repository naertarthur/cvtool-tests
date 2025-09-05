const { $ } = require("@wdio/globals");

class CvEditPage {
  get addCertificateBtn() {
    return $('a[href="/certificates/new"]');
  }

  async open() {
    await browser.url(
      "https://brightest-portal-staging.herokuapp.com/curriculum_vitae_preview/edit"
    );
  }

  async clickAddCertificate() {
  const btn = await this.addCertificateBtn;
  await btn.waitForClickable({ timeout: 5000 });
  await btn.click();
}

}

module.exports = new CvEditPage();
