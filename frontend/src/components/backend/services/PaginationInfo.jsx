import React from "react";

const PaginationInfo = ({
  currentPage,
  pageSize,
  filteredCount,
  totalCount,
  displayedCount,
  searchTerm,
}) => {
  return (
    <div className="text-muted small mb-2 mb-md-0">
      Affichage de{" "}
      {displayedCount > 0 ? (currentPage - 1) * pageSize + 1 : 0} à{" "}
      {Math.min(currentPage * pageSize, filteredCount)} sur {filteredCount}{" "}
      éléments
      {searchTerm && ` (filtré depuis ${totalCount} éléments au total)`}
    </div>
  );
};

export default PaginationInfo;
