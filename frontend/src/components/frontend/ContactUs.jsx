import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contact-now`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        reset();
      } else {
        toast.error(responseData.error.slug[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <section className="section-7">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-start">
              <span>{t('common.quality_tag')}</span>
              <h1 dangerouslySetInnerHTML={{ __html: t('contact_page.title') }}></h1>
              <p dangerouslySetInnerHTML={{ __html: t('contact_page.subtitle') }}></p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-10 py-5">
        <div className="container">
          <div className="section-header text-center">
            <span>{t('contact_page.section_tag')}</span>
            <h2>{t('contact_page.section_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('contact_page.section_desc') }}></p>
          </div>
          <div className="row mt-5">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3>{t('contact_page.call_us')}</h3>
                  <div>
                    <a href="tel:+212665757519">0665757519</a>
                  </div>
                  <h3 className="mt-4">{t('contact_page.write_us')}</h3>
                  <div>
                    <a href="mailto:ghanisakan@gmail.com">ghanisakan@gmail.com</a>
                  </div>
                  <h3 className="mt-4">{t('contact_page.address')}</h3>
                  <div>
                    71 BLOC 44 HAY ZOUHOUR SAFI
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          {t('contact_page.name')}
                        </label>
                        <input
                          type="text"
                          placeholder={t('contact_page.name_ph')}
                          className={`form-control form-control-lg ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          {...register("name", {
                            required: t('contact_page.name_req'),
                          })}
                        />
                        {errors.name && (
                          <p className="invalid-feedback">
                            {errors?.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          {t('contact_page.email')}
                        </label>
                        <input
                          type="email"
                          className={`form-control form-control-lg ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          {...register("email", {
                            required: t('contact_page.email_req'),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t('contact_page.email_invalid'),
                            },
                          })}
                          placeholder={t('contact_page.email_ph')}
                        />
                        {errors.name && (
                          <p className="invalid-feedback">
                            {errors?.name?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          {t('contact_page.phone')}
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder={t('contact_page.phone_ph')}
                          {...register("phone")}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          {t('contact_page.subject')}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder={t('contact_page.subject_ph')}
                          {...register("subject")}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="form-label">
                        {t('contact_page.message')}
                      </label>
                      <textarea
                        name=""
                        id=""
                        rows={5}
                        placeholder={t('contact_page.message_ph')}
                        className="form-control form-control-lg"
                        {...register("message")}
                      ></textarea>
                    </div>
                    <button
                      className="btn btn-primary large-btn mt-3"
                      disabled={loading}
                    >
                      {loading ? t('contact_page.sending') : t('contact_page.send')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
