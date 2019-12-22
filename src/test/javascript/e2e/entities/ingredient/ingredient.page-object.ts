import { element, by, ElementFinder } from 'protractor';

export class IngredientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ingredient div table .btn-danger'));
  title = element.all(by.css('jhi-ingredient div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class IngredientUpdatePage {
  pageTitle = element(by.id('jhi-ingredient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  amountInput = element(by.id('field_amount'));
  unitSelect = element(by.id('field_unit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getAttribute('value');
  }

  async setUnitSelect(unit: string): Promise<void> {
    await this.unitSelect.sendKeys(unit);
  }

  async getUnitSelect(): Promise<string> {
    return await this.unitSelect.element(by.css('option:checked')).getText();
  }

  async unitSelectLastOption(): Promise<void> {
    await this.unitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class IngredientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ingredient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ingredient'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
