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

  ionViewDidEnter() {
    if (window.sessionStorage.getItem('mapCreated') === '1') {
      CapacitorGoogleMaps.show();
      CapacitorGoogleMaps.enableCurrentLocation({ enabled: true });
      CapacitorGoogleMaps.settings({
        allowScrollGesturesDuringRotateOrZoom: true,
        compassButton: true,
        consumesGesturesInView: true,
        indoorPicker: true,
        myLocationButton: true,
        rotateGestures: true,
        scrollGestures: true,
        tiltGestures: true,
        zoomGestures: true,
      });
    } else {
      setTimeout(() => {
        const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
        CapacitorGoogleMaps.create({
          width: Math.round(boundingRect.width),
          height: Math.round(boundingRect.height),
          x: Math.round(boundingRect.x),
          y: Math.round(boundingRect.y),
          latitude: -33.87,
          longitude: 151.21,
          zoom: 17
        }).then(map => {
          window.sessionStorage.setItem('mapCreated', '1');
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
          CapacitorGoogleMaps.enableCurrentLocation({ enabled: true });
          CapacitorGoogleMaps.settings({
            allowScrollGesturesDuringRotateOrZoom: true,
            compassButton: true,
            consumesGesturesInView: true,
            indoorPicker: true,
            myLocationButton: true,
            rotateGestures: true,
            scrollGestures: true,
            tiltGestures: true,
            zoomGestures: true,
          });
        });
      }, 100);
    }
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.hide();
  }
}
