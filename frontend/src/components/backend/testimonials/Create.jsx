import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { MessageCircleCode } from "lucide-react";
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/testimonials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...data, imageId }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        navigate("/admin/testimonials");
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
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === false) {
          toast.error(result.error?.image?.[0]);
        } else {
          setImageId(result.data.id);
        }
      });
  };

  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activePage="testimonials" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <AdminPageHeader
                  sectionKey="testimonials"
                  mode="create"
                  icon={MessageCircleCode}
                  backTo="/admin/testimonials"
                />
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">{form.testimonial}</label>
                    <textarea
                      placeholder={form.testimonial_ph}
                      className={`form-control ${errors.testimonial ? "is-invalid" : ""}`}
                      {...register("testimonial", {
                        required: validation.testimonial_required,
                      })}
                    />
                    {errors.testimonial && (
                      <p className="invalid-feedback">{errors.testimonial.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.citation}</label>
                    <input
                      type="text"
                      className={`form-control ${errors.citation ? "is-invalid" : ""}`}
                      placeholder={form.citation_ph}
                      {...register("citation", {
                        required: validation.citation_required,
                      })}
                    />
                    {errors.citation && (
                      <p className="invalid-feedback">{errors.citation.message}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">{form.designation}</label>
                        <input
                          type="text"
                          className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                          placeholder={form.designation_ph}
                          {...register("designation", {
                            required: validation.designation_required,
                          })}
                        />
                        {errors.designation && (
                          <p className="invalid-feedback">{errors.designation.message}</p>
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
