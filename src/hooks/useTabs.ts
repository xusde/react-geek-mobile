import React, { useEffect } from "react";
import { ChannelItem } from "@/apis/articles";
import { articles } from "@/apis/articles";

const useTabs = () => {
  const [channels, setChannels] = React.useState<ChannelItem[]>([]);
  useEffect(() => {
    // fetch channels
    articles.fetchChannels().then((res) => {
      setChannels(res.data.data.channels);
    });
  }, []);
  return { channels };
};

export default useTabs;
