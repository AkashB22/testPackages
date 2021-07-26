const fs = require('fs');
// const sampleYaml = fs.readFileSync(__dirname + '/sample.yml', 'utf8');
const sampleJson = require('./sample.json');
const { webdriver, Builder, By, Key, until, WebElement } = require('selenium-webdriver'),
  assert = require('assert');
let driver = null;

describe('Swagger testing', function () {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('Update swagger yml and get the results', async function () {
    await driver.get('file:///D:/softwares/swagger-editor-master/swagger-editor-master/index.html');
    let file = await driver.findElement(By.css('.topbar-wrapper .dd-menu'));
    await file.click();
    let clear = await driver.findElement(By.css('.topbar-wrapper .dd-menu .dd-menu-items .dd-items-left li:last-child'));
    await driver.wait(until.elementLocated(By.css('.topbar-wrapper .dd-menu .dd-menu-items .dd-items-left li:last-child')),10000)
    await clear.click()
    let editor = await driver.findElement(By.css('.ace_content'));
    await driver.wait(until.elementLocated(By.css('.ace_content')),10000)
    await editor.click();
    let textarea = await driver.findElement(By.css('.ace_text-input'));
    // let yamlLines = sampleYaml.split("\r\n");
    const strJson = JSON.stringify(sampleJson)
    for(let line of strJson){
      await textarea.sendKeys(line);
      // await textarea.sendKeys(Key.ENTER);
    }
    console.log("added large yaml file to text area");
  }
  )
  after(async function () {
    await driver.quit()
  });
});