import { Component, OnInit } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss().then(result => {
    });
    CapacitorGoogleMaps.show();
  }
}
