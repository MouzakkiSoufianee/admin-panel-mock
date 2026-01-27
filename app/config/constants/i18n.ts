export const LOCALES = { FR: "fr", EN: "en" } as const
export const DEFAULT_LOCALE = LOCALES.FR

export type Locale = (typeof LOCALES)[keyof typeof LOCALES]

export type I18nConfig = {
  defaultLocale: Locale
  locales: { locale: Locale; label: string }[]
}

export const i18n: I18nConfig = {
  defaultLocale: "fr",
  locales: [
    {
      locale: "en",
      label: "English",
    },
    {
      locale: "fr",
      label: "Français",
    },
  ],
} as const

export const localesSlugs = i18n.locales.map((item) => item.locale)
