import { Component, OnInit } from '@angular/core';

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
  }
}
