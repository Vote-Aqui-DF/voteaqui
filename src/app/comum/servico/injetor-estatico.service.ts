import { Injector } from '@angular/core';

export class InjetorEstaticoService {

  private static _injector: Injector;

  static set injector(injector: Injector) {
    InjetorEstaticoService._injector = injector;
  }

  static get injector(): Injector {
    return InjetorEstaticoService._injector;
  }

}
