import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalContentPage } from '../pages/home/modal-detail.component';
import { ModalBugBox } from '../pages/home/modal-bugbox.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalContentPage,
    ModalBugBox
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalContentPage,
    ModalBugBox
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
