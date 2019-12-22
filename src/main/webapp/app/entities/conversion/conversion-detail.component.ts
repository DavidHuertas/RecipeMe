import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConversion } from 'app/shared/model/conversion.model';

@Component({
  selector: 'jhi-conversion-detail',
  templateUrl: './conversion-detail.component.html'
})
export class ConversionDetailComponent implements OnInit {
  conversion: IConversion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conversion }) => {
      this.conversion = conversion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
