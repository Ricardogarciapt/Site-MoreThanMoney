"use client"

import dynamic from "next/dynamic"

const CoursesManagerClient = dynamic(() => import("./courses-manager-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <CoursesManagerClient />
}
