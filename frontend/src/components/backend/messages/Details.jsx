import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import useGetToken from "../../../hooks/useGetToken";
import LoadingSpinner from "../services/LoadingSpinner";
import ErrorDisplay from "../services/ErrorDisplay";
import useAdminForm from "../../../hooks/useAdminForm";

const Details = () => {
  const { id } = useParams();
  const { token } = useGetToken();
  const { t, form, actions } = useAdminForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/messages/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.status) setMessage(data.data);
      else setError(data.message || form.load_error);
    } catch (err) {
      console.error("Error fetching message:", err);
      setError(form.load_error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/messages/${id}/read`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // non-blocking
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchMessage().then(markAsRead);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id]);

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
                <div className="d-flex flex-wrap justify-content-between mb-3 admin-page-header">
                  <h4 className="h5 mb-2 mb-sm-0">
                    {t("admin.messages")} #{id}
                  </h4>
                  <Link
                    to="/admin/messages"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {actions.back}
                  </Link>
                </div>

                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <ErrorDisplay message={error} />
                ) : (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="border rounded p-3 bg-white h-100">
                        <div className="text-muted small mb-1">
                          {t("admin.name")}
                        </div>
                        <div className="fw-semibold">{message?.name}</div>
                        <hr className="my-3" />
                        <div className="text-muted small mb-1">{form.email}</div>
                        <div className="fw-semibold">{message?.email}</div>
                        <hr className="my-3" />
                        <div className="text-muted small mb-1">{form.phone}</div>
                        <div className="fw-semibold">{message?.phone || "-"}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border rounded p-3 bg-white h-100">
                        <div className="text-muted small mb-1">{form.subject}</div>
                        <div className="fw-semibold">{message?.subject || "-"}</div>
                        <hr className="my-3" />
                        <div className="text-muted small mb-1">{form.received_at}</div>
                        <div className="fw-semibold">
                          {message?.created_at
                            ? new Date(message.created_at).toLocaleString()
                            : "-"}
                        </div>
                        <hr className="my-3" />
                        <div className="text-muted small mb-1">{form.status}</div>
                        <div className="fw-semibold">
                          {message?.is_read ? form.message_read : form.message_new}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="border rounded p-3 bg-white">
                        <div className="text-muted small mb-1">{form.message}</div>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                          {message?.message || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;
