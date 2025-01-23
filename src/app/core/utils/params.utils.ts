import {HttpParams} from "@angular/common/http";

export const toHttpParams = (filter: Record<string, any>): HttpParams => {
  const params = {} as Record<string, any>;

  Object.assign(params, filter);

  Object.keys(params).forEach(key => {
    if (params[key] == null) {
      delete params[key];
    }
  })

  return new HttpParams({ fromObject: params });
}
