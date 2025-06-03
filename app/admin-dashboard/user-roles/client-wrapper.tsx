"use client"

import dynamic from "next/dynamic"

const UserRolesClient = dynamic(() => import("./user-roles-client"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <UserRolesClient />
}
