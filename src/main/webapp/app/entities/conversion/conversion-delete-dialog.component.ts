import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConversion } from 'app/shared/model/conversion.model';
import { ConversionService } from './conversion.service';

@Component({
  templateUrl: './conversion-delete-dialog.component.html'
})
export class ConversionDeleteDialogComponent {
  conversion?: IConversion;

  constructor(
    protected conversionService: ConversionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conversionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('conversionListModification');
      this.activeModal.close();
    });
  }
}
