import { WifiIcon } from "@heroicons/react/24/solid"
import { FC } from "react"

interface NetworkLabIconProps {
  className?: string
}

export const NetworkLabIcon: FC<NetworkLabIconProps> = ({ className }) => {
  return (
    <div
      className={`flex flex-col items-center select-none${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="inline-flex text-2xl italic font-bold">
        Netw
        <WifiIcon className="w-8 ml-1 fill-current" />
        rk
      </div>
      <div className="text-xs font-bold">Laboratory</div>
    </div>
  )
}
