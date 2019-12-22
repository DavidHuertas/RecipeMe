import { element, by, ElementFinder } from 'protractor';

export class ConversionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-conversion div table .btn-danger'));
  title = element.all(by.css('jhi-conversion div h2#page-heading span')).first();

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

export class ConversionUpdatePage {
  pageTitle = element(by.id('jhi-conversion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  originUnitSelect = element(by.id('field_originUnit'));
  convertedUnitSelect = element(by.id('field_convertedUnit'));
  converterInput = element(by.id('field_converter'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOriginUnitSelect(originUnit: string): Promise<void> {
    await this.originUnitSelect.sendKeys(originUnit);
  }

  async getOriginUnitSelect(): Promise<string> {
    return await this.originUnitSelect.element(by.css('option:checked')).getText();
  }

  async originUnitSelectLastOption(): Promise<void> {
    await this.originUnitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setConvertedUnitSelect(convertedUnit: string): Promise<void> {
    await this.convertedUnitSelect.sendKeys(convertedUnit);
  }

  async getConvertedUnitSelect(): Promise<string> {
    return await this.convertedUnitSelect.element(by.css('option:checked')).getText();
  }

  async convertedUnitSelectLastOption(): Promise<void> {
    await this.convertedUnitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setConverterInput(converter: string): Promise<void> {
    await this.converterInput.sendKeys(converter);
  }

  async getConverterInput(): Promise<string> {
    return await this.converterInput.getAttribute('value');
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

export class ConversionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-conversion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-conversion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
