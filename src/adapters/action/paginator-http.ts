/* eslint-disable unicorn/no-thenable */
import { type Http, type HttpMetaParams } from "../../interfaces";
import { type mastodon } from "../../mastodon";
import { parseLinkHeader } from "../../utils";

export class PaginatorHttp<Entity, Params = undefined>
  implements mastodon.Paginator<Entity, Params>
{
  constructor(
    private readonly http: Http,
    private path?: string,
    private params?: Params | string,
    private readonly meta?: HttpMetaParams,
    private readonly direction: mastodon.Direction = "next",
  ) {}

  async *values(): AsyncIterableIterator<Entity> {
    let path = this.path;
    let params = this.params;

    while (path != undefined) {
      const response = await this.http.request({
        method: "GET",
        path,
        search: params as Record<string, unknown>,
        ...this.meta,
      });

      const nextUrl = this.getLink(response.headers.get("link"));
      path = nextUrl?.pathname;
      params = nextUrl?.search.replace(/^\?/, "");

      const data = (await response.data) as Entity;

      yield data;
    }
  }

  then<TResult1 = Entity, TResult2 = never>(
    onfulfilled: (
      value: Entity,
    ) => TResult1 | PromiseLike<TResult1> = Promise.resolve.bind(Promise),
    onrejected: (
      reason: unknown,
    ) => TResult2 | PromiseLike<TResult2> = Promise.reject.bind(Promise),
  ): Promise<TResult1 | TResult2> {
    return this.values()
      .next()
      .then((value) => onfulfilled(value.value), onrejected);
  }

  getDirection(): mastodon.Direction {
    return this.direction;
  }

  setDirection(direction: mastodon.Direction): PaginatorHttp<Entity, Params> {
    return new PaginatorHttp(
      this.http,
      this.path,
      this.params,
      this.meta,
      direction,
    );
  }

  [Symbol.asyncIterator](): AsyncIterator<
    Entity,
    undefined,
    Params | string | undefined
  > {
    return this.values();
  }

  private getLink(value?: string | null): URL | undefined {
    if (value == undefined) {
      return;
    }

    const parsed = parseLinkHeader(value).get(this.direction);
    if (parsed == undefined) {
      return;
    }

    return new URL(parsed);
  }
}
