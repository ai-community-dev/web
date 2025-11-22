export interface Tag {
  id: number;
  name: string;
  tag_category_maps_count: number;
}

export interface BannerImage {
  id: number;
  url: string;
  i32?: string;
  i64?: string;
  i96?: string;
  i160?: string;
  i320?: string;
}

export interface Organizer {
  id: number;
  name: string;
  image_url: string;
  url?: string;
}

export interface Community {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string | null;
  members_count: number;
  url: string;
  logo_url: string;
  completed_events_count: number;
  has_upcoming_events?: boolean;
  tags?: Tag[];
  banner_image?: BannerImage | null;
  organizers?: Organizer[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  timezone: string;
  event_type: string;
  event_status: string;
  location?: {
    name: string;
    address?: string;
  } | null;
  header_image?: {
    url: string;
    i320?: string;
    i640?: string;
  } | null;
  community?: {
    id: number;
    name: string;
    slug: string;
    logo_url?: string;
  };
  tags?: {
    id: number;
    name: string;
  }[];
  slug: string;
  url: string;
  attendees_count?: number;
}

export interface PageInfo {
  has_previous_page: boolean;
  has_next_page: boolean;
  start_cursor: string;
  end_cursor: string;
}

export interface PaginatedEvents {
  data: Event[];
  page_info: PageInfo;
}

export interface EventsResponse {
  past: PaginatedEvents;
  future: Event[];
  lastUpdated: string;
}
