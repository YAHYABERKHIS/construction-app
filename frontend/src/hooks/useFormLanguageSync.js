import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Clears validation errors when UI language changes so labels/messages stay in sync. */
export function useFormLanguageSync(clearErrors) {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (clearErrors) clearErrors();
  }, [i18n.language, clearErrors]);
}

export default useFormLanguageSync;
