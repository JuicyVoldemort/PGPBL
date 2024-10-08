import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap(loginState => {
        if (loginState.isLoggedIn) {
          return of(true);
        }
        this.router.navigateByUrl('login');
        return of(false);
      })
    )
  }
}

//Penambahan Authguard dilakukan untuk mencegah pengguna yang tidak memiliki 
//otorisasi untuk mengakses halaman/pages dari url. Dibutuhkan login
//Kode berdasarkan video tutorial nomor playlist 20