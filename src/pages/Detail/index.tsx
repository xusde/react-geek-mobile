import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DetailType, articles } from "@/apis/articles";
import { useState } from "react";
import { NavBar, DotLoading } from "antd-mobile";

const Detail = () => {
  // get article_id from url serach params
  const [params] = useSearchParams();
  const article_id = params.get("id");
  const [articleDetail, setArticleDetail] = useState<DetailType | null>(null);
  // navigate
  const navigate = useNavigate();
  // side effect
  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await articles.fetchArticleDetail(article_id!);
      setArticleDetail(res.data.data);
    };
    getArticleDetail();
  }, [article_id]);

  if (!articleDetail) {
    return <DotLoading color="primary" />;
  }
  return (
    <div>
      <NavBar onBack={() => navigate(-1)}>{articleDetail.title}</NavBar>
      <div dangerouslySetInnerHTML={{ __html: articleDetail.content }}></div>
    </div>
  );
};

export default Detail;
