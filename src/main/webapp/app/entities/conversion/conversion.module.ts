import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeMeSharedModule } from 'app/shared/shared.module';
import { ConversionComponent } from './conversion.component';
import { ConversionDetailComponent } from './conversion-detail.component';
import { ConversionUpdateComponent } from './conversion-update.component';
import { ConversionDeleteDialogComponent } from './conversion-delete-dialog.component';
import { conversionRoute } from './conversion.route';

@NgModule({
  imports: [RecipeMeSharedModule, RouterModule.forChild(conversionRoute)],
  declarations: [ConversionComponent, ConversionDetailComponent, ConversionUpdateComponent, ConversionDeleteDialogComponent],
  entryComponents: [ConversionDeleteDialogComponent]
})
export class RecipeMeConversionModule {}
