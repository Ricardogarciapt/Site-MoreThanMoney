"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Adicionar suporte para acesso à base de dados no Card principal

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    dataSource?: string
    dataId?: string
    onDataLoad?: (data: any) => void
    onDataSave?: (data: any) => Promise<void>
  }
>(({ className, dataSource, dataId, onDataLoad, onDataSave, ...props }, ref) => {
  const [data, setData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Efeito para carregar dados quando dataSource e dataId estão presentes
  React.useEffect(() => {
    if (dataSource && dataId) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/${dataSource}/${dataId}`)
          if (!response.ok) throw new Error("Falha ao carregar dados")

          const result = await response.json()
          setData(result.data || result)
          if (onDataLoad) onDataLoad(result.data || result)
        } catch (error) {
          console.error("Erro ao carregar dados:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [dataSource, dataId, onDataLoad])

  // Função para salvar dados
  const handleSave = async (formData: any) => {
    if (!dataSource || !onDataSave) return

    setIsLoading(true)
    try {
      const method = dataId ? "PUT" : "POST"
      const url = dataId ? `/api/${dataSource}/${dataId}` : `/api/${dataSource}`

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, ...formData }),
      })

      if (!response.ok) throw new Error("Falha ao salvar dados")

      const result = await response.json()
      setData(result.data || result)
      if (onDataSave) await onDataSave(result.data || result)
    } catch (error) {
      console.error("Erro ao salvar dados:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Contexto para compartilhar dados com componentes filhos
  const cardContext = {
    data,
    isLoading,
    save: handleSave,
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm relative",
        isLoading ? "opacity-90" : "",
        className,
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onDataLoad?: (data: any) => void
    dataSource?: string
    dataId?: string
  }
>(({ className, onDataLoad, dataSource, dataId, ...props }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)

  // Efeito para carregar dados quando dataSource e dataId estão presentes
  React.useEffect(() => {
    if (dataSource && dataId) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          // Carregar dados com base no dataSource
          let endpoint = ""
          switch (dataSource) {
            case "members":
              endpoint = `/api/members/${dataId}`
              break
            case "ideas":
              endpoint = `/api/trading-ideas/${dataId}`
              break
            default:
              endpoint = `/api/${dataSource}/${dataId}`
          }

          const response = await fetch(endpoint)
          if (!response.ok) throw new Error("Falha ao carregar dados")

          const data = await response.json()
          if (onDataLoad) onDataLoad(data)
        } catch (error) {
          console.error("Erro ao carregar dados:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [dataSource, dataId, onDataLoad])

  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", isLoading ? "opacity-70" : "", className)} {...props}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
          <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {props.children}
    </div>
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight cursor-pointer", className)}
      {...props}
    />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    dataSource?: string
    dataFilter?: Record<string, any>
    onDataLoad?: (data: any[]) => void
  }
>(({ className, dataSource, dataFilter, onDataLoad, ...props }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)

  // Efeito para carregar dados quando dataSource está presente
  React.useEffect(() => {
    if (dataSource) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          // Construir URL com filtros
          let url = `/api/${dataSource}`
          if (dataFilter && Object.keys(dataFilter).length > 0) {
            const params = new URLSearchParams()
            Object.entries(dataFilter).forEach(([key, value]) => {
              params.append(key, String(value))
            })
            url += `?${params.toString()}`
          }

          const response = await fetch(url)
          if (!response.ok) throw new Error("Falha ao carregar dados")

          const result = await response.json()
          const data = result[dataSource] || result.items || result.data || []

          if (onDataLoad) onDataLoad(data)
        } catch (error) {
          console.error("Erro ao carregar dados:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [dataSource, dataFilter, onDataLoad])

  return (
    <div ref={ref} className={cn("p-6 pt-0", isLoading ? "opacity-70" : "", className)} {...props}>
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {props.children}
    </div>
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    showBackButton?: boolean
    onBack?: () => void
    backButtonText?: string
    onSave?: (data: any) => Promise<void>
    saveButtonText?: string
    formId?: string
  }
>(
  (
    {
      className,
      showBackButton,
      onBack,
      backButtonText = "Voltar",
      onSave,
      saveButtonText = "Salvar",
      formId,
      ...props
    },
    ref,
  ) => {
    const [isSaving, setIsSaving] = React.useState(false)

    const handleSave = async () => {
      if (!onSave) return

      setIsSaving(true)
      try {
        await onSave({})
      } catch (error) {
        console.error("Erro ao salvar:", error)
      } finally {
        setIsSaving(false)
      }
    }

    return (
      <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props}>
        {showBackButton && (
          <button
            onClick={onBack}
            className="mr-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            type="button"
          >
            ← {backButtonText}
          </button>
        )}
        {props.children}
        {onSave && (
          <button
            onClick={handleSave}
            form={formId}
            type={formId ? "submit" : "button"}
            disabled={isSaving}
            className="ml-auto px-4 py-2 text-sm font-medium text-black bg-gold-500 hover:bg-gold-600 rounded-md transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Salvando...
              </span>
            ) : (
              saveButtonText
            )}
          </button>
        )}
      </div>
    )
  },
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
