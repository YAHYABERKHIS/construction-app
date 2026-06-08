import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center py-5"
        style={{
          minHeight: "calc(100vh - 504px)",
          margin: "0 auto",
        }}
      >
        <h1 className="display-1 mb-3 text-center">404</h1>
        <h2 className="mb-3 text-center">{t("not_found.title")}</h2>
        <p className="mb-4 text-center">{t("not_found.message")}</p>
        <Link to="/" className="btn btn-danger px-4 py-2">
          {t("not_found.back")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
