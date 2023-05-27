import { SerializerNativeImpl } from '../serializers';
import { HttpConfigImpl } from './http-config';

describe('Config', () => {
  it('creates header', () => {
    const config = new HttpConfigImpl(
      {
        url: 'https://mastodon.social',
        accessToken: 'token',
      },
      new SerializerNativeImpl(),
    );
    const headers = config.mergeHeadersWithDefaults({ extra: 'header' });

    expect(headers.get('Authorization')).toBe('Bearer token');
    expect(headers.get('extra')).toBe('header');
  });

  it('overrides content-type header', () => {
    const config = new HttpConfigImpl(
      {
        url: 'https://mastodon.social',
        accessToken: 'token',
      },
      new SerializerNativeImpl(),
    );

    const headers = config.mergeHeadersWithDefaults({
      'Content-Type': 'multipart/form-data',
    });

    expect(headers.get('Authorization')).toBe('Bearer token');
    expect(headers.get('Content-Type')).toBe('multipart/form-data');
  });

  it('resolves HTTP path', () => {
    const config = new HttpConfigImpl(
      {
        url: 'https://mastodon.social',
        accessToken: 'token',
      },
      new SerializerNativeImpl(),
    );

    const url = config.resolvePath('/api/v1/yay').toString();
    expect(url).toEqual('https://mastodon.social/api/v1/yay');
  });

  it('resolves HTTP path with query', () => {
    const config = new HttpConfigImpl(
      {
        url: 'https://mastodon.social',
        accessToken: 'token',
      },
      new SerializerNativeImpl(),
    );

    const url = config
      .resolvePath('/api/v1/yay', { query: 'true', list: ['1', '2', '3'] })
      .toString();
    expect(url).toEqual(
      'https://mastodon.social/api/v1/yay?query=true&list[]=1&list[]=2&list[]=3',
    );
  });

  it('preserves query parameters in the URL when no query parameters specified', () => {
    const config = new HttpConfigImpl(
      {
        url: 'https://mastodon.social',
        accessToken: 'token',
      },
      new SerializerNativeImpl(),
    );

    const url = config.resolvePath('/path/to/somewhere?foo=bar').toString();
    expect(url).toEqual('https://mastodon.social/path/to/somewhere?foo=bar');
  });

  it('revokes query parameters in the URL when query parameters specified', () => {
    const config = new HttpConfigImpl(
      {
        url: 'https://mastodon.social',
        accessToken: 'token',
      },
      new SerializerNativeImpl(),
    );

    const url = config
      .resolvePath('/path/to/somewhere?foo=bar', { foo2: 'bar2' })
      .toString();
    expect(url).toEqual('https://mastodon.social/path/to/somewhere?foo2=bar2');
  });
});
