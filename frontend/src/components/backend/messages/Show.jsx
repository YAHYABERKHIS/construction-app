import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import SearchAndFilter from "../services/SearchAndFilter";
import Pagination from "../Pagination";
import PaginationInfo from "../services/PaginationInfo";
import LoadingSpinner from "../services/LoadingSpinner";
import ErrorDisplay from "../services/ErrorDisplay";
import useGetToken from "../../../hooks/useGetToken";
import useGetMessagesData from "../../../hooks/useGetMessagesData";
import MessageHeader from "./MessageHeader";
import MessageTable from "./MessageTable";

const Show = () => {
  const { token } = useGetToken();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    allMessages,
    filteredMessages,
    displayedMessages,
    loading,
    error,
    currentPage,
    totalPages,
    pageSize,
    searchTerm,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleRefresh,
  } = useGetMessagesData(token);

  return (
    <main className="dashboard-container bg-light py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activePage="messages" />
          </div>
          <div className="col-lg-9">
            <div className="card shadow border-0">
              <div className="card-body p-3 p-md-4">
                <MessageHeader windowWidth={windowWidth} onRefresh={handleRefresh} />

                <SearchAndFilter
                  searchTerm={searchTerm}
                  onSearch={handleSearch}
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                />

                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <ErrorDisplay message={error} />
                ) : (
                  <>
                    <MessageTable
                      messages={displayedMessages}
                      windowWidth={windowWidth}
                      searchTerm={searchTerm}
                      onDelete={handleRefresh}
                    />

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                      {filteredMessages.length > 0 && (
                        <PaginationInfo
                          currentPage={currentPage}
                          pageSize={pageSize}
                          filteredCount={filteredMessages.length}
                          totalCount={allMessages.length}
                          displayedCount={displayedMessages.length}
                          searchTerm={searchTerm}
                        />
                      )}

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Show;

