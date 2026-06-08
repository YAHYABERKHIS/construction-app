import React from "react";
import { useTranslation } from "react-i18next";
import TestimonialTableRow from "./TestimonialTableRow";

const TestimonialTable = ({
  testimonials,
  windowWidth,
  searchTerm,
  onDelete,
}) => {
  const { t } = useTranslation();

  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "testimonial", label: t("admin.testimonial_col") },
        { key: "actions", label: t("admin.actions") },
      ];
    }
    if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "testimonial", label: t("admin.testimonial_col") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    }
    return [
      { key: "id", label: "ID" },
      { key: "image", label: t("admin.image") },
      { key: "testimonial", label: t("admin.testimonial_col") },
      { key: "citation", label: t("admin.citation") },
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
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <TestimonialTableRow
                key={testimonial.id}
                testimonial={testimonial}
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
                {searchTerm ? t("admin.no_testimonials_match") : t("admin.no_testimonials")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialTable;
