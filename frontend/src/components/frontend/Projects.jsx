import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectsImg from "../../assets/images/construction2.jpg";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const fetchAllProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-projects`
      );
      const result = await response.json();
      setProjects(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <main>
      <section className="section-7">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-start">
              <span>{t('common.quality_tag')}</span>
              <h1 dangerouslySetInnerHTML={{ __html: t('projects_page.title') }}></h1>
              <p dangerouslySetInnerHTML={{ __html: t('projects_page.subtitle') }}></p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>{t('projects_page.section_tag')}</span>
            <h2>{t('projects_page.section_title')}</h2>
            <p>
              {t('projects_page.section_desc')}
            </p>
          </div>
          <div className="row pt-4">
            {projects &&
              projects.map((project) => {
                return (
                  <div className="col-md-4 col-lg-4" key={project.id}>
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={`${
                            import.meta.env.VITE_FILE_URL
                          }/uploads/projects/small/${project.image}`}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{project.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>{project.short_desc}</p>
                        </div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="btn btn-primary small-btn"
                        >
                          {t('common.learn_more')}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
