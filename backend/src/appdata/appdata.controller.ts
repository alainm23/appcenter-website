import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppdataService } from './appdata.service';

@Controller('apps')
export class AppdataController {
  constructor(private readonly appdataService: AppdataService) {}

  @Get()
  getApps() {
    return this.appdataService.getApps();
  }

  @Get('banner')
  getAppsBanner() {
    return this.appdataService.getAppsBanner();
  }

  @Get('recently-updated')
  getRecentlyUpdated() {
    return this.appdataService.getRecentlyUpdated();
  }

  @Get('app/:id')
  findOne(@Param('id') id: string) {
    return this.appdataService.findOne(id);
  }

  @Get('developer/:name')
  getAppsByDeveloper(@Param('name') name: string) {
    return this.appdataService.getAppsByDeveloper(name);
  }

  @Get('search')
  searchAppsByName(@Query('query') query: string) {
    return this.appdataService.searchByName(query);
  }

  @Get('category/:key')
  filterAppsByCategory(@Param('key') key: string) {
    return this.appdataService.filterAppsByCategory(key);
  }
}
