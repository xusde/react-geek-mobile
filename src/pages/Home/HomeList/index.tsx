import { useState, useEffect } from "react";
import { Image, InfiniteScroll, List } from "antd-mobile";
import { articles, type ArticlesType } from "@/apis/articles";

type Props = {
  channel_id: string;
};

const HomeList = (props: Props) => {
  // destruct channel_id from props
  const { channel_id } = props;
  const [articleList, setArticleList] = useState<ArticlesType>({
    results: [],
    pre_timestamp: "" + new Date().getTime(), // why setting this to empty won't work?
  });

  // side effect: initial loading
  useEffect(() => {
    const getArticles = async () => {
      const res = await articles.fetchArticles({
        channel_id: channel_id,
        timestamp: "" + new Date().getTime(),
      });
      setArticleList({
        results: res.data.data.results,
        pre_timestamp: res.data.data.pre_timestamp,
      });
    };
    getArticles();
  }, [channel_id]);

  // loading more
  const [hasMore, setHasMore] = useState(true);
  const loadMore = async () => {
    const res = await articles.fetchArticles({
      channel_id: channel_id,
      timestamp: articleList.pre_timestamp,
    });
    // if no more data, set hasMore to false
    setHasMore(res.data.data.results.length > 0);
    setArticleList({
      // join old, new data
      results: [...articleList.results, ...res.data.data.results],
      // reset timestamp, prepare for next loading
      pre_timestamp: res.data.data.pre_timestamp,
    });
  };
  return (
    <>
      <List>
        {articleList.results.map((item) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};

export default HomeList;
