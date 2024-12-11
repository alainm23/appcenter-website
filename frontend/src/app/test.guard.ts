import { CanActivateFn } from '@angular/router';

export const testGuard: CanActivateFn = (route, state) => {
  return true;
};
