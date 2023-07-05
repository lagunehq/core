import { camelCase, snakeCase } from 'change-case';

import { type Encoding, type Serializer } from '../../interfaces';
import { MastoDeserializeError } from '../errors';
import { flattenObject } from './form-data';
import { railsQueryString } from './rails-query-string';
import { transformKeys } from './transform-keys';

export class SerializerNativeImpl implements Serializer {
  serialize(type: 'json', rawData: unknown): string;
  serialize(type: 'querystring', rawData: unknown): string;
  serialize(type: Encoding, rawData: unknown): BodyInit | undefined {
    if (rawData == undefined) {
      return;
    }

    const data = transformKeys(rawData, snakeCase);

    switch (type) {
      case 'json': {
        return JSON.stringify(data);
      }
      case 'multipart-form': {
        const formData = new FormData();
        for (const [key, value] of Object.entries(flattenObject(data))) {
          formData.append(key, value);
        }
        return formData;
      }
      case 'form-url-encoded':
      case 'querystring': {
        return railsQueryString.stringify(data);
      }
      default: {
        return;
      }
    }
  }

  deserialize<T = Record<string, unknown>>(type: Encoding, data: string): T {
    switch (type) {
      case 'json': {
        try {
          return transformKeys(JSON.parse(data), camelCase);
        } catch {
          return undefined as unknown as T;
        }
      }
      default: {
        throw new MastoDeserializeError(
          `Unknown content type ${type} returned from the server.`,
          type,
          data,
        );
      }
    }
  }
}