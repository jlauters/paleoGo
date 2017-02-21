import { Component, Input,  ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, ModalController, Platform, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { MonsterService } from './monsters.service';
import { ModalContentPage } from './modal-detail.component';
import { ModalBugBox } from './modal-bugbox.component';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MonsterService]
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  monsters: any;

  constructor( public modalCtrl: ModalController,
               public loadingCtrl: LoadingController,
               public navCtrl: NavController,
               private monsterService: MonsterService,
               menu: MenuController) { 
    menu.enable(true);
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  openModal(monsterId) {
   
    if('bug_box' == monsterId) {
      let modal = this.modalCtrl.create(ModalBugBox); 
      modal.present();
    } else {
      //let modal = this.modalCtrl.create(ModalContentPage, {monsterId: monsterId});
      //modal.present();
      this.navCtrl.push(ModalContentPage, { monsterId: monsterId});
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading Map ...",
      duration: 3000
    });

    loader.present();
  }

  loadMap() {
  
    // loading msg
    this.presentLoading();
    this.monsters = this.monsterService.getMonsters();

    Geolocation.getCurrentPosition().then((position) => {

      //let latLng = new google.maps.LatLng(38.9136173, -105.2875963); // Florissant 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // Me!

      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // Add my marker
      let me = new google.maps.Marker({
        map: this.map,
        position: latLng
      });   

      for(let mon = 0; mon < this.monsters.length;  mon++) {

        if(!this.monsters[mon].found) {

          let mon_latLng = new google.maps.LatLng(this.monsters[mon].lat, this.monsters[mon].lng);

          let monster_marker = new google.maps.Marker({
            map: this.map,
            position: mon_latLng,
            monster_idx: mon,
            icon: this.monsters[mon].icon
          });

          let content = "<div>" + this.monsters[mon].name + " (Lvl: " + this.monsters[mon].difficulty + ") </div>";
          this.addInfoWindow(monster_marker, content);

          let self = this;
          monster_marker.addListener('click', function() {
            self.catchMonster(monster_marker.monster_idx);  
          })
        }

      }

    }, (err) => {
      console.log(err);
    });

  }

  updateMap() {
 
    console.log('updateMap... ');
 
    // loading msg
    this.presentLoading();
    this.monsters = this.monsterService.getMonsters();

    Geolocation.getCurrentPosition().then((position) => {

      //let latLng = new google.maps.LatLng(38.9136173, -105.2875963); // Florissant 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // Me!

      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // Add my marker
      let me = new google.maps.Marker({
        map: this.map,
        position: latLng
      });   

      for(let mon = 0; mon < this.monsters.length;  mon++) {

        if(!this.monsters[mon].found) {

          let mon_latLng = new google.maps.LatLng(this.monsters[mon].lat, this.monsters[mon].lng);

          let monster_marker = new google.maps.Marker({
            map: this.map,
            position: mon_latLng,
            monster_idx: mon,
            icon: this.monsters[mon].icon
          });

          let content = "<div>" + this.monsters[mon].name + " (Lvl: " + this.monsters[mon].difficulty + ") </div>";
          this.addInfoWindow(monster_marker, content);

          let self = this;
          monster_marker.addListener('click', function() {
            self.catchMonster(monster_marker.monster_idx);  
          })
        }

      }

    }, (err) => {
      console.log(err);
    });

  }

  catchMonster(monster_idx) {
    this.openModal(monster_idx); 
  }

  bugBox() {
    this.openModal('bug_box');
  }

  addInfoWindow(marker, content) {
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
