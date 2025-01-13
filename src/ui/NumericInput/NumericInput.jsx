import * as React from "react"
import { Input, IconButton } from "@material-tailwind/react";
// import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}) {
 
  return (
    <div className={`relative w-full ${className}`}>
      <Input
        type="number"
        disabled={disabled}
        className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        {...props}
      />
      <div className="absolute right-1 top-1 flex gap-0.5">
        <IconButton
          size="sm"
          variant="text"
          className="rounded"
          onClick={onIncrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </IconButton>
        <IconButton
          size="sm"
          variant="text"
          className="rounded"
          onClick={onDecrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
  //   <div className={wrap}>
  //     <input
  //       disabled={disabled}
  //       type="numeric"
  //       className={[input, className].join(" ")}
  //       {...props}
  //     />
  //     <button
  //       disabled={disabled}
  //       className={increment}
  //       aria-label="Increment"
  //       onClick={onIncrement}
  //     >
  //       <span>+</span>
  //       <MdArrowDropUp />
  //     </button>
  //     <button
  //       disabled={disabled}
  //       className={decrement}
  //       aria-label="Decrement"
  //       onClick={onDecrement}
  //     >
  //       <span>-</span>
  //       <MdArrowDropDown />
  //     </button>
  //   </div>
  // )
