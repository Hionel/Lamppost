import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderHandlerService {
  private _isLoading$ = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this._isLoading$.pipe(
    switchMap((isLoading) => {
      if (!isLoading) {
        return of(false);
      }
      return of(true);
    })
  );

  loading() {
    this._isLoading$.next(true);
  }
  finish() {
    this._isLoading$.next(false);
  }
}
