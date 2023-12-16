import React from "react";
import "./style.css";
import { Tabs } from "antd-mobile";
import useTabs from "@/hooks/useTabs";
import HomeList from "./HomeList";

const Home = () => {
  const { channels } = useTabs();
  return (
    <div>
      <div className=".tabContainer">
        <Tabs>
          {channels.map((channel) => (
            <Tabs.Tab title={channel.name} key={channel.id}>
              <div className="listContainer">
                <HomeList channel_id={"" + channel.id} />
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
