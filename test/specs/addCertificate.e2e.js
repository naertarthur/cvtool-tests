const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/LoginPage");
const CvEditPage = require("../pageobjects/CvEditPage");
const CertificatePage = require("../pageobjects/CertificatePage");

describe("CV Certificates Feature", () => {

  it("Add certificate with valid free input fields", async () => {
        await LoginPage.open();
    await LoginPage.login("johndoe1@brightest.be", "Test12345!");

    await CvEditPage.open();
    await CvEditPage.clickAddCertificate();

    await CertificatePage.addCertificateWithInputs(
      "Test",
      "Brightest Academy",
      "2024"
    );

    const addedCertificate = await $(
      `//li[contains(., "2024") and contains(., "Test") and contains(., "Brightest Academy")]`
    );
    await addedCertificate.scrollIntoView();
    await expect(addedCertificate).toBeDisplayed();
  });

  it("Add certificate with curated dropdowns", async () => {
    await CvEditPage.open();
    await CvEditPage.clickAddCertificate();

    await CertificatePage.addCertificateWithDropdowns(
      "ISTQB Foundation",
      "Wolters Test",
      "2024"
    );

    const addedCert = await $(
      `//li[contains(., "2024") and contains(., "ISTQB Foundation") and contains(., "Wolters Test")]`
    );
    await addedCert.scrollIntoView();
    await expect(addedCert).toBeDisplayed();
  });

  it("Show validation messages when adding certificate with empty fields", async () => {
    await CvEditPage.open();
    await CvEditPage.clickAddCertificate();

    await CertificatePage.saveBtn.click();

    const errorMessages = await $$(".invalid-feedback");
    expect(errorMessages.length).toBeGreaterThan(0);

    for (let error of errorMessages) {
      await expect(error).toBeDisplayed();
      const text = await error.getText();
      expect(text).toContain("No, you missed this one.");
    }
  });

  it("Delete a certificate successfully", async () => {
    await CvEditPage.open();

    const beforeCount = (await $$("div.clearfix li")).length;

    if (beforeCount === 0) {
      await CvEditPage.clickAddCertificate();
      await CertificatePage.addCertificateWithInputs(
        "TestCertificate",
        "TestDistributor",
        "2023"
      );
    }

    await CertificatePage.deleteFirstCertificate();
    await browser.pause(2000);

    const afterCount = (await $$("div.clearfix li")).length;
    expect(afterCount).toBeLessThan(beforeCount);
  });
});
