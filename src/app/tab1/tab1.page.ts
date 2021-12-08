import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { MarkerComponent } from './marker/marker.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page {
  markers = JSON.parse(localStorage.getItem('markers') || '[]');
  @ViewChild('map') mapView: ElementRef;
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

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
            "type": "normal"
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
        this.markers.forEach(m => {
          CapacitorGoogleMaps.addMarker({
            latitude: m.latitude,
            longitude: m.longitude,
          });
        });
        CapacitorGoogleMaps.addListener('didTap', async result => {
          alert(result);
          CapacitorGoogleMaps.hide();
          const modal = this.modalController.create({
            component: MarkerComponent,
            /* swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl */
          });

          (await modal).present();
        });
        this.showCurrentPosition();
      }, 500);
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
    }).then(result => {
      this.markers.push({
        name: "this is my photo",
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
      localStorage.setItem('markers', JSON.stringify(this.markers));
    });

  }

}
