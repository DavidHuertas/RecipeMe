import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConversionComponentsPage, ConversionDeleteDialog, ConversionUpdatePage } from './conversion.page-object';

const expect = chai.expect;

describe('Conversion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let conversionComponentsPage: ConversionComponentsPage;
  let conversionUpdatePage: ConversionUpdatePage;
  let conversionDeleteDialog: ConversionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Conversions', async () => {
    await navBarPage.goToEntity('conversion');
    conversionComponentsPage = new ConversionComponentsPage();
    await browser.wait(ec.visibilityOf(conversionComponentsPage.title), 5000);
    expect(await conversionComponentsPage.getTitle()).to.eq('recipeMeApp.conversion.home.title');
  });

  it('should load create Conversion page', async () => {
    await conversionComponentsPage.clickOnCreateButton();
    conversionUpdatePage = new ConversionUpdatePage();
    expect(await conversionUpdatePage.getPageTitle()).to.eq('recipeMeApp.conversion.home.createOrEditLabel');
    await conversionUpdatePage.cancel();
  });

  it('should create and save Conversions', async () => {
    const nbButtonsBeforeCreate = await conversionComponentsPage.countDeleteButtons();

    await conversionComponentsPage.clickOnCreateButton();
    await promise.all([
      conversionUpdatePage.originUnitSelectLastOption(),
      conversionUpdatePage.convertedUnitSelectLastOption(),
      conversionUpdatePage.setConverterInput('5')
    ]);
    expect(await conversionUpdatePage.getConverterInput()).to.eq('5', 'Expected converter value to be equals to 5');
    await conversionUpdatePage.save();
    expect(await conversionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await conversionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Conversion', async () => {
    const nbButtonsBeforeDelete = await conversionComponentsPage.countDeleteButtons();
    await conversionComponentsPage.clickOnLastDeleteButton();

    conversionDeleteDialog = new ConversionDeleteDialog();
    expect(await conversionDeleteDialog.getDialogTitle()).to.eq('recipeMeApp.conversion.delete.question');
    await conversionDeleteDialog.clickOnConfirmButton();

    expect(await conversionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
