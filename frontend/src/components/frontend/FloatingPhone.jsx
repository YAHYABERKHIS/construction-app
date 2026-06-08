import React from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const FloatingPhone = () => {
  const { t } = useTranslation();

  return (
    <a href="tel:0665757519" className="floating-phone" aria-label={t("floating.call_us")}>
      <Phone size={28} />
    </a>
  );
};

export default FloatingPhone;
