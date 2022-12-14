import type { MastoConfig } from '../../config';
import { version } from '../../decorators';
import type { Http } from '../../http';
import { Paginator } from '../../paginator';
import type { Ws } from '../../ws';
import type { DefaultPaginationParams } from '../repository';
import type { Search } from './entities';
import {
  AccountRepository,
  AnnouncementRepository,
  AppRepository,
  BlockRepository,
  BookmarkRepository,
  ConversationRepository,
  CustomEmojiRepository,
  DirectoryRepository,
  DomainBlockRepository,
  EmailRepository,
  EndorsementRepository,
  FavouriteRepository,
  FeaturedTagRepository,
  FilterRepository,
  FollowedTagRepository,
  FollowRequestRepository,
  InstanceRepository,
  ListRepository,
  MarkerRepository,
  MediaAttachmentRepository,
  MuteRepository,
  NotificationsRepository,
  PollRepository,
  PreferenceRepository,
  PushSubscriptionsRepository,
  ReportRepository,
  ScheduledStatusesRepository,
  StatusRepository,
  StreamRepository,
  SuggestionRepository,
  TagRepository,
  TimelinesRepository,
  TrendRepository,
} from './repositories';
import { MastoAdminClient } from './repository-admin';

export type SearchType = 'accounts' | 'hashtags' | 'statuses';

export interface SearchParams extends DefaultPaginationParams {
  /** Attempt WebFinger lookup. Defaults to false. */
  readonly q: string;
  /** Enum(accounts, hashtags, statuses) */
  readonly type?: SearchType | null;
  /** Attempt WebFinger look-up */
  readonly resolve?: boolean | null;
  /** If provided, statuses returned will be authored only by this account */
  readonly accountId?: string | null;
}

export class Repository {
  readonly admin: MastoAdminClient;
  readonly stream: StreamRepository;
  readonly accounts: AccountRepository;
  readonly announcements: AnnouncementRepository;
  readonly apps: AppRepository;
  readonly blocks: BlockRepository;
  readonly bookmarks: BookmarkRepository;
  readonly conversations: ConversationRepository;
  readonly customEmojis: CustomEmojiRepository;
  readonly directory: DirectoryRepository;
  readonly domainBlocks: DomainBlockRepository;
  readonly endorsements: EndorsementRepository;
  readonly favourites: FavouriteRepository;
  readonly featuredTags: FeaturedTagRepository;
  readonly filters: FilterRepository;
  readonly followRequests: FollowRequestRepository;
  readonly instances: InstanceRepository;
  readonly lists: ListRepository;
  readonly markers: MarkerRepository;
  readonly mediaAttachments: MediaAttachmentRepository;
  readonly mutes: MuteRepository;
  readonly notifications: NotificationsRepository;
  readonly poll: PollRepository;
  readonly preferences: PreferenceRepository;
  readonly pushSubscriptions: PushSubscriptionsRepository;
  readonly reports: ReportRepository;
  readonly scheduledStatuses: ScheduledStatusesRepository;
  readonly statuses: StatusRepository;
  readonly suggestions: SuggestionRepository;
  readonly timelines: TimelinesRepository;
  readonly trends: TrendRepository;
  readonly email: EmailRepository;
  readonly tags: TagRepository;
  readonly followedTags: FollowedTagRepository;

  constructor(
    private readonly http: Http,
    private readonly ws: Ws,
    readonly config: MastoConfig,
  ) {
    this.admin = new MastoAdminClient(this.http, this.config);
    this.stream = new StreamRepository(this.ws, this.config);
    this.accounts = new AccountRepository(this.http, this.config);
    this.announcements = new AnnouncementRepository(this.http, this.config);
    this.apps = new AppRepository(this.http, this.config);
    this.blocks = new BlockRepository(this.http, this.config);
    this.bookmarks = new BookmarkRepository(this.http, this.config);
    this.conversations = new ConversationRepository(this.http, this.config);
    this.customEmojis = new CustomEmojiRepository(this.http, this.config);
    this.directory = new DirectoryRepository(this.http, this.config);
    this.domainBlocks = new DomainBlockRepository(this.http, this.config);
    this.endorsements = new EndorsementRepository(this.http, this.config);
    this.favourites = new FavouriteRepository(this.http, this.config);
    this.featuredTags = new FeaturedTagRepository(this.http, this.config);
    this.filters = new FilterRepository(this.http, this.config);
    this.followRequests = new FollowRequestRepository(this.http, this.config);
    this.instances = new InstanceRepository(this.http, this.config);
    this.lists = new ListRepository(this.http, this.config);
    this.markers = new MarkerRepository(this.http, this.config);
    this.mediaAttachments = new MediaAttachmentRepository(
      this.http,
      this.config,
    );
    this.mutes = new MuteRepository(this.http, this.config);
    this.notifications = new NotificationsRepository(this.http, this.config);
    this.poll = new PollRepository(this.http, this.config);
    this.preferences = new PreferenceRepository(this.http, this.config);
    this.pushSubscriptions = new PushSubscriptionsRepository(
      this.http,
      this.config,
    );
    this.reports = new ReportRepository(this.http, this.config);
    this.scheduledStatuses = new ScheduledStatusesRepository(
      this.http,
      this.config,
    );
    this.statuses = new StatusRepository(this.http, this.config);
    this.suggestions = new SuggestionRepository(this.http, this.config);
    this.timelines = new TimelinesRepository(this.http, this.config);
    this.trends = new TrendRepository(this.http, this.config);
    this.email = new EmailRepository(this.http, this.config);
    this.tags = new TagRepository(this.http, this.config);
    this.followedTags = new FollowedTagRepository(this.http, this.config);
  }

  /**
   * Search, but hashtags is an array of strings instead of an array of Tag.
   * @param params Parameters
   * @return Results
   * @see https://docs.joinmastodon.org/methods/search/
   */
  @version({ since: '1.1.0', until: '3.0.0' })
  search(params: SearchParams): Paginator<SearchParams, Search> {
    return new Paginator(this.http, `/api/v1/search`, params);
  }
}
