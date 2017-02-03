import {Component, Input} from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { SpecimenDetailPage } from './specimen-detail.component'

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
     Bug Box 
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="dismiss()"><ion-icon name="close"></ion-icon><span class="btn-text">Cancel</span></button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-grid>
    <ion-row>
      <ion-col width-25>
        <ion-icon name="bug" (click)="specimenDetail()"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>

      <ion-col width-25>
        <ion-icon name="bug"></ion-icon>
        <h2> ??? </h2>
      </ion-col>
    </ion-row>

    <!--<ion-item>
      <ion-avatar item-left>
        <img src="{{monster.icon}}">
      </ion-avatar>
      <h2>{{monster.name}}</h2>
      <p>{{monster.difficulty}}</p>
    </ion-item>-->
  </ion-grid>
</ion-content>
`
})

export class ModalBugBox {
  monsters: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {

    let monsters = [
      {
        id: 1,
        name: 'Chironomid',
        icon: 'http://phylopic.org/assets/images/submissions/834f9ef5-c5bf-4e9e-94c8-3ecb8fb14838.64.png',
        difficulty: 1,
        lat: 41.654085,
        lng: -91.525087
      },
      {
        id: 2,
        name: 'Hymenoptera',
        icon: 'http://phylopic.org/assets/images/submissions/e3fde32c-34c2-4f67-8577-e546909f83e8.64.png',
        difficulty: 3,
        lat: 41.654145,
        lng: -91.522978
      },
      {
        id: 3,
        name: 'Coleoptera',
        icon: 'http://phylopic.org/assets/images/submissions/becb252d-fd39-4124-97c8-208aa5d448db.64.png',
        difficulty: 2,
        lat: 41.654100,
        lng: -91.523265
      }
    ];

    this.monsters = monsters;
  }

  specimenDetail() {
    console.log('show specimen detail template');
    this.navCtrl.push(SpecimenDetailPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
