import { type HttpHook } from "../../interfaces/hook";

export class HttpHookMastodon implements HttpHook {
  readonly type = "Http";

  async before(request: Request): Promise<Request> {
    if (
      request.method === "PUT" &&
      request.url.endsWith("/api/v1/accounts/update_credentials")
    ) {
      return new Request(request, { method: "PATCH" });
    }
    return request;
  }

  async after(response: Response): Promise<Response> {
    return response;
  }
}
