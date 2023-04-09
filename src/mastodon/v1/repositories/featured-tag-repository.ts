import type { MastoConfig } from '../../../config';
import type { Http } from '../../../http';
import type { Logger } from '../../../logger';
import { Paginator } from '../../../paginator';
import type { Repository } from '../../repository';
import type { FeaturedTag, Tag } from '../entities';

export interface CreateFeaturedTagParams {
  /** The hashtag to be featured. */
  readonly name: string;
}

export class FeaturedTagRepository implements Repository<FeaturedTag> {
  constructor(
    private readonly http: Http,
    readonly config: MastoConfig,
    readonly logger?: Logger,
  ) {}

  /**
   * View your featured tags
   * @return Array of FeaturedTag
   * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
   * @done
   */
  list(): Paginator<FeaturedTag[]> {
    return new Paginator(this.http, '/api/v1/featured_tags');
  }

  /**
   * Feature a tag
   * @param params Parameters
   * @return FeaturedTag
   * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
   */
  create(params: CreateFeaturedTagParams): Promise<FeaturedTag> {
    return this.http.post<FeaturedTag>('/api/v1/featured_tags', params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  /**
   * Shows your 10 most-used tags, with usage history for the past week.
   * @return Array of Tag with History
   * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
   */
  listSuggestions(): Paginator<Tag[]> {
    return new Paginator(this.http, '/api/v1/featured_tags/suggestions');
  }

  /**
   * Un-feature a tag
   * @param id The id of the FeaturedTag to be un-featured
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
   */
  remove(id: string): Promise<void> {
    return this.http.delete<void>(`/api/v1/featured_tags/${id}`);
  }
}
