import React from "react";
import ServiceTableRow from "./ServiceTableRow";
import useAdminForm from "../../../hooks/useAdminForm";

const ServiceTable = ({ services, windowWidth, searchTerm, onDelete }) => {
  const { t, form } = useAdminForm();

  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.title_col") },
        { key: "actions", label: t("admin.actions") },
      ];
    }
    if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.title_col") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    }
    return [
      { key: "id", label: "ID" },
      { key: "image", label: t("admin.image") },
      { key: "title", label: t("admin.title_col") },
      { key: "slug", label: t("admin.slug") },
      { key: "status", label: t("admin.status") },
      { key: "actions", label: t("admin.actions") },
    ];
  };

  const columns = getColumns();

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceTableRow
                key={service.id}
                service={service}
                columns={columns}
                windowWidth={windowWidth}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center fw-bold text-danger py-4">
                {searchTerm ? form.no_services_match : form.no_services}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
