import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as pako from 'pako';
import axios from 'axios';
import { xml2json } from 'xml-js';
import {
  getTranslateValue,
  extractDescription,
  getArrayValue,
  extractUrls,
  extractScreenshots,
  extractReleases,
  extractMetaData,
  extractBranding,
  extractDeveloper,
  DEFAULT_LANG,
  extractKeywords,
} from './appdata.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { categoriesMap } from './appdata.categories';

@Injectable()
export class AppdataService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getApps() {
    const cacheKey = 'appstream-data';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData as string);
    }

    const response = await axios.get(
      'https://flatpak.elementary.io/repo/appstream/x86_64/appstream.xml.gz',
      {
        responseType: 'arraybuffer',
      },
    );

    const decompressedData = pako.inflate(new Uint8Array(response.data), {
      to: 'string',
    });
    const rawJson = xml2json(decompressedData, { compact: true, spaces: 2 });
    const parsedJson = JSON.parse(rawJson);
    const apps = this.sortApps(this.parseApps(parsedJson));
    // const apps = this.parseApps(parsedJson);

    await this.cacheManager.set(cacheKey, JSON.stringify(apps));

    return apps;
  }

  async getAppsBanner() {
    const apps: any[] = await this.getApps();
    return apps.slice(0, Math.min(apps.length, 5));
  }

  async getRecentlyUpdated() {
    const apps: any[] = await this.getApps();
    return apps.slice(5, Math.min(apps.length, 17));
  }

  async findOne(id: string) {
    const apps: any[] = await this.getApps();
    const app = apps.find((app) => app.id === id);

    if (!app) {
      throw new HttpException('App not found', HttpStatus.NOT_FOUND);
    }

    return app;
  }

  async getAppsByDeveloper(name: string) {
    const apps: any[] = await this.getApps();
    return apps.filter((app) => app.developer[DEFAULT_LANG] === name);
  }

  async searchByName(query: string) {
    const apps: any[] = await this.getApps();

    return apps.filter((app) => {
      const nameMatch = Object.values(app.name).some((value: string) =>
        value.toLowerCase().includes(query.toLowerCase()),
      );

      const keywordsMatch = app.keywords.some((keyword: string) =>
        keyword.toLowerCase().includes(query.toLowerCase()),
      );

      return nameMatch || keywordsMatch;
    });
  }

  async filterAppsByCategory(key: string) {
    const apps: any[] = await this.getApps();
    const validCategories = categoriesMap[key] || [];
    return apps.filter((app) =>
      app.categories.some((category) => validCategories.includes(category)),
    );
  }

  parseApps(json: any) {
    const map = new Map();

    json.components.component.forEach((element: Record<string, any>) => {
      if (!map.has(element.id._text)) {
        map.set(element.id._text, {
          id: element.id._text,
          name: getTranslateValue(element, 'name'),
          description: extractDescription(element),
          categories: getArrayValue(element?.categories?.category),
          keywords: extractKeywords(element?.keywords),
          developer: extractDeveloper(element),
          url: extractUrls(element?.url),
          summary: getTranslateValue(element, 'summary'),
          screenshots: extractScreenshots(element?.screenshots?.screenshot),
          releases: extractReleases(element?.releases?.release),
          metadata: extractMetaData(element?.metadata?.value),
          branding: extractBranding(element),
          origin: element,
        });
      }
    });

    return Array.from(map.values());
  }

  sortApps(apps: any) {
    return apps.sort((a: any, b: any) => {
      const maxDateA = Math.max(
        ...a.releases.map((release: any) => release.timestamp),
      );
      const maxDateB = Math.max(
        ...b.releases.map((release: any) => release.timestamp),
      );

      return maxDateB - maxDateA;
    });
  }
}
