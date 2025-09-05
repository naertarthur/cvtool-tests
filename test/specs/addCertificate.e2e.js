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

    const lastCert = await $("(//div[@class='clearfix']/li)[last()]");
    await lastCert.scrollIntoView();
    await lastCert.waitForDisplayed({ timeout: 5000 });

    const text = await lastCert.getText();
    expect(text).toContain("2024");
    expect(text).toContain("Test");
    expect(text).toContain("Brightest Academy");
  });

  it("Add certificate with curated dropdowns", async () => {

    await CvEditPage.open();
    await CvEditPage.clickAddCertificate();

    await CertificatePage.addCertificateWithDropdowns(
      "ISTQB Foundation", 
      "Wolters Test",    
      "2024"              
    );

    const lastCert = await $("(//div[@class='clearfix']/li)[last()]");
    await lastCert.scrollIntoView();
    await lastCert.waitForDisplayed({ timeout: 5000 });

    const text = await lastCert.getText();
    console.log("Toegevoegd certificaat:", text);

    expect(text).toContain("2024");
    expect(text).toContain("ISTQB Foundation");
    expect(text).toContain("Wolters Test");
  });
});

