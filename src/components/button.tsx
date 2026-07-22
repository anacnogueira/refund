import { Slot } from "radix-ui";
import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
    base: `
        flex items-center gap-2 justify-center py-4
        px-5 w-full rounded-lg font-bold text-sm
        transition-all
    `,
    variants: {
        disabled: {
            true: 'opacity-50 cursor-not-allowed'
        },
        variant: {
            primary: "bg-green-100 hover:bg-green-200 disabled:hover:bg-green-100 text-white",
            outline: `
                bg-transparent border transition-colors border-transparent hover:border-green-200
                disabled:hover:border-transparent hover:text-green-200
                disabled:hover:text-green-100 text-green-100
            `,
        }
    },
    defaultVariants: {
        disabled: false,
        variant: "primary",
    },
})

interface ButtonProps extends 
VariantProps<typeof buttonVariants>,
ComponentProps<"button">{
    asChild?: boolean
}

export default function Button({
    className,
    disabled,
    variant,
    asChild = false,
    children,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot.Root : "button";
    const propsWithDisabled = {...props, disabled};

    return (
        <Comp
            className={buttonVariants({ className, disabled, variant })}
            {...propsWithDisabled}
        >
            {children}
        </Comp>
    )
}