import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"
import { prisma } from "@/server/db"

import { getCurrentUser } from "@/lib/session"
import AddProfileForm from "@/components/form/add-profile-form"

export const metadata: Metadata = {
  title: "Add Profile",
  description: "Add a new profile",
}

export default async function AddProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login")
  }

  const profiles = await prisma.profile.findMany({
    where: {
      userId: user.id,
    },
  })

  const icons = await prisma.icon.findMany()
  const icon =
    icons[Math.floor(Math.random() * icons.length)] ??
    (await prisma.icon.findFirst())

  return (
    <section className="w-full">
      {profiles && icon && <AddProfileForm profiles={profiles} icon={icon} />}
    </section>
  )
}