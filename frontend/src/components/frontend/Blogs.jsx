import React from "react";
import { useTranslation } from "react-i18next";
import BlogNews from "./BlogNews";

const Blogs = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className="section-7">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-start">
              <span>{t("common.quality_tag")}</span>
              <h1>{t("blog_page.title")}</h1>
              <p dangerouslySetInnerHTML={{ __html: t("blog_page.subtitle") }} />
            </div>
          </div>
        </div>
      </section>
      <BlogNews limit="all" />
    </main>
  );
};

export default Blogs;
