"use client"

import { useState, useEffect } from "react"
import { generateQRCodeSVG } from "@/lib/qrcode"
import { Loader2 } from "lucide-react"

interface QRCodeProps {
  value: string
  size?: number
}

export function QRCode({ value, size = 200 }: QRCodeProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateCode = async () => {
      setIsLoading(true)
      try {
        const svg = await generateQRCodeSVG(value)
        setQrCode(svg)
      } catch (error) {
        console.error("Error generating QR code:", error)
      } finally {
        setIsLoading(false)
      }
    }

    generateCode()
  }, [value])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!qrCode) {
    return (
      <div className="flex items-center justify-center bg-muted" style={{ width: size, height: size }}>
        <p className="text-xs text-muted-foreground">QR code generation failed</p>
      </div>
    )
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: qrCode }} style={{ width: size, height: size }} className="rounded-md" />
  )
}

