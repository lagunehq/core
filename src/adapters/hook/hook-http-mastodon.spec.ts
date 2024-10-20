import assert from "node:assert";

import { HttpHookMastodon } from "./hook-http-mastodon";

describe("hookHttpMastodon", () => {
  it("returns a new Request with method PATCH if the request is PUT and the URL ends with /api/v1/accounts/update_credentials", async () => {
    const request = new Request(
      "https://example.com/api/v1/accounts/update_credentials",
      { method: "PUT" },
    );
    const hook = new HttpHookMastodon();
    const result = await hook.before(request);
    assert(result instanceof Request);
    expect(result).toBeInstanceOf(Request);
    expect(result.method).toBe("PATCH");
  });
});
