import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, Loader2, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PROJECT_TYPES = [
  { value: "Villa", key: "opt_villa" },
  { value: "Appartement", key: "opt_apartment" },
  { value: "Immeuble", key: "opt_building" },
  { value: "Local Commercial", key: "opt_commercial" },
  { value: "Rénovation", key: "opt_renovation" },
];

const MATERIALS = [
  { value: "Économique", key: "opt_economic" },
  { value: "Standard", key: "opt_standard" },
  { value: "Premium (Haut de gamme)", key: "opt_premium" },
  { value: "Luxe", key: "opt_luxury" },
];

const QuoteGenerator = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    type: "Villa",
    surface: "",
    materials: "Standard",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLocale = () =>
    i18n.language?.startsWith("ar")
      ? "ar"
      : i18n.language?.startsWith("en")
        ? "en"
        : "fr";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.surface) return;

    setIsLoading(true);
    setQuoteResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, locale: getLocale() }),
      });

      const data = await response.json();
      setQuoteResult(data.quote || t("quote_page.error_quote"));
    } catch (error) {
      console.error("Quote error:", error);
      setQuoteResult(t("quote_page.error_generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="section-11 py-5 bg-light">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="text-center mb-5">
                <span className="text-primary fw-bold text-uppercase">
                  {t("quote_page.tag")}
                </span>
                <h2>{t("quote_page.title")}</h2>
                <p>{t("quote_page.subtitle")}</p>
              </div>

              <div className="card shadow-lg border-0" style={{ borderRadius: "20px" }}>
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">
                          {t("quote_page.label_type")}
                        </label>
                        <select
                          className="form-select form-select-lg"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                        >
                          {PROJECT_TYPES.map(({ value, key }) => (
                            <option key={value} value={value}>
                              {t(`quote_page.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">
                          {t("quote_page.label_surface")}
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder={t("quote_page.placeholder_surface")}
                          name="surface"
                          value={formData.surface}
                          onChange={handleChange}
                          required
                          min="10"
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">
                          {t("quote_page.label_materials")}
                        </label>
                        <select
                          className="form-select form-select-lg"
                          name="materials"
                          value={formData.materials}
                          onChange={handleChange}
                        >
                          {MATERIALS.map(({ value, key }) => (
                            <option key={value} value={value}>
                              {t(`quote_page.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">
                          {t("quote_page.label_location")}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder={t("quote_page.placeholder_location")}
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="text-center mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5 py-3 d-inline-flex align-items-center gap-2"
                        disabled={isLoading}
                        style={{ borderRadius: "50px" }}
                      >
                        {isLoading ? (
                          <Loader2 className="spinner" size={24} />
                        ) : (
                          <Calculator size={24} />
                        )}
                        {isLoading ? t("quote_page.btn_loading") : t("quote_page.btn_submit")}
                      </button>
                    </div>
                  </form>

                  {quoteResult && (
                    <div className="mt-5 p-4 bg-light rounded-4 border border-2 border-primary border-opacity-25">
                      <div className="d-flex align-items-center gap-2 mb-3 text-primary">
                        <FileText size={24} />
                        <h4 className="m-0 fw-bold">{t("quote_page.result_title")}</h4>
                      </div>
                      <div className="fs-5 lh-base" style={{ whiteSpace: "pre-line" }}>
                        {quoteResult}
                      </div>
                      <hr className="my-4" />
                      <div className="text-center">
                        <p className="text-muted small mb-3">{t("quote_page.disclaimer")}</p>
                        <Link
                          to="/demander-service"
                          className="btn btn-secondary px-4 py-2 d-inline-flex align-items-center gap-2"
                          style={{ borderRadius: "50px" }}
                        >
                          {t("quote_page.request_quote")} <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuoteGenerator;
