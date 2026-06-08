import React from "react";
import { useTranslation } from "react-i18next";
import AboutIMG from "../../assets/images/about-us.jpg";
const Aboutus = () => {
  const { t } = useTranslation();
  return (
    <section className="section-2 py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={AboutIMG} alt="À propos" className="w-100" />
          </div>
          <div className="col-md-6">
            <span>{t('about.tag')}</span>
            <h2>{t('about.title')}</h2>
            <p className="lead fw-bold">
              {t('about.subtitle')}
            </p>
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
