import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConversion, Conversion } from 'app/shared/model/conversion.model';
import { ConversionService } from './conversion.service';
import { ConversionComponent } from './conversion.component';
import { ConversionDetailComponent } from './conversion-detail.component';
import { ConversionUpdateComponent } from './conversion-update.component';

@Injectable({ providedIn: 'root' })
export class ConversionResolve implements Resolve<IConversion> {
  constructor(private service: ConversionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConversion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((conversion: HttpResponse<Conversion>) => {
          if (conversion.body) {
            return of(conversion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Conversion());
  }
}

export const conversionRoute: Routes = [
  {
    path: '',
    component: ConversionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'recipeMeApp.conversion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConversionDetailComponent,
    resolve: {
      conversion: ConversionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'recipeMeApp.conversion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConversionUpdateComponent,
    resolve: {
      conversion: ConversionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'recipeMeApp.conversion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConversionUpdateComponent,
    resolve: {
      conversion: ConversionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'recipeMeApp.conversion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
