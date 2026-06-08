import React, { useMemo, useRef, useState } from "react";
import Sidebar from "../../Sidebar";
import { ArrowLeftCircle, Briefcase, FolderOpen } from "lucide-react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const { id } = useParams();
  const { token } = useGetToken();
  const navigate = useNavigate();
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/projects/${id}`,
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
      setProject(result.data);
      return {
        title: result.data.title,
        slug: result.data.slug,
        short_desc: result.data.short_desc,
        status: result.data.status,
        location: result.data.location,
        sector: result.data.sector,
        construction_type: result.data.construction_type,
      };
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = { ...data, content: content, imageId: imageId };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/projects/${id}`,
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
        navigate("/admin/projects");
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
          }
        });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l’envoi de l’image.");
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
            <Sidebar activePage="projects" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h-5 d-flex">
                    <FolderOpen size={28} className="me-2" />
                    {`Projets > Modifier`}
                  </h4>
                  <Link to="/admin/projects" className="btn btn-primary d-flex">
                    <ArrowLeftCircle className="me-2" />
                    Retour
                  </Link>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Nom
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Entrez le nom"
                      {...register("title", {
                        required: "Le nom est obligatoire",
                      })}
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors?.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.slug ? "is-invalid" : ""
                      }`}
                      placeholder="Entrez le slug"
                      {...register("slug", {
                        required: "Le slug est obligatoire",
                      })}
                    />
                    {errors.slug && (
                      <p className="invalid-feedback">
                        {errors?.slug?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description courte
                    </label>
                    <textarea
                      placeholder="Description courte"
                      className="form-control"
                      {...register("short_desc")}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Localisation
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.location ? "is-invalid" : ""
                          }`}
                          placeholder="Entrez la localisation"
                          {...register("location", {
                            required: "La localisation est obligatoire",
                          })}
                        />
                        {errors.location && (
                          <p className="invalid-feedback">
                            {errors?.location?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Type de construction
                        </label>
                        <select
                          className={`form-control ${
                            errors.construction_type ? "is-invalid" : ""
                          }`}
                          {...register("construction_type", {
                            required:
                              "Le type de construction est obligatoire",
                          })}
                        >
                          <option value="">Type de construction</option>
                          <option value="Residential Construction">
                            Construction résidentielle
                          </option>
                          <option value="Commercial Construction">
                            Construction commerciale
                          </option>
                          <option value="Industrial Construction">
                            Construction industrielle
                          </option>
                          <option value="Infrastructure Construction">
                            Construction d’infrastructure
                          </option>
                        </select>
                        {errors.construction_type && (
                          <p className="invalid-feedback">
                            {errors?.construction_type?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Secteur
                        </label>
                        <select
                          className={`form-control ${
                            errors.sector ? "is-invalid" : ""
                          }`}
                          {...register("sector", {
                            required: "Le secteur est obligatoire",
                          })}
                        >
                          <option value="">Secteur</option>
                          <option value="Health">Santé</option>
                          <option value="Education">Éducation</option>
                          <option value="Corporate">Entreprise</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Statut
                        </label>
                        <select
                          className="form-control"
                          {...register("status")}
                        >
                          <option value="1">Actif</option>
                          <option value="0">Bloqué</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Contenu
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <br />
                    <input type="file" onChange={handleFile} />
                  </div>
                  <div className="pb-3">
                    {project.image && (
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/projects/small/${project.image}`}
                      />
                    )}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    disabled={isDisable}
                  >
                    {loading ? "Mise à jour..." : "Mettre à jour"}
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
