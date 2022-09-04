import { Auth } from "@supabase/ui"
import { useRouter } from "next/router"
import { FC, PropsWithChildren, useEffect } from "react"

const LoginLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const router = useRouter()
  const { user } = Auth.useUser()

  useEffect(() => {
    if (user && user.email?.endsWith("@kmitl.ac.th")) {
      router.push("/")
    }
  }, [router, user])

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-screen select-none">
      {children}
    </div>
  )
}

export default LoginLayout
