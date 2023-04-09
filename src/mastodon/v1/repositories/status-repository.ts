import type { MastoConfig } from '../../../config';
import type { Http } from '../../../http';
import type { Logger } from '../../../logger';
import { Paginator } from '../../../paginator';
import type { Repository } from '../../repository';
import type {
  Account,
  Context,
  PreviewCard,
  ScheduledStatus,
  Status,
  StatusEdit,
  StatusSource,
  StatusVisibility,
  Translation,
} from '../entities';

export interface CreateStatusParamsBase {
  /** ID of the status being replied to, if status is a reply */
  readonly inReplyToId?: string | null;
  /** Mark status and attached media as sensitive? */
  readonly sensitive?: boolean | null;
  /** Text to be shown as a warning or subject before the actual content. Statuses are generally collapsed behind this field. */
  readonly spoilerText?: string | null;
  /** Visibility of the posted status. Enumerable oneOf public, unlisted, private, direct. */
  readonly visibility?: StatusVisibility | null;
  /** ISO 639 language code for this status. */
  readonly language?: string | null;
}

export interface CreateStatusExtraParams {
  readonly idempotencyKey?: string | null;
}

export interface CreateStatusPollParam {
  /** Array of possible answers. If provided, `media_ids` cannot be used, and `poll[expires_in]` must be provided. */
  readonly options: string[];
  /** Duration the poll should be open, in seconds. If provided, media_ids cannot be used, and poll[options] must be provided. */
  readonly expiresIn: number;
  /** Allow multiple choices? */
  readonly multiple?: boolean | null;
  /** Hide vote counts until the poll ends? */
  readonly hideTotals?: boolean | null;
}

export interface CreateStatusParamsWithStatus extends CreateStatusParamsBase {
  /** Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided. */
  readonly status: string;
  /** Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used. */
  readonly mediaIds?: never;
  readonly poll?: CreateStatusPollParam | null;
}

export interface CreateStatusParamsWithMediaIds extends CreateStatusParamsBase {
  /** Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used. */
  readonly mediaIds: readonly string[];
  /** Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided. */
  readonly status?: string | null;
  readonly poll?: never;
}

export type CreateStatusParams =
  | CreateStatusParamsWithStatus
  | CreateStatusParamsWithMediaIds;

export type CreateScheduledStatusParams = CreateStatusParams & {
  /** ISO 8601 Date-time at which to schedule a status. Providing this parameter will cause ScheduledStatus to be returned instead of Status. Must be at least 5 minutes in the future. */
  readonly scheduledAt?: string | null;
};

type UpdateStatusMediaAttribute = {
  /** The ID of the media attachment to be modified */
  readonly id: string;
  /** A plain-text description of the media, for accessibility purposes. */
  readonly description?: string | null;
  /** Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0 */
  readonly focus?: string | null;
  /** Custom thumbnail */
  readonly thumbnail?: unknown | null;
};

export type UpdateStatusParams = CreateStatusParams & {
  /** https://github.com/mastodon/mastodon/pull/20878 */
  readonly mediaAttributes?: readonly UpdateStatusMediaAttribute[];
};

export interface ReblogStatusParams {
  /** any visibility except limited or direct (i.e. public, unlisted, private). Defaults to public. Currently unused in UI. */
  readonly visibility: StatusVisibility;
}

export interface TranslateStatusParams {
  /** String (ISO 639 language code). The status content will be translated into this language. Defaults to the user’s current locale. */
  readonly lang?: string;
}

export class StatusRepository implements Repository<Status> {
  constructor(
    private readonly http: Http,
    readonly config: MastoConfig,
    readonly logger?: Logger,
  ) {}

  /**
   * View information about a status.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  fetch(id: string): Promise<Status> {
    return this.http.get(`/api/v1/statuses/${id}`);
  }

  /**
   * Post a new status.
   * @param params Parameters
   * @param idempotencyKey Prevent duplicate submissions of the same status. Idempotency keys are stored for up to 1 hour, and can be any arbitrary string. Consider using a hash or UUID generated client-side.
   * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
   * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
   */
  create(
    params: CreateStatusParams,
    extra?: CreateStatusExtraParams,
  ): Promise<Status>;
  create(
    params: CreateScheduledStatusParams,
    extra?: CreateStatusExtraParams,
  ): Promise<ScheduledStatus>;
  create(
    params: CreateStatusParams | CreateScheduledStatusParams,
    extra: CreateStatusExtraParams = {},
  ): Promise<Status | ScheduledStatus> {
    if (extra.idempotencyKey) {
      return this.http.post('/api/v1/statuses', params, {
        headers: { 'Idempotency-Key': extra.idempotencyKey },
      });
    }

    return this.http.post('/api/v1/statuses', params);
  }

  /**
   * Update a status
   * @param params Parameters
   * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
   * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
   */
  update(id: string, params: UpdateStatusParams): Promise<Status> {
    return this.http.put(`/api/v1/statuses/${id}`, params);
  }

  /**
   * Delete one of your own statuses.
   * @param id Local ID of a status in the database. Must be owned by authenticated account.
   * @return Status with source text and `media_attachments` or `poll`
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  remove(id: string): Promise<Status> {
    return this.http.delete(`/api/v1/statuses/${id}`);
  }

  /**
   * View statuses above and below this status in the thread.
   * @param id Local ID of a status in the database.
   * @return Context
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  fetchContext(id: string): Promise<Context> {
    return this.http.get(`/api/v1/statuses/${id}/context`);
  }

  /**
   * Preview card
   *    * @param id ID of the status in the database
   * @return Card
   * @see https://docs.joinmastodon.org/api/rest/statuses/#get-api-v1-statuses-id-card
   */
  /* istanbul ignore next */
  fetchCard(id: string): Promise<PreviewCard> {
    return this.http.get(`/api/v1/statuses/${id}/card`);
  }

  /**
   * Add a status to your favourites list.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  favourite(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/favourite`);
  }

  /**
   * Remove a status from your favourites list.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  unfavourite(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/unfavourite`);
  }

  /**
   * Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  mute(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/mute`);
  }

  /**
   * Start receiving notifications again for the thread that this status is part of.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  unmute(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/unmute`);
  }

  /**
   * View who boosted a given status.
   * @param id Local ID of a status in the database.
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  listRebloggedBy(id: string): Paginator<Account[]> {
    return new Paginator(this.http, `/api/v1/statuses/${id}/reblogged_by`);
  }

  /**
   * View who favourited a given status.
   * @param id Local ID of a status in the database.
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  listFavouritedBy(id: string): Paginator<Account[]> {
    return new Paginator(this.http, `/api/v1/statuses/${id}/favourited_by`);
  }

  /**
   * Re-share a status.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses-id-reblog
   */
  reblog(id: string, params?: ReblogStatusParams): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/reblog`, params);
  }

  /**
   * Undo a re-share of a status.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  unreblog(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/unreblog`);
  }

  /**
   * Feature one of your own public statuses at the top of your profile.
   * @param id Local ID of a status in the database. The status should be public and authored by the authorized account.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  pin(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/pin`);
  }

  /**
   * Un-feature a status from the top of your profile.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  unpin(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/unpin`);
  }

  /**
   * Privately bookmark a status.
   * @param id ID of the status in the database
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  bookmark(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/bookmark`);
  }

  /**
   * Remove a status from your private bookmarks.
   * @param id ID of the status in the database
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  unbookmark(id: string): Promise<Status> {
    return this.http.post(`/api/v1/statuses/${id}/unbookmark`);
  }

  /**
   * Get all known versions of a status, including the initial and current states.
   * @param id The local id of the status in the database
   * @returns StatusEdit
   * @see https://docs.joinmastodon.org/methods/statuses/#history
   */
  listHistory(id: string): Paginator<StatusEdit[]> {
    return new Paginator(this.http, `/api/v1/statuses/${id}/history`);
  }

  /**
   * Obtain the source properties for a status so that it can be edited.
   * @param id The local ID of the Status in the database
   * @returns StatusSource
   * @see https://docs.joinmastodon.org/methods/statuses/#source
   */
  fetchSource(id: string): Promise<StatusSource> {
    return this.http.get(`/api/v1/statuses/${id}/source`);
  }

  /**
   * Translate the status content into some language.
   * @param id String. The ID of the Status in the database.
   * @param params Form data parameters
   * @returns Translation
   */
  translate(id: string, params: TranslateStatusParams): Promise<Translation> {
    return this.http.post(`/api/v1/statuses/${id}/translate`, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
