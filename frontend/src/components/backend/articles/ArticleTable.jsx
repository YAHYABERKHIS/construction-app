import React from "react";
import ArticleTableRow from "./ArticleTableRow";
import useAdminForm from "../../../hooks/useAdminForm";

const ArticleTable = ({ articles, windowWidth, searchTerm, onDelete }) => {
  const { t } = useAdminForm();

  // Get responsive column configuration
  const getColumns = () => {
    if (windowWidth < 576) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.title_col") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else if (windowWidth < 768) {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.title_col") },
        { key: "status", label: t("admin.status") },
        { key: "actions", label: t("admin.actions") },
      ];
    } else {
      return [
        { key: "id", label: "ID" },
        { key: "image", label: t("admin.image") },
        { key: "title", label: t("admin.title_col") },
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
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleTableRow
                key={article.id}
                article={article}
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
                  ? t("admin.form.no_articles_match")
                  : t("admin.form.no_articles")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
