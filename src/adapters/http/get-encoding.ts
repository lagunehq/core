import { type Headers } from '@mastojs/ponyfills';

import { type Encoding } from '../../interfaces';

export const getEncoding = (headers: Headers): Encoding | undefined => {
  const contentType = headers.get('Content-Type')?.replace(/\s*;.*$/, '');
  if (typeof contentType !== 'string') {
    return;
  }

  switch (contentType) {
    case 'application/json': {
      return 'json';
    }
    case 'application/x-www-form-urlencoded': {
      return 'form-url-encoded';
    }
    case 'multipart/form-data': {
      return 'multipart-form';
    }
    default: {
      return;
    }
  }
};
