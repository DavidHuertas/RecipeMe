import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IConversion } from 'app/shared/model/conversion.model';

type EntityResponseType = HttpResponse<IConversion>;
type EntityArrayResponseType = HttpResponse<IConversion[]>;

@Injectable({ providedIn: 'root' })
export class ConversionService {
  public resourceUrl = SERVER_API_URL + 'api/conversions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/conversions';

  constructor(protected http: HttpClient) {}

  create(conversion: IConversion): Observable<EntityResponseType> {
    return this.http.post<IConversion>(this.resourceUrl, conversion, { observe: 'response' });
  }

  update(conversion: IConversion): Observable<EntityResponseType> {
    return this.http.put<IConversion>(this.resourceUrl, conversion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConversion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConversion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConversion[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
