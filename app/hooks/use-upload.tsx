import { useState } from "react"
import { z } from "zod"

import { showToast } from "@/app/utils/toast"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface UseUploadOptions {
  /** Maximum file size in bytes (default: 5MB) */
  maxSize?: number
  /** Allowed image MIME types (default: all image/*) */
  allowedTypes?: string[]
  /** Custom validation function */
  customValidator?: (file: File) => boolean | string
  /** Called when upload is successful with the result */
  onSuccess?: (result: File) => void
  /** Called when upload fails with the error message */
  onError?: (error: string) => void
}

interface UseUploadResult {
  status: UploadStatus
  previewUrl: string | null
  error: string | null
  isDragging: boolean
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragLeave: () => void
  handleDrop: (e: React.DragEvent) => void
  reset: () => void
}

/**
 * Custom hook for handling image uploads with validation
 * @param options Configuration options for the upload
 * @returns Upload state and handler functions
 */
export const useUpload = (options?: UseUploadOptions): UseUploadResult => {
  const {
    maxSize = 1 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/*"],
    customValidator,
    onSuccess,
    onError,
  } = options || {}

  const [status, setStatus] = useState<UploadStatus>("idle")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // Define the Zod schema for file validation
  const fileSchema = z.custom<File>(
    (file) => {
      if (!(file instanceof File)) {
        return "Not a valid file"
      }

      // Check file size
      if (file.size > maxSize) {
        return `File too large (max ${Math.round(maxSize / (1024 * 1024))}MB)`
      }

      // Check file type
      const isValidType = allowedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const mainType = type.split("/")[0]
          return file.type.startsWith(`${mainType}/`)
        }
        return file.type === type
      })

      if (!isValidType) {
        return "Invalid file type. Only images are allowed"
      }

      // Run custom validator if provided
      if (customValidator) {
        const customValidation = customValidator(file)
        if (typeof customValidation === "string") {
          return customValidation
        } else if (customValidation === false) {
          return "File failed custom validation"
        }
      }

      return true
    },
    {
      message: "Invalid file",
    },
  )

  /**
   * Validates a file using the Zod schema
   * @param file File to validate
   * @returns True if valid, error message if invalid
   */
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const result = fileSchema.safeParse(file)
    if (!result.success) {
      return { valid: false, error: result.error.message }
    }
    return { valid: true }
  }

  /**
   * Processes a file after validation
   * @param file File to process
   */
  const processFile = (file: File) => {
    const validation = validateFile(file)

    if (!validation.valid) {
      setStatus("error")
      setError(validation.error || "Invalid file")
      showToast.error(`Upload failed : ${validation.error}`)
      onError?.(validation.error || "Invalid file")
      return
    }

    setStatus("uploading")
    setError(null)

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreviewUrl(result)
      setStatus("success")
      onSuccess?.(file)
    }

    reader.onerror = () => {
      setStatus("error")
      setError("Failed to read file")
      showToast.error("Upload failed: Failed to read file")
      onError?.("Failed to read file")
    }

    reader.readAsDataURL(file)
  }

  /**
   * Handles file input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    processFile(file)
  }

  /**
   * Handles drag over event
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  /**
   * Handles drag leave event
   */
  const handleDragLeave = () => {
    setIsDragging(false)
  }

  /**
   * Handles drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    processFile(file)
  }

  /**
   * Resets the upload state
   */
  const reset = () => {
    setStatus("idle")
    setPreviewUrl(null)
    setError(null)
  }

  return {
    status,
    previewUrl,
    error,
    isDragging,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    reset,
  }
}
