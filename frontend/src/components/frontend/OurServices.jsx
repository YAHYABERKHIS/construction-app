import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OurServices = () => {
  const { t } = useTranslation();
  const [services, setSevices] = useState([]);

  const fetchLatestServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-latest-services?limit=4`
      );
      const result = await response.json();
      setSevices(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestServices();
  }, []);

  return (
    <section className="section-3 bg-light py-5">
      <div className="container-fluid py-5">
        <div className="section-header text-center">
          <span>{t("services_page.section_tag")}</span>
          <h2>{t("services_page.section_title")}</h2>
          <p>{t("services_page.section_desc")}</p>
        </div>
        <div className="row pt-4">
          {services &&
            services.map((service) => (
              <div className="col-md-3 col-lg-3" key={service.id}>
                <div className="item">
                  <div className="service-image">
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}/uploads/services/small/${service.image}`}
                      alt={service.title}
                      className="w-100"
                    />
                  </div>
                  <div className="service-body">
                    <div className="service-title">
                      <h3>{service.title}</h3>
                    </div>
                    <div className="service-content">
                      <p>{service.short_desc}</p>
                    </div>
                    <Link
                      to={`/services/${service.id}`}
                      className="btn btn-primary small-btn"
                    >
                      {t("common.learn_more")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
