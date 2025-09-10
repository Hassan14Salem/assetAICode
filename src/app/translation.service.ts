import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: any = {};
  private currentLang: 'en' | 'ar' = 'en';

  async load(lang: 'en' | 'ar') {
    this.currentLang = lang;
    const response = await fetch(`assets/i18n/${lang}.json`);
    this.translations = await response.json();
  }

  t(key: string): string {
    return this.translations[key] || key;
  }

  get lang() {
    return this.currentLang;
  }
}
