import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const skeletonVariants = tv({
    base: "animate-pulse bg-gray-300 pointer-events-none rounded-sm text-transparent"
})


interface SkeletonProps extends 
    VariantProps<typeof skeletonVariants>,
ComponentProps<"div"> {
    className?: string;
}

export default function Skeleton({
    className,
    ...props
}: SkeletonProps) {
    return (
        <div
            className={skeletonVariants({ className })}
            {...props}
        />
    
    );
}