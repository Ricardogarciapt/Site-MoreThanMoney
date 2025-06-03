"use client"

import dynamic from "next/dynamic"

const SiteSettingsClient = dynamic(() => import("./site-settings-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <SiteSettingsClient />
}
