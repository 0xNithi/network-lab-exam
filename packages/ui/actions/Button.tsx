import classNames from "classnames"
import {
  ButtonHTMLAttributes,
  FC,
  ForwardedRef,
  forwardRef,
  LegacyRef,
} from "react"

export const Button = forwardRef<
  ForwardedRef<ButtonHTMLAttributes<HTMLButtonElement>>,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(props, ref) {
  const { className, children, type = "button", ...rest } = props
  return (
    <button
      ref={ref as LegacyRef<HTMLButtonElement>}
      className={classNames(
        "flex items-center justify-center p-2.5 transition duration-200 ease-in-out dark:bg-slate-800 transform bg-white rounded-full focus:outline-none hover:scale-105 active:scale-95",
        className
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
})
