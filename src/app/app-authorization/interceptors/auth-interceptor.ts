import { HttpInterceptorFn } from "@angular/common/http";
import { LocalStorageKeys } from "../constants";


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith('https://chat-app-file-storage')) {
    return next(req);
  }
  const idToken = localStorage.getItem(LocalStorageKeys.token);

  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    });

    return next(cloned)
  } else {
    return next(req)
  }
};