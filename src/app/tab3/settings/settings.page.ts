import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: [ './settings.page.scss' ],
})
export class SettingsPage implements OnInit {
  dakrMode = document.body.getAttribute('color-theme') === 'dark';
  constructor() {
  }

  ngOnInit() { }

  toggleDarkTheme(shouldAdd): void {
    document.body.setAttribute('color-theme', shouldAdd ? 'dark' : 'white');
    StatusBar.setStyle({ style: shouldAdd ? Style.Dark : Style.Light });
  }
}
