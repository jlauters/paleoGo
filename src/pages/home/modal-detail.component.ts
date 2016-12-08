import {Component, Input} from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Catch: {{monster.name}}
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item>
      <ion-avatar item-left>
        <img src="{{monster.icon}}">
      </ion-avatar>
      <h2>{{monster.name}}</h2>
      <p>{{monster.difficulty}}</p>
    </ion-item>
  </ion-list>
</ion-content>
`
})

export class ModalContentPage {
  monster: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
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

    this.monster = monsters[this.params.get('monsterId')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
