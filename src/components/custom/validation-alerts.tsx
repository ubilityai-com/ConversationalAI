import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"

interface ValidationAlertsProps {
  hasMinSizeError: boolean
  hasRequiredError: boolean
  minSize?: number
  title: string
  errorSpan?: string
}

/**
 * Validation error and warning alerts
 */
export function ValidationAlerts({
  hasMinSizeError,
  hasRequiredError,
  minSize,
  title,
  errorSpan,
}: ValidationAlertsProps) {
  if (!hasMinSizeError && !hasRequiredError) {
    return null
  }

  return (
    <>
      {hasMinSizeError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{errorSpan || `Minimum ${minSize} ${title.toLowerCase()} required`}</AlertDescription>
        </Alert>
      )}

      {hasRequiredError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>This field is required. Please add at least one {title.toLowerCase()}.</AlertDescription>
        </Alert>
      )}
    </>
  )
}
