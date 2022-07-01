// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import SerpApi from 'google-search-results-nodejs';
const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);

export type ShowTimesArgs = {
  cinema: string
  location: string
  countryCode?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShowTimes.Result>
) {
  return new Promise(resolve => {
    const params = {
      q: req.query.cinema?.toString(),
      location: req.query.location?.toString(),
      hl: req.query.countryCode?.toString() || "en",
      gl: req.query.countryCode?.toString() || "gb",
    };

    search.json(params, (data: any) => {
      res.status(200).json(data)
      resolve(data)
    });
  })
}

export namespace ShowTimes {
  export interface Result {
    search_metadata: SearchMetadata;
    search_parameters: SearchParameters;
    search_information: SearchInformation;
    showtimes: Showtime[];
    knowledge_graph: KnowledgeGraph;
    inline_images: InlineImage[];
    related_questions: RelatedQuestion[];
    answer_box: AnswerBox;
    organic_results: OrganicResult[];
    related_searches: RelatedSearch[];
    pagination: Pagination;
    serpapi_pagination: Pagination;
  }

  export interface AnswerBox {
    type: string;
  }

  export interface InlineImage {
    link: string;
    source: string;
    thumbnail: string;
  }

  export interface KnowledgeGraph {
    title: string;
    type: string;
    place_id: string;
    website: string;
    description: string;
    local_map: LocalMap;
    see_photos_link: string;
    see_outside_link: string;
    rating: number;
    review_count: number;
    located_in: string;
    address: string;
    address_links: Link[];
    phone: string;
    phone_links: Link[];
    popular_times: PopularTimes;
    merchant_description: string;
    user_reviews: UserReview[];
    reviews_from_the_web: ReviewsFromTheWeb[];
    nearby_restaurants: NearbyRestaurant[];
    nearby_restaurants_link: string;
    nearby_restaurants_stick: string;
    people_also_search_for: NearbyRestaurant[];
    people_also_search_for_link: string;
    people_also_search_for_stick: string;
  }

  export interface Link {
    text: string;
    link: string;
  }

  export interface LocalMap {
    image: string;
    link: string;
    gps_coordinates: GpsCoordinates;
  }

  export interface GpsCoordinates {
    latitude: number;
    longitude: number;
    altitude: number;
  }

  export interface NearbyRestaurant {
    name: string;
    extensions: string[];
    place_id: string;
    link: string;
    image: string;
  }

  export interface PopularTimes {
    live: Live;
    graph_results: GraphResults;
  }

  export interface GraphResults {
    monday: Day[];
    tuesday: Day[];
    wednesday: Day[];
    thursday: Day[];
    friday: Day[];
    saturday: Day[];
    sunday: Day[];
  }

  export interface Day {
    time: string;
    busyness_score: number;
    info?: Info;
  }

  export enum Info {
    UsuallyALittleBusy = "Usually a little busy",
    UsuallyAsBusyAsItGets = "Usually as busy as it gets",
    UsuallyNotBusy = "Usually not busy",
    UsuallyNotTooBusy = "Usually not too busy",
  }

  export interface Live {
    busyness_score: number;
  }

  export interface ReviewsFromTheWeb {
    company: string;
    link: string;
    rating: number;
    review_count: number;
  }

  export interface UserReview {
    summary: string;
    link: string;
    user: User;
  }

  export interface User {
    name: string;
    link: string;
    thumbnail: string;
  }

  export interface OrganicResult {
    position: number;
    title: string;
    link: string;
    displayed_link: string;
    thumbnail?: string;
    snippet?: string;
    snippet_highlighted_words?: string[];
    about_this_result: AboutThisResult;
    about_page_link: string;
    cached_page_link?: string;
    date?: string;
    rich_snippet?: RichSnippet;
    duration?: string;
  }

  export interface AboutThisResult {
    source: Source;
  }

  export interface Source {
    description: string;
    icon?: string;
  }

  export interface RichSnippet {
    top: Top;
  }

  export interface Top {
    detected_extensions: DetectedExtensions;
    extensions: string[];
  }

  export interface DetectedExtensions {
    rating: number;
    reviews?: number;
    votes?: number;
  }

  export interface Pagination {
    current: number;
    next: string;
    other_pages: { [key: string]: string };
    next_link?: string;
  }

  export interface RelatedQuestion {
    question: string;
    snippet?: string;
    title: string;
    link: string;
    displayed_link: string;
    next_page_token: string;
    serpapi_link: string;
    list?: string[];
  }

  export interface RelatedSearch {
    query: string;
    link: string;
  }

  export interface SearchInformation {
    organic_results_state: string;
    query_displayed: string;
    total_results: number;
    time_taken_displayed: number;
  }

  export interface SearchMetadata {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_url: string;
    raw_html_file: string;
    total_time_taken: number;
  }

  export interface SearchParameters {
    engine: string;
    q: string;
    location_requested: string;
    location_used: string;
    google_domain: string;
    hl: string;
    gl: string;
    device: string;
  }

  export interface Showtime {
    day: string;
    movies: Movie[];
    date?: string;
  }

  export interface Movie {
    name: string;
    link: string;
    showing: Showing[];
  }

  export interface Showing {
    time: string[];
    type: Type;
  }

  export enum Type {
    Standard = "Standard",
    The3D = "3D",
  }
}