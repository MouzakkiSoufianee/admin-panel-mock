import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { DEFAULT_LOCALE, Locale, localesSlugs } from "@/app/config/constants/i18n"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isClientSide = () => typeof window !== "undefined"
export const isServerSide = () => typeof window === "undefined"

export const appendSearchParams = (currentSearchParams: URLSearchParams, params: Record<string, string>) => {
  const newSearchParams = new URLSearchParams(currentSearchParams.toString())
  Object.entries(params).forEach(([key, value]) => {
    newSearchParams.set(key, value)
  })
  return newSearchParams
}

export const removeLocaleFromPathname = (pathname: string) => {
  for (const locale of localesSlugs) {
    // Check for exact locale match (e.g., "/fr" or "/en")
    if (pathname === `/${locale}`) {
      return "/"
    }
    // Check for locale prefix (e.g., "/fr/dashboard" -> "/dashboard")
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, "")
    }
  }

  return pathname
}

export const prefixPathWithLocale = (url: string, locale: Locale = DEFAULT_LOCALE) => {
  const isFullUrl = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
  if (isFullUrl) {
    return url
  }
  const pathnameIsMissingLocale = Object.keys(localesSlugs).every(
    (locale) => !url.startsWith(`/${locale}/`) && url !== `/${locale}`,
  )
  return pathnameIsMissingLocale ? `/${locale}${url}` : url
}

export const getCurrentLocaleFromPathname = (): Locale => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE
  }

  const pathname = window.location.pathname
  for (const locale of localesSlugs) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale as Locale
    }
  }
  return DEFAULT_LOCALE
}

/**
 * Transforms a payload object to FormData with explicit file handling
 *
 * @param payload - The payload object to transform (supports nested objects and arrays, excludes File objects)
 * @param fileFieldMap - Required mapping of field names to File arrays for file uploads
 * @returns FormData object
 *
 * @example
 * const payload = { email: 'john@example.com', tags: ['developer', 'designer'], preferences: { theme: 'dark', notifications: true } }
 * const formData = transformToFormData(payload, {
 *   profileImage: [avatarFile],
 *   attachments: [doc1, doc2]
 * })
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformToFormData = (payload: Record<string, any>, fileFieldMap?: Record<string, File[]>): FormData => {
  const formData = new FormData()

  /**
   * Recursively processes values and adds them to FormData
   * @param value - The value to process
   * @param key - The current key/path
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processValue = (value: any, key: string) => {
    if (value === undefined || value === null) {
      return
    }

    // Skip File objects - they should only be handled via fileFieldMap
    if (value instanceof File || value instanceof FileList) {
      return
    }

    // Handle Arrays
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return
      }

      value.forEach((item, index) => {
        // Skip File objects in arrays - they should only be handled via fileFieldMap
        if (item instanceof File || item instanceof FileList) {
          return
        }

        if (typeof item === "object" && item !== null) {
          processValue(item, `${key}[${index}]`)
        } else {
          formData.append(`${key}[${index}]`, String(item))
        }
      })

      return
    }

    // Handle Objects (but not File, Date, FileList, or other special objects)
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date) &&
      !(value instanceof File) &&
      !(value instanceof FileList)
    ) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        processValue(nestedValue, `${key}[${nestedKey}]`)
      })
      return
    }

    // Handle primitive values (string, number, boolean)
    if (value !== "") {
      formData.append(key, String(value))
    }
  }

  // Process main payload
  Object.entries(payload).forEach(([key, value]) => {
    processValue(value, key)
  })

  // Add files from fileFieldMap if provided
  if (fileFieldMap) {
    Object.entries(fileFieldMap).forEach(([fieldName, files]) => {
      if (files && files.length > 0) {
        files.forEach((file, index) => {
          if (files.length === 1) {
            formData.append(fieldName, file)
          } else {
            formData.append(`${fieldName}[${index}]`, file)
          }
        })
      }
    })
  }

  return formData
}

// TODO: use dayjs package instead
export const formatTime = (time: string) => {
  const date = new Date(time)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Formats a date string to JJ/MM/AAAA format (Jour/Mois/Année) with Africa/Casablanca timezone
 * Example: "2025-11-07" => "07/11/2025"
 * @param dateString - ISO date string or any valid date string
 * @param timezone - Timezone to use (default: "Africa/Casablanca")
 * @returns Formatted date string in DD/MM/YYYY format
 */
export const formatDateDDMMYYYY = (
  dateString: string | null | undefined,
  timezone: string = "Africa/Casablanca",
): string => {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""

    // Get date parts with the specified timezone
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: timezone,
    })

    // en-GB format is DD/MM/YYYY by default
    return formatter.format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}

/**
 * Project status type definition
 */
export type ProjectStage =   "Onboarding" | "Engagement" | "Training"  | "Pre-Onboarding"

/**
 * Status colors mapping for project statuses
 * Returns background, text, and badge colors for each status
 */
export const PROJECT_STAGE_COLORS: Record<ProjectStage, { bg: string; text: string; badge: string }> = {
  Onboarding: { bg: "bg-[#E3E3FE]", text: "text-[#7570F2]", badge: "bg-purple-50" },
  Engagement: { bg: "bg-[#CFF0E8]", text: "text-[#378874]", badge: "bg-emerald-50" },
  Training: { bg: "bg-[#F4E8FF]", text: "text-[#A855F7]", badge: "bg-pink-50" },
  "Pre-Onboarding": { bg: "bg-[#FFEAF0]", text: "text-[#A855F7]", badge: "bg-red-50" },

}

/**
 * Gets the color classes for a given project status
 * @param status - The project status
 * @returns Object containing bg, text, and badge color classes
 * @example
 * const colors = getProjectStatusColors("Active")
 * // { bg: "bg-blue-100", text: "text-blue-700", badge: "bg-blue-50" }
 */
export const getProjectStageColors = (status: ProjectStage | string) => {
  return PROJECT_STAGE_COLORS[status as ProjectStage]
}
