import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page {
  @ViewChild('map') mapView: ElementRef;
  constructor() { }

  async ionViewDidEnter() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: -33.87,
      longitude: 151.21,
      zoom: 17
    });

    CapacitorGoogleMaps.addListener("onMapReady", async function () {
      CapacitorGoogleMaps.addMarker({
        latitude: -33.87,
        longitude: 151.21,
        title: "Custom Title",
        snippet: "Custom Snippet",
      });

      CapacitorGoogleMaps.setMapType({
        "type": "satellite"
      });
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
