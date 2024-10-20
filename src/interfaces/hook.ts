import { type AnyAction } from "./action";

export type BeforeFn<Ctx extends unknown[], Result> = (...args: Ctx) => Result;

export type AfterFn<Ctx extends unknown[], Result> = (...args: Ctx) => Result;

export interface BaseHook<
  T,
  BCtx extends unknown[],
  BRes,
  ACtx extends unknown[],
  ARes,
> {
  type: T;
  before: BeforeFn<BCtx, BRes>;
  after: AfterFn<ACtx, ARes>;
}

export type AnyHook = BaseHook<string, [unknown], unknown, [unknown], unknown>;

export type HttpHook = BaseHook<
  "Http",
  [Request],
  Promise<Request>,
  [Response],
  Promise<Response>
>;

export type ActionDispatcherHook = BaseHook<
  "ActionDispatcher",
  [AnyAction],
  AnyAction,
  [unknown, AnyAction],
  unknown
>;

export type Hook = HttpHook | ActionDispatcherHook;

function combineHttpHooks(hooks: HttpHook[]): HttpHook {
  return {
    type: "Http",
    before: async (request: Request) => {
      for (const hook of hooks) {
        request = await hook.before(request);
      }
      return request;
    },
    after: async (response: Response) => {
      for (const hook of hooks) {
        response = await hook.after(response);
      }
      return response;
    },
  };
}

function combineActionDispatcherHook(
  hooks: ActionDispatcherHook[],
): ActionDispatcherHook {
  return {
    type: "ActionDispatcher",
    before: (action: AnyAction) => {
      for (const hook of hooks) {
        action = hook.before(action);
      }
      return action;
    },
    after: (result: unknown, action: AnyAction) => {
      for (const hook of hooks) {
        result = hook.after(result, action);
      }
      return result;
    },
  };
}

export function combine<T extends Hook>(hooks: T[]): T {
  if (hooks.length === 0) {
    throw new Error("No hooks provided");
  }

  const firstHook = hooks[0];
  if (firstHook.type === "Http") {
    return combineHttpHooks(hooks as HttpHook[]) as T;
  } else if (firstHook.type === "ActionDispatcher") {
    return combineActionDispatcherHook(hooks as ActionDispatcherHook[]) as T;
  } else {
    throw new Error("Unknown hook type");
  }
}
