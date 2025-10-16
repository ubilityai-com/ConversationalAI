/// <reference types="webpack-env" />

import { type ComponentType, useEffect, useState } from "react"
import { NodeConfigType } from "../lib/constants/node-types"
import {
  buildComponentPath
} from "../lib/constants/paths"
import { camelToDashCase } from "../lib/utils/utils"
import { ComponentLoaderResult } from "../types/node-types"


interface UseComponentLoaderProps {
  type: string
  category: string
  automationConfig?: string
}

/**
 * Custom hook to dynamically load node components and schemas
 */
export const useComponentLoader = ({
  type,
  category,
  automationConfig,
}: UseComponentLoaderProps): ComponentLoaderResult => {
  const [isLoading, setIsLoading] = useState(false)
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)
  const [CustomComponent, setCustomComponent] = useState<ComponentType<any> | null>(null)
  const [schema, setSchema] = useState<any | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Handle automated configuration
        if (automationConfig) {
          const module = require("../components/automated-template")
          setComponent(() => module.default)

          // Load schema
          const schemaModule = require(`../elements/${camelToDashCase(
            category
          )}-elements/${type}Json`)
          setSchema(schemaModule[`${type}Json`].defaults.json)

          // Load custom component for semi-automated
          if (automationConfig === NodeConfigType.SEMI_AUTOMATED) {
            const componentPath = buildComponentPath(category, type)

            try {
              const context = require.context("../components/right-side-elements", true, /\.tsx$/)
              const customModule = context(componentPath)
              setCustomComponent(() => customModule.default)
            } catch (err) {
              console.error("Failed to load custom component:", componentPath, err)
              setCustomComponent(null)
            }
          }
        } else {
          // Handle non-automated configuration
          const componentPath = buildComponentPath(category, type)

          try {
            const context = require.context("../components/right-side-elements", true, /\.tsx$/)
            const module = context(componentPath)
            setComponent(() => module.default)
          } catch (err) {
            console.error("Failed to load component:", componentPath, err)
            setComponent(null)
            setError(err instanceof Error ? err : new Error("Failed to load component"))
          }
        }
      } catch (err) {
        console.error("Component loading error:", err)
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setIsLoading(false)
      }
    }

    if (type && category) {
      loadComponent()
    }
  }, [type, category, automationConfig])

  return {
    Component,
    CustomComponent,
    schema,
    isLoading,
    error,
  }
}