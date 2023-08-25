import { Config as GeneratedTypes } from 'payload/generated-types';
import { InitOptions } from './config/types';
import { initHTTP } from './initHTTP';
import { Payload as LocalPayload, BasePayload } from './payload';
import type { RequestContext } from './express/types';

export { DatabaseAdapter } from './database/types';

export { getPayload } from './payload';

require('isomorphic-fetch');

export class Payload extends BasePayload<GeneratedTypes> {
  async init(options: InitOptions): Promise<LocalPayload> {
    const payload = await initHTTP(options);
    Object.assign(this, payload);

    if (!options.local) {
      if (typeof options.onInit === 'function') await options.onInit(this);
      if (typeof this.config.onInit === 'function') await this.config.onInit(this);
    }

    return payload;
  }
}

const payload = new Payload();

export default payload;
module.exports = payload;
// Export RequestContext type
export type { RequestContext };

export { buildVersionCollectionFields } from './versions/buildCollectionFields'
export { buildVersionGlobalFields } from './versions/buildGlobalFields'