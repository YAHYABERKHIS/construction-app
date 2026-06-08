import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useGetToken from "../../../hooks/useGetToken";

const MessageTableRow = ({ message, columns, windowWidth, onDelete }) => {
  const { token } = useGetToken();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/messages/${message.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      onDelete();
    } else {
      toast.error(result.message || "Impossible de supprimer le message");
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString();
  };

  return (
    <tr className={!message.is_read ? "table-warning" : ""}>
      {columns.map((column) => {
        switch (column.key) {
          case "id":
            return <td key={column.key}>{message.id}</td>;
          case "name":
            return <td key={column.key}>{message.name}</td>;
          case "email":
            return <td key={column.key}>{message.email}</td>;
          case "subject":
            return <td key={column.key}>{message.subject || "-"}</td>;
          case "status":
            return (
              <td key={column.key}>
                <span
                  className={`badge ${
                    message.is_read ? "bg-success" : "bg-secondary"
                  } rounded-pill px-2 py-1`}
                >
                  {message.is_read ? "Lu" : "Nouveau"}
                </span>
              </td>
            );
          case "created_at":
            return <td key={column.key}>{formatDate(message.created_at)}</td>;
          case "actions":
            return (
              <td key={column.key}>
                <div className="d-flex flex-wrap">
                  <Link
                    to={`/admin/messages/${message.id}`}
                    className="btn btn-primary btn-sm me-1 mb-1"
                  >
                    {windowWidth < 400 ? "V" : "Voir"}
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-secondary btn-sm mb-1"
                  >
                    {windowWidth < 400 ? "S" : "Supprimer"}
                  </button>
                </div>
              </td>
            );
          default:
            return null;
        }
      })}
    </tr>
  );
};

export default MessageTableRow;

