import React, { useMemo, useRef, useState } from "react";
import Sidebar from "../../Sidebar";
import { Briefcase } from "lucide-react";
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
  const [newImagePreview, setNewImagePreview] = useState(null);
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
      const newData = { ...data, content, imageId };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        navigate("/admin/services");
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
          setNewImagePreview(result.data.name);
        }
      });
  };

  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activePage="services" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <AdminPageHeader
                  sectionKey="services"
                  mode="create"
                  icon={Briefcase}
                  backTo="/admin/services"
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
                  <div className="mb-3">
                    <label className="form-label">{form.content}</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={editorConfig}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.status}</label>
                    <select className="form-select" {...register("status")}>
                      <option value="1">{statusOptions.active}</option>
                      <option value="0">{statusOptions.blocked}</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{form.image}</label>
                    <input type="file" className="form-control" onChange={handleFile} />
                  </div>
                  {newImagePreview && (
                    <div className="pb-3">
                      <img
                        src={`${import.meta.env.VITE_FILE_URL}/uploads/temp/thumb/${newImagePreview}`}
                        alt=""
                        style={{ width: "200px" }}
                        className="rounded"
                      />
                    </div>
                  )}
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
