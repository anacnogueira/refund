import { type Icon as IconProps } from "@phosphor-icons/react";
import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";


const buttonVariants = tv({
   base: `
       p-3 w-fit rounded-lg transition-all cursor-pointer
       enabled:hover:bg-green-200 bg-green-100`,
    variants: {
    disabled: {
        true: 'opacity-50 cursor-not-allowed',
    }
    },
    defaultVariants: {
        disabled: false
    }
})

const iconVariants = tv({
    base: 'size-6 fill-white'
});

interface ButtonIconProps 
    extends VariantProps<typeof buttonVariants>, 
    ComponentProps<"button"> {
    icon: IconProps
}

export default function ButtonIcon({
    className,
    disabled,
    children,
    icon: Icon,
    ...props
}: ButtonIconProps) {
    return (
        <button
            disabled={disabled}
            className={buttonVariants({ className, disabled })}
            {...props}
        >
            <Icon className={iconVariants()} />
            {children}
        </button>
    )
}