import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
  
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

      for(let mon = 0; mon < monsters.length;  mon++) {

        let mon_latLng = new google.maps.LatLng(monsters[mon].lat, monsters[mon].lng);

        let monster_marker = new google.maps.Marker({
          map: this.map,
          position: mon_latLng,
          monster_idx: mon,
          icon: monsters[mon].icon
        });

        let content = "<div>" + monsters[mon].name + " (Lvl: " + monsters[mon].difficulty + ") </div>";
        this.addInfoWindow(monster_marker, content);

        monster_marker.addListener('click', function() {
          this.catchMonster(monster_marker.monster_idx);  
        })

      }

    }, (err) => {
      console.log(err);
    });

  }

  catchMonster(monster_idx) {
    let monster = monsters[monster_idx];

    
  }

  addMarker() {
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.Drop,
      position: this.map.getCenter()
    });

    let content = "<h4>PaleoMon</h4>";

    this.addInfoWindow(marker, content);
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
