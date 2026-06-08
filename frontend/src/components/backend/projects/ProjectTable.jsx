import React from "react";
import ProjectTableRow from "./ProjectTableRow";
import useAdminForm from "../../../hooks/useAdminForm";

const ProjectTable = ({ projects, windowWidth, searchTerm, onDelete }) => {
  const { t } = useAdminForm();

  // Get responsive column configuration
  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "title", label: t("admin.name") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.name") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.name") },
        { key: "slug", label: t("admin.slug") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    }
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
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectTableRow
                key={project.id}
                project={project}
                columns={columns}
                windowWidth={windowWidth}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center fw-bold text-danger py-4"
              >
                {searchTerm
                  ? t("admin.form.no_projects_match")
                  : t("admin.form.no_projects")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
