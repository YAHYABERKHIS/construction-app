import { useEffect, useState } from "react";

const useGetMessagesData = (token) => {
  const [allMessages, setAllMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const paginateData = (data, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    setDisplayedMessages(data.slice(startIndex, endIndex));
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/messages`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data.status) {
        const messages = data.data || [];
        setAllMessages(messages);
        setFilteredMessages(messages);
        const calculatedPages = Math.ceil(messages.length / pageSize);
        setTotalPages(calculatedPages || 1);
        paginateData(messages, currentPage, pageSize);
      } else {
        setError("Failed to load messages. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    paginateData(filteredMessages, page, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);
    const newTotalPages = Math.ceil(filteredMessages.length / newPageSize);
    setTotalPages(newTotalPages || 1);
    setCurrentPage(1);
    paginateData(filteredMessages, 1, newPageSize);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    let results = allMessages;

    if (term.trim() !== "") {
      const t = term.toLowerCase();
      results = allMessages.filter((m) => {
        return (
          String(m.id).includes(t) ||
          (m.name || "").toLowerCase().includes(t) ||
          (m.email || "").toLowerCase().includes(t) ||
          (m.subject || "").toLowerCase().includes(t) ||
          (m.message || "").toLowerCase().includes(t)
        );
      });
    }

    setFilteredMessages(results);
    const newTotalPages = Math.ceil(results.length / pageSize);
    setTotalPages(newTotalPages || 1);
    setCurrentPage(1);
    paginateData(results, 1, pageSize);
  };

  const handleRefresh = () => {
    fetchMessages();
    setSearchTerm("");
  };

  useEffect(() => {
    if (token) fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
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
  };
};

export default useGetMessagesData;

