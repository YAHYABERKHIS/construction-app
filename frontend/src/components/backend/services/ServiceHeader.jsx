import React from "react";
import { Briefcase, PlusCircleIcon, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import useAdminForm from "../../../hooks/useAdminForm";

const ServiceHeader = ({ windowWidth, onRefresh }) => {
  const { t } = useAdminForm();

  return (
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <h4 className="h5 d-flex align-items-center mb-3 mb-sm-0">
        <Briefcase size={windowWidth < 576 ? 20 : 28} className="admin-header-icon" />
        {t("admin.services")}
      </h4>
      <div className="d-flex flex-wrap">
        <Link
          to="create"
          className="btn btn-primary btn-sm d-flex align-items-center admin-btn-gap mb-2 mb-sm-0"
        >
          <PlusCircleIcon size={windowWidth < 576 ? 16 : 20} className="admin-header-icon-sm" />
          <span>{t("admin.create")}</span>
        </Link>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-flex align-items-center mb-2 mb-sm-0 admin-btn-gap"
          onClick={onRefresh}
          title={t("admin.refresh")}
        >
          <RefreshCw size={windowWidth < 576 ? 16 : 20} />
        </button>
      </div>
    </div>
  );
};

export default ServiceHeader;
