import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import useAdminForm from "../../hooks/useAdminForm";

const AdminPageHeader = ({ sectionKey, mode = "create", icon: Icon, backTo }) => {
  const { t, actions } = useAdminForm();
  const actionLabel = mode === "edit" ? actions.edit : actions.create;

  return (
    <div className="d-flex justify-content-between flex-wrap gap-2 admin-page-header">
      <h4 className="h5 d-flex align-items-center mb-0">
        {Icon && <Icon size={28} className="admin-header-icon" />}
        <span>
          {t(`admin.${sectionKey}`)} &gt; {actionLabel}
        </span>
      </h4>
      <Link to={backTo} className="btn btn-primary d-flex align-items-center">
        <ArrowLeftCircle size={20} className="admin-header-icon admin-back-icon" />
        {actions.back}
      </Link>
    </div>
  );
};

export default AdminPageHeader;
