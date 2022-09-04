import { Auth } from "@supabase/ui"
import { useRouter } from "next/router"
import { useEffect } from "react"

const useRedirectAuth = () => {
  const router = useRouter()
  const { user } = Auth.useUser()

  useEffect(() => {
    if (!user || !user.email?.endsWith("@kmitl.ac.th")) {
      router.push("/login")
    }
  }, [router, user])
}

export default useRedirectAuth
