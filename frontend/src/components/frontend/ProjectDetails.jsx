import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Testimonials from "./Testimonials";
import { ArrowLeft, MapPin, Layers, Building2 } from "lucide-react";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-project/${id}`
      );
      const result = await response.json();
      setProjects(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [id]);
  return (
    <main>
      <section className="section-11">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-start">
              <span>{t("common.quality_tag")}</span>
              <h1>{projects.title}</h1>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link to="/projects" className="btn btn-outline-light btn-sm">
                  <ArrowLeft size={16} className="me-1" />
                  {t("details.back_projects")}
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
                <Link to="/projects">{t("details.projects")}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {projects.title || t("details.detail")}
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            <div className="col-lg-4 order-2 order-lg-1">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="h5 mb-0">{t("details.info")}</h3>
                    {!projects.status ? (
                      <span className="badge bg-danger-subtle text-danger">
                        {t("details.status_blocked")}
                      </span>
                    ) : (
                      <span className="badge bg-success-subtle text-success">
                        {t("details.status_active")}
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex">
                      <div className="me-3 text-primary">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="text-muted small">{t("details.location")}</div>
                        <div className="fw-semibold">
                          {projects.location || "—"}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="me-3 text-primary">
                        <Layers size={18} />
                      </div>
                      <div>
                        <div className="text-muted small">
                          {t("details.construction_type")}
                        </div>
                        <div className="fw-semibold">
                          {projects.construction_type || "—"}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex">
                      <div className="me-3 text-primary">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <div className="text-muted small">{t("details.sector")}</div>
                        <div className="fw-semibold">
                          {projects.sector || "—"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <Link to="/demander-service" className="btn btn-primary w-100">
                    {t("details.request_quote")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-8 order-1 order-lg-2">
              <div className="card shadow-sm border-0 overflow-hidden">
                {projects.image && (
                  <img
                    className="w-100"
                    style={{ maxHeight: 420, objectFit: "cover" }}
                    src={`${import.meta.env.VITE_FILE_URL}/uploads/projects/large/${projects.image}`}
                    alt={projects.title || "Projet"}
                  />
                )}
                <div className="card-body p-4 p-md-5">
                  <h2 className="h3 mb-3">{projects.title}</h2>
                  {projects.short_desc && (
                    <p className="text-muted mb-4">{projects.short_desc}</p>
                  )}
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: projects.content }}
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

export default ProjectDetails;
