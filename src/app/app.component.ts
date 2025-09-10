import { Component, OnInit } from '@angular/core';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isArabic = false;
  darkMode = false;

  constructor(public translation: TranslationService) {}

  async ngOnInit() {
    await this.translation.load('en');
    document.body.dir = 'ltr';
  }

  async toggleLanguage() {
    this.isArabic = !this.isArabic;
    const lang = this.isArabic ? 'ar' : 'en';
    await this.translation.load(lang);
    document.body.dir = this.isArabic ? 'rtl' : 'ltr';
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  t(key: string) {
    return this.translation.t(key);
  }
}
