import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import useAdminForm from "../../../hooks/useAdminForm";
import useFormLanguageSync from "../../../hooks/useFormLanguageSync";
import AdminPageHeader from "../AdminPageHeader";

const Create = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const { form, validation, actions, statusOptions } = useAdminForm();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  useFormLanguageSync(clearErrors);

  const [loading, setLoading] = useState(false);
  const { token } = useGetToken();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, imageId }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        navigate("/admin/members");
      } else {
        toast.error(responseData.error?.slug?.[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/temp-images`, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.status === false) toast.error(result.error?.image?.[0]);
        else setImageId(result.data.id);
      });
  };

  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activePage="members" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <AdminPageHeader
                  sectionKey="members"
                  mode="create"
                  icon={Users}
                  backTo="/admin/members"
                />
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">{form.member_name}</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder={form.member_name_ph}
                      {...register("name", {
                        required: validation.member_name_required,
                      })}
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.job_title}</label>
                    <input
                      type="text"
                      className={`form-control ${errors.job_title ? "is-invalid" : ""}`}
                      placeholder={form.job_title_ph}
                      {...register("job_title", {
                        required: validation.job_title_required,
                      })}
                    />
                    {errors.job_title && (
                      <p className="invalid-feedback">{errors.job_title.message}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">{form.linkedin}</label>
                        <input
                          type="text"
                          className={`form-control ${errors.linkedin_url ? "is-invalid" : ""}`}
                          placeholder={form.linkedin_ph}
                          {...register("linkedin_url", {
                            required: validation.linkedin_required,
                          })}
                        />
                        {errors.linkedin_url && (
                          <p className="invalid-feedback">
                            {errors.linkedin_url.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">{form.status}</label>
                        <select className="form-select" {...register("status")}>
                          <option value="1">{statusOptions.active}</option>
                          <option value="0">{statusOptions.blocked}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.image}</label>
                    <input type="file" className="form-control" onChange={handleFile} />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isDisable || loading}
                  >
                    {loading ? form.creating : actions.create}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;
