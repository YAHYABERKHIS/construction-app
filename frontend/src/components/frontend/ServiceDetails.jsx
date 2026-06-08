import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Testimonials from "./Testimonials";
import { Link, useParams } from "react-router-dom";
import ServiceImg from "../../assets/images/construction1.jpg";
import { ArrowLeft, Sparkles } from "lucide-react";

const ServiceDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-services`
      );
      const result = await response.json();
      setServices(result);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-service/${id}`
      );
      const result = await response.json();
      setService(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
    fetchServices();
  }, [id]);
  return (
    <main>
      <section className="section-11">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-start">
              <span>{t("common.quality_tag")}</span>
              <h1>{service.title}</h1>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link to="/services" className="btn btn-outline-light btn-sm">
                  <ArrowLeft size={16} className="me-1" />
                  {t("details.back_services")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">{t("details.home")}</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/services">{t("details.services")}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {service.title || t("details.detail")}
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            <div className="col-lg-4 order-2 order-lg-1">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="text-primary me-2">
                      <Sparkles size={18} />
                    </div>
                    <h3 className="h5 mb-0">{t("details.other_services")}</h3>
                  </div>

                  <div className="list-group list-group-flush">
                    {services &&
                      services
                        .filter((s) => String(s.id) !== String(id))
                        .slice(0, 10)
                        .map((s) => (
                          <Link
                            key={s.id}
                            to={`/services/${s.id}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          >
                            <span className="text-truncate">{s.title}</span>
                            <span className="text-muted small">{t("details.view")}</span>
                          </Link>
                        ))}
                  </div>

                  <hr className="my-4" />

                  <Link to="/demander-service" className="btn btn-primary w-100">
                    {t("details.contact_us")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-8 order-1 order-lg-2">
              <div className="card shadow-sm border-0 overflow-hidden">
                <img
                  className="w-100"
                  style={{ maxHeight: 420, objectFit: "cover" }}
                  src={
                    service.image
                      ? `${import.meta.env.VITE_FILE_URL}/uploads/services/large/${service.image}`
                      : ServiceImg
                  }
                  alt={service.title || "Service"}
                />
                <div className="card-body p-4 p-md-5">
                  <h2 className="h3 mb-3">{service.title}</h2>
                  {service.short_desc && (
                    <p className="text-muted mb-4">{service.short_desc}</p>
                  )}
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: service.content }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <Testimonials />
      </section>
    </main>
  );
};

export default ServiceDetails;
