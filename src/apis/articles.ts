import { http } from "@/utils";
import type { ResType } from "@/apis/shared";
// define the response type

// 1. define channels types
export type ChannelItem = {
  id: number;
  name: string;
};
type ChannelsType = {
  channels: ChannelItem[];
};

// 2. define article lists types
type ArticleItem = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number; // 1 is top, 0 is not top
  cover: {
    type: number;
    images: string[];
  };
};

type queryParams = {
  channel_id: string;
  timestamp: string;
};

export type ArticlesType = {
  results: ArticleItem[];
  pre_timestamp: string;
};

// define article apis
export const articles = {
  // 1. fetch channels
  fetchChannels() {
    return http.request<ResType<ChannelsType>>({
      url: "/channels",
      method: "GET",
    });
  },

  // 2. fetch articles
  fetchArticles(params: queryParams) {
    return http.request<ResType<ArticlesType>>({
      url: "/articles",
      method: "GET",
      params,
    });
  },
};
