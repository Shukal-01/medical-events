"use client"

import { useState, useEffect } from "react"
import { generateQRCode } from "@/lib/qrcode"
import { Loader2 } from "lucide-react"

interface QRCodeGeneratorProps {
  data: string
  size?: number
}

export function QRCodeGenerator({ data, size = 200 }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateCode = async () => {
      setIsLoading(true)
      try {
        const url = await generateQRCode(data)
        setQrCodeUrl(url)
      } catch (error) {
        console.error("Error generating QR code:", error)
      } finally {
        setIsLoading(false)
      }
    }

    generateCode()
  }, [data])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!qrCodeUrl) {
    return (
      <div className="flex items-center justify-center bg-muted" style={{ width: size, height: size }}>
        <p className="text-xs text-muted-foreground">QR code generation failed</p>
      </div>
    )
  }

  return <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={size} height={size} className="rounded-md" />
}

