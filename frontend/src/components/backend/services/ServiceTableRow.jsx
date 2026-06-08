import React from "react";
import { Link } from "react-router-dom";
import ServiceImg from "../../../assets/images/construction1.jpg";
import { toast } from "react-toastify";
import useGetToken from "../../../hooks/useGetToken";
import useAdminForm from "../../../hooks/useAdminForm";

const ServiceTableRow = ({ service, columns, windowWidth, onDelete }) => {
  const { token } = useGetToken();
  const { t, statusOptions } = useAdminForm();

  const handleDelete = async () => {
    if (confirm(t("admin.confirm_delete"))) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/services/${service.id}`,
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
        onDelete();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <tr>
      {columns.map((column) => {
        switch (column.key) {
          case "id":
            return (
              <td key={column.key} className="align-middle">
                {service.id}
              </td>
            );
          case "image":
            return (
              <td key={column.key} className="align-middle">
                <img
                  src={
                    service.image
                      ? `${import.meta.env.VITE_FILE_URL}/uploads/services/small/${service.image}`
                      : ServiceImg
                  }
                  alt={service.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  className="rounded"
                />
              </td>
            );
          case "title":
            return (
              <td key={column.key} className="align-middle">
                {service.title}
              </td>
            );
          case "slug":
            return (
              <td key={column.key} className="align-middle">
                {service.slug}
              </td>
            );
          case "status":
            return (
              <td key={column.key} className="align-middle">
                <span
                  className={`badge ${
                    service.status ? "bg-success" : "bg-danger"
                  } rounded-pill px-2 py-1`}
                >
                  {service.status ? statusOptions.active : statusOptions.blocked}
                </span>
              </td>
            );
          case "actions":
            return (
              <td key={column.key} className="align-middle">
                <div className="d-flex flex-wrap gap-1">
                  <Link
                    to={`/admin/services/edit/${service.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    {windowWidth < 400 ? t("admin.edit").charAt(0) : t("admin.edit")}
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-secondary btn-sm"
                  >
                    {windowWidth < 400 ? t("admin.delete").charAt(0) : t("admin.delete")}
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

export default ServiceTableRow;
