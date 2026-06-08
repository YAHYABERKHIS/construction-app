import React from "react";
import MemberTableRow from "./MemberTableRow";
import useAdminForm from "../../../hooks/useAdminForm";

const MemberTable = ({ members, windowWidth, searchTerm, onDelete }) => {
  const { t } = useAdminForm();

  // Get responsive column configuration
  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "name", label: t("admin.name") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "name", label: t("admin.name") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "name", label: t("admin.name") },
        { key: "job_title", label: t("admin.job_title") },
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
          {members.length > 0 ? (
            members.map((member) => (
              <MemberTableRow
                key={member.id}
                member={member}
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
                  ? t("admin.form.no_members_match")
                  : t("admin.form.no_members")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
