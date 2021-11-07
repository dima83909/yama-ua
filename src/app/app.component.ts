import { Component } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent {
  constructor() {
    CapacitorGoogleMaps.initialize({
      key: "AIzaSyBR09NRhpJNg_1Axz--BQGof9QnaFmnJy8"
    });
  }
  ngOnInit() {
    if (localStorage.getItem('darkMode') === 'dark') {
      document.body.setAttribute('color-theme', 'dark');
      StatusBar.setStyle({ style: Style.Dark });
    }
  }
}
