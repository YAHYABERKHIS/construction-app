import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className="section-1">
        <div className="hero d-flex align-items-start pt-5">
          <div className="container-fluid mt-5">
            <div className="text-center">
              <span>{t('home.welcome')}</span>
              <h1>
                {t('home.title')}
              </h1>
              <p>
                {t('home.subtitle')}
              </p>
              <div className="mt-4 d-flex flex-column flex-md-row justify-content-center gap-3">
                <Link
                  to="/demander-service"
                  className="btn btn-primary large-btn"
                >
                  {t('home.contact_us')}
                </Link>
                <Link
                  to="/projects"
                  className="btn btn-secondary large-btn"
                >
                  {t('home.view_projects')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;