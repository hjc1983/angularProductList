import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, AuthModule, OidcConfigService } from 'angular-auth-oidc-client';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer, appEffects } from './store';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProtectedComponent } from './protected/protected.component';
import { AppRoutingModule } from './app-routing.module';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: "https://rcid.azurewebsites.net",
      redirectUrl: 'http://localhost:5003/callback.html',//window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: "js",
      scope: 'openid profile email api1',
      responseType: 'code',
      //ilentRenew: true,
      useRefreshToken: true,
    });
}

@NgModule({
  declarations: [AppComponent,UnauthorizedComponent, ProtectedComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // RouterModule.forRoot([{ path: '', redirectTo: '/', pathMatch: 'full' }]),
    ProductModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
