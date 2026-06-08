import React, { useMemo, useRef, useState } from "react";
import Sidebar from "../../Sidebar";
import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import useAdminForm from "../../../hooks/useAdminForm";
import useFormLanguageSync from "../../../hooks/useFormLanguageSync";
import AdminPageHeader from "../AdminPageHeader";

const Create = () => {
  const editor = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [content, setContent] = useState("");
  const { form, validation, actions, statusOptions, language } = useAdminForm();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  useFormLanguageSync(clearErrors);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: form.content_ph,
      direction: language === "ar" ? "rtl" : "ltr",
    }),
    [form.content_ph, language]
  );

  const [loading, setLoading] = useState(false);
  const { token } = useGetToken();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, content, imageId }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        navigate("/admin/projects");
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
            <Sidebar activePage="projects" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <AdminPageHeader
                  sectionKey="projects"
                  mode="create"
                  icon={FolderOpen}
                  backTo="/admin/projects"
                />
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">{form.title}</label>
                    <input
                      type="text"
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder={form.title_ph}
                      {...register("title", { required: validation.title_required })}
                    />
                    {errors.title && (
                      <p className="invalid-feedback">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.slug}</label>
                    <input
                      type="text"
                      className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                      placeholder={form.slug_ph}
                      {...register("slug", { required: validation.slug_required })}
                    />
                    {errors.slug && (
                      <p className="invalid-feedback">{errors.slug.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.short_desc}</label>
                    <textarea
                      placeholder={form.short_desc_ph}
                      className="form-control"
                      {...register("short_desc")}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">{form.location}</label>
                        <input
                          type="text"
                          className={`form-control ${errors.location ? "is-invalid" : ""}`}
                          placeholder={form.location_ph}
                          {...register("location", {
                            required: validation.location_required,
                          })}
                        />
                        {errors.location && (
                          <p className="invalid-feedback">{errors.location.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">{form.construction_type}</label>
                        <select
                          className={`form-select ${errors.construction_type ? "is-invalid" : ""}`}
                          {...register("construction_type", {
                            required: validation.construction_type_required,
                          })}
                        >
                          <option value="">{form.construction_type_ph}</option>
                          <option value="Residential Construction">
                            {form.construction_residential}
                          </option>
                          <option value="Commercial Construction">
                            {form.construction_commercial}
                          </option>
                          <option value="Industrial Construction">
                            {form.construction_industrial}
                          </option>
                          <option value="Infrastructure Construction">
                            {form.construction_infrastructure}
                          </option>
                        </select>
                        {errors.construction_type && (
                          <p className="invalid-feedback">
                            {errors.construction_type.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">{form.sector}</label>
                        <select
                          className={`form-select ${errors.sector ? "is-invalid" : ""}`}
                          {...register("sector", { required: validation.sector_required })}
                        >
                          <option value="">{form.sector_ph}</option>
                          <option value="Health">{form.sector_health}</option>
                          <option value="Education">{form.sector_education}</option>
                          <option value="Corporate">{form.sector_corporate}</option>
                        </select>
                        {errors.sector && (
                          <p className="invalid-feedback">{errors.sector.message}</p>
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
                    <label className="form-label">{form.content}</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={editorConfig}
                      tabIndex={1}
                      onBlur={(c) => setContent(c)}
                      onChange={() => {}}
                    />
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
