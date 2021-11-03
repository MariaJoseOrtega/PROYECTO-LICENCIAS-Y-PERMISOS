import {Injectable} from '@angular/core';
import themes from '../../../assets/themes/themes.json';
import {MenuItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  constructor() {
  }

  changeTheme(theme: string) {
    const themePath = themes.find(element => element.name == theme)?.path;
    console.log(themePath);
    const element = document.getElementById('theme-css');
    if (element && themePath) {
      element.setAttribute('href', themePath);
    }
  }

  get alpha(): RegExp {
    return /^[a-zA-Z ]/;
  }
}
