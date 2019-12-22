import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecipeComponentsPage, RecipeDeleteDialog, RecipeUpdatePage } from './recipe.page-object';

const expect = chai.expect;

describe('Recipe e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeComponentsPage: RecipeComponentsPage;
  let recipeUpdatePage: RecipeUpdatePage;
  let recipeDeleteDialog: RecipeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Recipes', async () => {
    await navBarPage.goToEntity('recipe');
    recipeComponentsPage = new RecipeComponentsPage();
    await browser.wait(ec.visibilityOf(recipeComponentsPage.title), 5000);
    expect(await recipeComponentsPage.getTitle()).to.eq('recipeMeApp.recipe.home.title');
  });

  it('should load create Recipe page', async () => {
    await recipeComponentsPage.clickOnCreateButton();
    recipeUpdatePage = new RecipeUpdatePage();
    expect(await recipeUpdatePage.getPageTitle()).to.eq('recipeMeApp.recipe.home.createOrEditLabel');
    await recipeUpdatePage.cancel();
  });

  it('should create and save Recipes', async () => {
    const nbButtonsBeforeCreate = await recipeComponentsPage.countDeleteButtons();

    await recipeComponentsPage.clickOnCreateButton();
    await promise.all([
      recipeUpdatePage.setNameInput('name'),
      recipeUpdatePage.setDescriptionInput('description'),
      recipeUpdatePage.userSelectLastOption()
    ]);
    expect(await recipeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await recipeUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    await recipeUpdatePage.save();
    expect(await recipeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Recipe', async () => {
    const nbButtonsBeforeDelete = await recipeComponentsPage.countDeleteButtons();
    await recipeComponentsPage.clickOnLastDeleteButton();

    recipeDeleteDialog = new RecipeDeleteDialog();
    expect(await recipeDeleteDialog.getDialogTitle()).to.eq('recipeMeApp.recipe.delete.question');
    await recipeDeleteDialog.clickOnConfirmButton();

    expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
