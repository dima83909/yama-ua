import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

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

    } else {
      setTimeout(() => {
        const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
        CapacitorGoogleMaps.create({
          width: Math.round(boundingRect.width),
          height: Math.round(boundingRect.height),
          x: Math.round(boundingRect.x),
          y: Math.round(boundingRect.y),
          latitude: 48.3794,
          longitude: 31.1656,
          zoom: 7
        }).then(map => {
          window.sessionStorage.setItem('mapCreated', '1');

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

        this.showCurrentPosition();
      }, 100);
    }
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.hide();
  }

  showCurrentPosition(): void {
    Geolocation.requestPermissions().then(async permissions => {
      const data = await Geolocation.getCurrentPosition();
      CapacitorGoogleMaps.setCamera({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        zoom: 19,
        animate: true
      });
    });
  }

  async addPhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100
    });
    
    const data = await Geolocation.getCurrentPosition();
    CapacitorGoogleMaps.addMarker({
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
    })
    console.log(capturedPhoto);
  }

}
