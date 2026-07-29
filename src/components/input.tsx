import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";


const inputLabelVariants = tv({
    base: `
        relative text-gray-200 focus-within:text-green-100 
        focus-within:font-bold text-2xs transition-all uppercase 
        flex flex-col gap-2
    `
});

const inputVariants = tv({
    base:`
        rounded-lg text-gray-100 transition-all placeholder:text-gray-200
        border font-normal outline-none border-gray-300 h-12 
        focus-within:border-green-100 caret-green-100 py-4 pl-4 text-sm
    `
});
interface InputProps extends ComponentProps<"input"> {
    labelText?: string;
    error?: string;
    className?: string;
}

export default function Input({
    labelText,
    error,
    className,
    ...props
}: InputProps) {
    return (
        <label className={inputLabelVariants({ className })}>
            {labelText}
            <input 
                type="text"
                className={ inputVariants()}
                {...props}
            />
            { error && (
                <span
                    className="absolute normal-case bottom-0 left-0 translate-y-full text-sm font-medium text-green-100"
                >
                    {error}
                </span>
            )}

        </label>
    );
}