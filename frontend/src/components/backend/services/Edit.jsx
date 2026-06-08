import React, { useMemo, useRef, useState } from "react";
import Sidebar from "../../Sidebar";
import { Briefcase } from "lucide-react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import useAdminForm from "../../../hooks/useAdminForm";
import useFormLanguageSync from "../../../hooks/useFormLanguageSync";
import AdminPageHeader from "../AdminPageHeader";

const Edit = () => {
  const { form, validation, actions, statusOptions, language } = useAdminForm();
  const editor = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState([]);
  const { id } = useParams();
  const { token } = useGetToken();
  const navigate = useNavigate();
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: form.content_ph,
      direction: language === "ar" ? "rtl" : "ltr",
    }),
    [form.content_ph, language]
  );
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/services/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setContent(result.data.content);
      setService(result.data);
      return {
        title: result.data.title,
        slug: result.data.slug,
        short_desc: result.data.short_desc,
        status: result.data.status,
      };
    },
  });
  useFormLanguageSync(clearErrors);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = { ...data, content: content, imageId: imageId };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/services/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        navigate("/admin/services");
      } else {
        toast.error(responseData.error.slug[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleFile = async (e) => {
    try {
      setIsDisable(true);
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
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
          if (result.status == false) {
            toast.error(result.error.image[0]);
          } else {
            setImageId(result.data.id);
            setNewImagePreview(result.data.name);
          }
        });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading the image.");
    } finally {
      setIsDisable(false);
    }
  };
  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            {/* Sidebar */}
            <Sidebar activePage="services" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <AdminPageHeader
                  sectionKey="services"
                  mode="edit"
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
                      <p className="invalid-feedback">
                        {errors?.title?.message}
                      </p>
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
                      <p className="invalid-feedback">
                        {errors?.slug?.message}
                      </p>
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
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
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
                  <div className="pb-3">
                    {newImagePreview ? (
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/temp/thumb/${newImagePreview}`}
                        alt="New Service Preview"
                        style={{ width: "200px" }}
                      />
                    ) : service.image ? (
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/services/small/${service.image}`}
                        alt="Current Service"
                        style={{ width: "200px" }}
                      />
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isDisable || loading}
                  >
                    {loading ? form.saving : actions.save}
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

export default Edit;
