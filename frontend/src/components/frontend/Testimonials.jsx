import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AvatarImg from "../../assets/images/author-2.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FiveStar from "../FiveStar";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchLatestTestimonials = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/get-testimonials`
        );
        const result = await response.json();
        setTestimonials(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTestimonials();
  }, []);

  const handlePrevSlide = () => swiperRef.current?.slidePrev();
  const handleNextSlide = () => swiperRef.current?.slideNext();

  const canLoop = testimonials.length > 3;

  return (
    <section className="section-5 py-5 position-relative">
      <Container>
        <div className="section-header text-center mb-5">
          <span>{t("testimonials.tag")}</span>
          <h2>{t("testimonials.title")}</h2>
          <p>{t("testimonials.desc")}</p>
        </div>

        {loading ? (
          <p className="text-center text-muted">{t("testimonials.loading")}</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-muted">{t("testimonials.empty")}</p>
        ) : (
          <div className="testimonials-carousel position-relative">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="testimonials-nav testimonials-nav-prev"
              aria-label={t("testimonials.prev")}
            >
              <ChevronLeft size={22} />
            </button>

            <Swiper
              modules={[Pagination, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={24}
              slidesPerView={1}
              loop={canLoop}
              autoplay={
                testimonials.length > 1
                  ? { delay: 4000, disableOnInteraction: false }
                  : false
              }
              pagination={{ clickable: true }}
              breakpoints={{
                576: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                992: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <article className="card shadow border-0 h-100 testimonial-card">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="rating mb-2">
                        <FiveStar />
                      </div>
                      <blockquote className="content flex-grow-1 mb-3">
                        <p className="mb-0">"{testimonial.testimonial}"</p>
                      </blockquote>
                      <hr className="my-3" />
                      <div className="d-flex align-items-center meta">
                        <img
                          src={
                            testimonial?.image
                              ? `${import.meta.env.VITE_FILE_URL}/uploads/testimonials/small/${testimonial.image}`
                              : AvatarImg
                          }
                          alt={testimonial.citation || t("testimonials.client")}
                          width={50}
                          height={50}
                          className="rounded-circle object-fit-cover flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = AvatarImg;
                          }}
                        />
                        <div className="ps-3 min-w-0">
                          <div className="name fw-semibold text-truncate">
                            {testimonial.citation}
                          </div>
                          {testimonial.designation && (
                            <div className="small text-muted text-truncate d-block">
                              {testimonial.designation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              onClick={handleNextSlide}
              className="testimonials-nav testimonials-nav-next"
              aria-label={t("testimonials.next")}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Testimonials;
