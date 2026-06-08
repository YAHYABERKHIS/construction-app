import React from "react";
import MessageTableRow from "./MessageTableRow";
import useAdminForm from "../../../hooks/useAdminForm";

const MessageTable = ({ messages, windowWidth, searchTerm, onDelete }) => {
  const { t } = useAdminForm();

  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: t("admin.name") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: t("admin.name") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    }
    return [
      { key: "id", label: "ID" },
      { key: "name", label: t("admin.name") },
      { key: "email", label: t("admin.email") },
      { key: "subject", label: t("admin.form.subject") },
      { key: "status", label: t("admin.status") },
      { key: "created_at", label: t("admin.form.received_at") },
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
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageTableRow
                key={message.id}
                message={message}
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
                  ? t("admin.form.no_messages_match")
                  : t("admin.form.no_messages")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;

