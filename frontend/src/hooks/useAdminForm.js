import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useAdminForm() {
  const { t, i18n } = useTranslation();

  const form = useMemo(
    () => ({
      title: t("admin.form.title"),
      title_ph: t("admin.form.title_ph"),
      slug: t("admin.form.slug"),
      slug_ph: t("admin.form.slug_ph"),
      short_desc: t("admin.form.short_desc"),
      short_desc_ph: t("admin.form.short_desc_ph"),
      content: t("admin.form.content"),
      content_ph: t("admin.form.content_ph"),
      status: t("admin.form.status"),
      image: t("admin.form.image"),
      location: t("admin.form.location"),
      location_ph: t("admin.form.location_ph"),
      construction_type: t("admin.form.construction_type"),
      construction_type_ph: t("admin.form.construction_type_ph"),
      sector: t("admin.form.sector"),
      sector_ph: t("admin.form.sector_ph"),
      testimonial: t("admin.form.testimonial"),
      testimonial_ph: t("admin.form.testimonial_ph"),
      citation: t("admin.form.citation"),
      citation_ph: t("admin.form.citation_ph"),
      designation: t("admin.form.designation"),
      designation_ph: t("admin.form.designation_ph"),
      job_title: t("admin.form.job_title"),
      job_title_ph: t("admin.form.job_title_ph"),
      linkedin: t("admin.form.linkedin"),
      linkedin_ph: t("admin.form.linkedin_ph"),
      author: t("admin.form.author"),
      author_ph: t("admin.form.author_ph"),
      message: t("admin.form.message"),
      subject: t("admin.form.subject"),
      email: t("admin.form.email"),
      phone: t("admin.form.phone"),
      mark_read: t("admin.form.mark_read"),
      construction_residential: t("admin.form.construction_residential"),
      construction_commercial: t("admin.form.construction_commercial"),
      construction_industrial: t("admin.form.construction_industrial"),
      construction_infrastructure: t("admin.form.construction_infrastructure"),
      sector_health: t("admin.form.sector_health"),
      sector_education: t("admin.form.sector_education"),
      sector_corporate: t("admin.form.sector_corporate"),
      member_name: t("admin.name"),
      member_name_ph: t("admin.form.title_ph"),
      received_at: t("admin.form.received_at"),
      message_new: t("admin.form.message_new"),
      message_read: t("admin.form.message_read"),
      load_error: t("admin.form.load_error"),
      creating: t("admin.form.creating"),
      saving: t("admin.form.saving"),
      search_ph: t("admin.form.search_ph"),
      per_page_5: t("admin.form.per_page_5"),
      per_page_10: t("admin.form.per_page_10"),
      per_page_25: t("admin.form.per_page_25"),
      per_page_50: t("admin.form.per_page_50"),
      prev_page: t("admin.form.prev_page"),
      next_page: t("admin.form.next_page"),
      no_services: t("admin.form.no_services"),
      no_services_match: t("admin.form.no_services_match"),
      no_projects: t("admin.form.no_projects"),
      no_projects_match: t("admin.form.no_projects_match"),
      no_articles: t("admin.form.no_articles"),
      no_articles_match: t("admin.form.no_articles_match"),
      no_members: t("admin.form.no_members"),
      no_members_match: t("admin.form.no_members_match"),
      no_messages: t("admin.form.no_messages"),
      no_messages_match: t("admin.form.no_messages_match"),
    }),
    [t, i18n.language]
  );

  const validation = useMemo(
    () => ({
      title_required: t("admin.form.title_required"),
      slug_required: t("admin.form.slug_required"),
      location_required: t("admin.form.location_required"),
      construction_type_required: t("admin.form.construction_type_required"),
      sector_required: t("admin.form.sector_required"),
      testimonial_required: t("admin.form.testimonial_required"),
      citation_required: t("admin.form.citation_required"),
      designation_required: t("admin.form.designation_required"),
      author_required: t("admin.form.author_required"),
      job_title_required: t("admin.form.job_title_required"),
      linkedin_required: t("admin.form.linkedin_required"),
      member_name_required: t("admin.form.title_required"),
    }),
    [t, i18n.language]
  );

  const statusOptions = useMemo(
    () => ({
      active: t("admin.active"),
      blocked: t("admin.blocked"),
    }),
    [t, i18n.language]
  );

  const actions = useMemo(
    () => ({
      create: t("admin.create"),
      edit: t("admin.edit"),
      save: t("admin.save"),
      back: t("admin.back"),
    }),
    [t, i18n.language]
  );

  return { t, form, validation, actions, statusOptions, language: i18n.language };
}

export default useAdminForm;
