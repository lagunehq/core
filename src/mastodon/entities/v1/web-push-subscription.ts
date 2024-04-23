/**
 * Represents a subscription to the push streaming server.
 * @see https://docs.joinmastodon.org/entities/WebPushSubscription/
 */
export interface WebPushSubscription {
  /** The id of the push subscription in the database. */
  id: string;
  /** Where push alerts will be sent to. */
  endpoint: string;
  /** The streaming server's VAPID key. */
  serverKey: string;
  /** Which alerts should be delivered to the `endpoint`. */
  alerts: WebPushSubscription.Alerts;
  /* Which type of notification should be included  */
  policy: WebPushSubscription.Policy;
}

export namespace WebPushSubscription {
  export interface Alerts {
    /** Receive a push notification when someone has followed you? Boolean. */
    follow: boolean;
    /** Receive a push notification when a status you created has been favourited by someone else? Boolean. */
    favourite: boolean;
    /** Receive a push notification when someone else has mentioned you in a status? Boolean. */
    reblog: boolean;
    /** Receive a push notification when a status you created has been boosted by someone else? Boolean. */
    mention: boolean;
    /** Receive a push notification when a poll you voted in or created has ended? Boolean. */
    poll: boolean;
    /** Receive new subscribed account notifications? Defaults to false. */
    status: boolean;
    /** Receive status edited notifications? Defaults to false. */
    update: boolean;
    admin: {
      /** Receive new user signup notifications? Defaults to false. Must have a role with the appropriate permissions. */
      signUp: boolean;
      /** Receive new report notifications? Defaults to false. Must have a role with the appropriate permissions. */
      report: boolean;
    };
  }

  export type Policy = "all" | "followed" | "follower" | "none";
}

/** @deprecated Use WebPushSubscription */
export type WebPushSubscriptionAlerts = WebPushSubscription.Alerts;

/** @deprecated Use WebPushSubscription.Policy */
export type WebPushSubscriptionPolicy = WebPushSubscription.Policy;
