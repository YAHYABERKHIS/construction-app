import React from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

const LanguageSwitcher = ({ className = "", fixed = false }) => {
  const { t, i18n } = useTranslation();

  const currentLang =
    LANGUAGES.find((l) => i18n.language?.startsWith(l.code))?.code || "fr";

  return (
    <div
      className={`lang-switcher-wrap ${fixed ? "lang-switcher-fixed" : ""} ${className}`.trim()}
    >
      <label htmlFor="site-language" className="visually-hidden">
        {t("nav.language")}
      </label>
      <select
        id="site-language"
        className="nav-lang-select"
        value={currentLang}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("nav.language")}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
