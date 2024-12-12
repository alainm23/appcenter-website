import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
} from '@angular/core';
import { TranslateValuePipe } from '../../../core/pipes/translate-value.pipe';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesktopApp } from '../../../core/interfaces/desktop-app.interface';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [CommonModule, TranslateValuePipe],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerCarouselComponent {
  private _router: Router = inject(Router);

  @Input() apps: DesktopApp[] = [];

  viewApp(app: DesktopApp) {
    this._router.navigate(['apps/' + app.id]);
  }

  getPrimaryColor(data: DesktopApp, isDarkTheme = false) {
    const schemePreference = isDarkTheme ? "dark" : "light";
  
    if (data.branding) {
      const themeColor = data.branding.find(
        (item) => item.type === "primary" && item.scheme_preference === schemePreference
      );
      if (themeColor) {
        return themeColor.value;
      }
  
      const generalColor = data.branding.find((item) => item.type === "primary");
      if (generalColor) {
        return generalColor.value;
      }
    }
  
    if (data.metadata) {
      const metaColor = data.metadata.find(
        (item) => item.type === "x-appcenter-color-primary"
      );
      if (metaColor) {
        return metaColor.value;
      }
    }
  
    return "#8cd5ff";
  }

  getBackgroundImage(app: DesktopApp): string {
    const primaryColor = this.getPrimaryColor(app);

    const shade = (color: string, factor: number): string => {
      let [r, g, b] = this.hexToRgb(color);
      r = Math.min(255, Math.max(0, Math.round(r * factor)));
      g = Math.min(255, Math.max(0, Math.round(g * factor)));
      b = Math.min(255, Math.max(0, Math.round(b * factor)));
      return this.rgbToHex(r, g, b);
    };

    const lighterShade = shade(primaryColor, 1.05);
    const darkerShade = shade(primaryColor, 0.95);

    return `linear-gradient(to bottom right, ${lighterShade}, ${darkerShade})`;
  }

  private hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  private rgbToHex(r: number, g: number, b: number): string {
    const toHex = (x: number) => x.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  getForegroundColor(app: DesktopApp): string {
    const primaryColor = this.getPrimaryColor(app);
    const [r, g, b] = this.hexToRgb(primaryColor);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.5 ? '#ffffff' : '#000000';
  }
}
