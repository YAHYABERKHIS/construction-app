import React from "react";
import { useTranslation } from "react-i18next";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import Icon3 from "../../assets/images/icon-3.svg";

const WhyChooseUs = () => {
  const { t } = useTranslation();
  return (
    <section className="section-4">
      <div className="container py-5">
        <div className="section-header text-center">
          <span>{t('whyus.tag')}</span>
          <h2>{t('whyus.title')}</h2>
          <p>
            {t('whyus.subtitle')}
          </p>
        </div>
        <div className="row pt-4">
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <div className="card-icon">
                <img src={Icon1} alt="" />
              </div>
              <div className="card-title mt-3">
                <h3>{t('whyus.f1_title')}</h3>
                <p>
                  {t('whyus.f1_desc')}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <div className="card-icon">
                <img src={Icon2} alt="" />
              </div>
              <div className="card-title mt-3">
                <h3>{t('whyus.f2_title')}</h3>
                <p>
                  {t('whyus.f2_desc')}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <div className="card-icon">
                <img src={Icon3} alt="" />
              </div>
              <div className="card-title mt-3">
                <h3>{t('whyus.f3_title')}</h3>
                <p>
                  {t('whyus.f3_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
