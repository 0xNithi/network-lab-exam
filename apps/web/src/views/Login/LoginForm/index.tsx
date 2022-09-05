import { FC, useCallback } from "react"
import { NetworkLabIcon } from "ui"

import { supabase } from "../../../utils/supabase"
import GoogleButton from "./GoogleButton"

const LoginForm: FC = () => {
  const handleSignInGoogle = useCallback(async () => {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login` }
    )
  }, [])

  return (
    <>
      <div className="flex flex-col bg-blue-600 border border-blue-400 rounded-lg dark:border-slate-600">
        <NetworkLabIcon className="p-2 text-white" />
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4 bg-white rounded-b-lg dark:bg-slate-800">
          <div className="text-xl font-bold">กรุณาเข้าสู่ระบบ</div>
          <GoogleButton onClick={handleSignInGoogle} />
        </div>
      </div>
      <div className="my-2">
        <span className="text-red-500">*</span> หมายเหตุ:
        ใช้อีเมลสถาบันในการเข้าสู่ระบบเท่านั้น (@kmitl.ac.th)
      </div>
    </>
  )
}

export default LoginForm
