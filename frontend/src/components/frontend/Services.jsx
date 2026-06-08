import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceImg from "../../assets/images/construction1.jpg";

const Services = () => {
  const { t } = useTranslation();
  const [services, setSevices] = useState([]);
  const fetchLatestServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-services`
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
    <section className="section-9">
      <div className="hero d-flex align-items-center">
        <div className="container">
          <div className="text-start">
            <span>{t('common.quality_tag')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('services_page.title') }}></h1>
            <p dangerouslySetInnerHTML={{ __html: t('services_page.subtitle') }}></p>
          </div>
        </div>
      </div>
      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>{t('services_page.section_tag')}</span>
            <h2>{t('services_page.section_title')}</h2>
            <p>
              {t('services_page.section_desc')}
            </p>
          </div>
          <div className="row pt-4">
            {services &&
              services.map((service) => {
                return (
                  <div className="col-md-4 col-lg-4" key={service.id}>
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={
                            service.image
                              ? `${import.meta.env.VITE_FILE_URL}/uploads/services/small/${service.image}`
                              : ServiceImg
                          }
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
                        <a
                          href={`/services/${service.id}`}
                          className="btn btn-primary small-btn"
                        >
                          {t('common.learn_more')}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;
