import Image from "next/image"
import { ButtonHTMLAttributes, FC } from "react"

const GoogleButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      className="flex items-center px-4 py-2 font-bold border rounded border-slate-400 hover:bg-slate-100 active:bg-slate-200 datk:border-slate-700 dark:hover:bg-slate-900 dark:active:bg-slate-800 focus:outline-none"
      {...props}
    >
      <div className="mr-2">
        <Image
          width={24}
          height={24}
          src="/images/icons/google.svg"
          alt="google"
        />
      </div>
      <span>เข้าสู่ระบบด้วย Google</span>
    </button>
  )
}

export default GoogleButton
