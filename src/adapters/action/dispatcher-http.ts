import {
  type ActionDispatcher,
  type ActionDispatcherHook,
  type AnyAction,
  type Http,
} from "../../interfaces";
import { PaginatorHttp } from "./paginator-http";

export class HttpActionDispatcher implements ActionDispatcher<AnyAction> {
  constructor(
    private readonly http: Http,
    private readonly hook?: ActionDispatcherHook,
  ) {}

  dispatch<T>(action: AnyAction): T | Promise<T> {
    if (this.hook) {
      action = this.hook.before(action);
    }

    let result!: T | Promise<T>;

    switch (action.type) {
      case "fetch": {
        result = this.http.get(action.path, action.data, action.meta);
        break;
      }
      case "create": {
        result = this.http.post(action.path, action.data, action.meta);
        break;
      }
      case "update": {
        result = this.http.put(action.path, action.data, action.meta);
        break;
      }
      case "remove": {
        result = this.http.delete(action.path, action.data, action.meta);
        break;
      }
      case "list": {
        result = new PaginatorHttp(this.http, action.path, action.data) as T;
        break;
      }
    }

    if (this.hook) {
      /* eslint-disable unicorn/prefer-ternary, prettier/prettier */
      if (result instanceof Promise) {
        return result.then((result) => this.hook?.after(result, action)) as Promise<T>;
      } else {
        return this.hook?.after(result, action) as T;
      }
    }

    return result;
  }
}
