import React from "react";
import { Mail, RefreshCw } from "lucide-react";
import useAdminForm from "../../../hooks/useAdminForm";

const MessageHeader = ({ windowWidth, onRefresh }) => {
  const { t } = useAdminForm();

  return (
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <h4 className="h5 d-flex align-items-center mb-3 mb-sm-0">
        <Mail size={windowWidth < 576 ? 20 : 28} className="admin-header-icon" />
        {t("admin.messages")}
      </h4>
      <div className="d-flex flex-wrap">
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

export default MessageHeader;
