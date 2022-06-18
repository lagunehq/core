import { headerCase } from 'change-case';

import { MastoConfig } from '../config';
import { createError, CreateErrorParams } from '../errors';
import { MimeType, Serializer } from '../serializers';
import { BaseHttp } from './base-http';
import { Headers, Http, Request, Response } from './http';

export class HttpNativeImpl extends BaseHttp implements Http {
  constructor(readonly config: MastoConfig, readonly serializer: Serializer) {
    super();
  }

  async request<T>(request: Request): Promise<Response<T>> {
    const { timeout, proxy } = this.config;
    const { method, data } = request;

    if (proxy != null) {
      // eslint-disable-next-line no-console
      console.warn('Proxies are not supported on HttpNativeImpl');
    }

    if (timeout != null) {
      // eslint-disable-next-line no-console
      console.warn('Timeouts are not supported on HttpNativeImpl');
    }

    const url = this.resolveUrl(request.url, request.params);
    const headers = new Headers(
      this.createHeader(request.headers) as unknown as Record<string, string>,
    );
    const contentType = headers.get('Content-Type') ?? 'application/json';
    const body = this.serializer.serialize(contentType as MimeType, data);
    if (
      body instanceof FormData &&
      contentType == 'multipart/form-data' &&
      HttpNativeImpl.hasBlob(body)
    ) {
      // As multipart form data should contain an arbitrary boundary,
      // leave Content-Type header undefined, so that fetch() API
      // automatically configure Content-Type with an appropriate boundary.
      headers.delete('Content-Type');
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body as string,
      });
      const text = await response.text();

      return {
        headers: HttpNativeImpl.toHeaders(response.headers),
        data: this.serializer.deserialize(
          this.getContentType(response.headers) ?? 'application/json',
          text,
        ),
      };
    } catch (e) {
      if (!(e instanceof Response)) {
        throw e;
      }

      const data = await e.json();

      throw createError({
        statusCode: e.status,
        message: data?.error,
        details: data?.errorDescription,
        description: data?.details,
        limit: e.headers.get('X-RateLimit-Limit'),
        remaining: e.headers.get('X-RateLimit-Remaining'),
        reset: e.headers.get('X-RateLimit-Reset'),
      } as CreateErrorParams);
    }
  }

  private static toHeaders(headers: globalThis.Headers): Headers {
    const result: Record<string, unknown> = {};
    headers.forEach((value, key) => {
      result[headerCase(key)] = value;
    });
    return result;
  }

  private static hasBlob(formData: FormData): boolean {
    let hasBlob = false;
    formData.forEach((v: string | Blob) => (hasBlob ||= v instanceof Blob));
    return hasBlob;
  }
}
