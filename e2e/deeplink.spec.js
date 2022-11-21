const testConfig = require('./testConfig.json');
const deepLinkArray = testConfig.deeplinks;




describe('Deep link Testing with Logged in user + Terminating the app', () => {
  //loading new app
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: 'always',
      },
    });
  });

  it('should log in user for deeplink testing', async () => {
    await expect(element(by.id('email'))).toBeVisible();
    await element(by.id('email')).replaceText(testConfig.email);
    await element(by.id('password')).replaceText(testConfig.password);
    await element(by.id('privacy_policy')).tap();
    await element(by.id('eula')).tap();
    await element(by.id('login')).tap();
    await element(by.id('got_location')).tap();
    await element(by.id('select_location_item')).atIndex(0).tap();
    await element(by.id('bottom_sheet_done')).tap();
    await device.terminateApp('com.theentertainerme.cle.ent');
  });

  const fnTest = (deepLinkName) => {
    it(
      'should handle url successfully :: url = ' +
        testConfig.schema +
        deepLinkName,
      async () => {
        await device.openURL({
          url: testConfig.schema + deepLinkName,
          sourceApp: 'com.apple.mobilesafari',
        });
        switch(deepLinkName){
          case 'Opencategory?category=FoodAndDrink':
              await element(by.id('select_outlet_item')).atIndex(1).tap()
              await element(by.id('select_merchant_offer_item')).atIndex(0).tap()
              try{
                expect(element(by.id('continue_modal'))).toBeVisible()
                await element(by.id('select_continue')).tap()
              }catch(error){
  
              }
              await expect(element(by.id('merchant_pin_code'))).toBeVisible();
              await element(by.id('merchant_pin_code')).replaceText('9999')
            break
          case 'appSearch':
              await expect(element(by.id('search_input'))).toBeVisible()
              await element(by.id('search_input')).replaceText('ab')
              await element(by.id('search_input')).tapReturnKey()
            break
        }
      }
    );
  };

  for (let deepLink in deepLinkArray) {
    let deepLinkName = deepLinkArray[deepLink].name;
    fnTest(deepLinkName);
  }
});

describe('Deep link Testing with Logged in user', () => {
  //loading new app
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        location: 'always',
      },
    });
  });

  it('should log in user for deeplink testing', async () => {
    await expect(element(by.id('email'))).toBeVisible();
    await element(by.id('email')).replaceText(testConfig.email);
    await element(by.id('password')).replaceText(testConfig.password);
    await element(by.id('privacy_policy')).tap();
    await element(by.id('eula')).tap();
    await element(by.id('login')).tap();
    await element(by.id('got_location')).tap();
    await element(by.id('select_location_item')).atIndex(0).tap();
    await element(by.id('bottom_sheet_done')).tap();
    await device.sendToHome();
  });

  const fnTest = (deepLinkName) => {
    it(
      'should handle url successfully :: url = ' +
        testConfig.schema +
        deepLinkName,
      async () => {
        await device.launchApp({
          url: testConfig.schema + deepLinkName,
          sourceApp: 'com.apple.mobilesafari',
        });
      }
    );
  };

  for (let deepLink in deepLinkArray) {
    let deepLinkName = deepLinkArray[deepLink].name;
    fnTest(deepLinkName);
  }
});
