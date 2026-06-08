import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-services`);
      const result = await response.json();
      setServices(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(error);
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <footer>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <h3 className="mb-3">GHANI SAKAN</h3>
            <div className="pe-5">
              <p>
                {t('footer.desc')}
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <h3 className="mb-3">{t('footer.services_title')}</h3>
            <ul>
              {(services || []).slice(0, 8).map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`}>{service.title}</Link>
                </li>
              ))}
              <li className="mt-2">
                <Link to="/admin/login">{t('footer.admin_access')}</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="mb-3">{t('footer.quick_links')}</h3>
            <ul>
              <li>
                <Link to="/about">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/services">{t('nav.services')}</Link>
              </li>
              <li>
                <Link to="/projects">{t('nav.projects')}</Link>
              </li>
              <li>
                <Link to="/blogs">{t('nav.blog')}</Link>
              </li>
              <li>
                <Link to="/demander-service">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="mb-3">{t('footer.contact')}</h3>
            <ul>
              <li>
                <a href="tel:+212665757519">0665757519</a>
              </li>
              <li>
                <a href="mailto:ghanisakan@gmail.com">ghanisakan@gmail.com</a>
              </li>
              <li>71 BLOC 44 HAY ZOUHOUR SAFI</li>
            </ul>
          </div>
          <hr />
          <div className="text-center pt-4">
            Copyright &copy; {year} {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
