import { AlertDialog } from "radix-ui";
import { twMerge } from "tailwind-merge";
import Button from "./button";

export function ConfirmAlertDialogRoot({
    children,
    ...props
}: AlertDialog.AlertDialogProps) {
    return (
        <AlertDialog.Root {...props}>           
           {children}
        </AlertDialog.Root>
    );
}

export function ConfirmAlertDialogTrigger({
    className,
    children,
    ...props
}: AlertDialog.AlertDialogTriggerProps) {
    return (
        <AlertDialog.Trigger className={className} asChild {...props}>
            {children}
        </AlertDialog.Trigger>
    )
}

export function ConfirmAlertDialogPortal({
    children,
    ...props
}: AlertDialog.AlertDialogPortalProps) {
    return (
        <AlertDialog.Portal {...props}>
            {children}
        </AlertDialog.Portal>
    )
}

export function ConfirmAlertDialogOverlay({
    className,
    ...props
}: AlertDialog.AlertDialogOverlayProps ) {
    return (
        <AlertDialog.Overlay 
            className={twMerge(
                'fixed inset-0 bg-gray-100/80 data-[state=open]:animate-overlayShow',
                className)} 
            {...props} 
        />
    )
}

export function ConfirmAlertDialogContent({
    children,
    className,
    ...props
}: AlertDialog.AlertDialogContentProps) {
    return (
        <AlertDialog.Content 
            className={twMerge(
                `fixed left-1/2 top-1/2 max-h-56
                w-full max-w-lg -translate-x-1/2 -translate-y-1/2
                rounded-2xl bg-gray-500 p-10 focus:outline-none 
                data-[state=open]:animate-contentShow                   
                `,
                className
            )}
            {...props}
        >
            {children}
        </AlertDialog.Content>
    )
}

export function ConfirmAlertDialogTitle({
    className,
    children,
    ...props
}: AlertDialog.AlertDialogTitleProps) {
    return (
        <AlertDialog.Title 
            className={twMerge("font-bold text-xl text-gray-100", className)}
            {...props}
        >
            {children}
        </AlertDialog.Title>
    )
}

export function ConfirmAlertDialogDescription({
    className,
    children,
    ...props
}: AlertDialog.AlertDialogDescriptionProps) {
    return(
        <AlertDialog.Description
            className={twMerge("text-sm text-gray-200", className)}
            {...props}
        >
            {children}
        </AlertDialog.Description>
    );
}

export function ConfirmAlertDialogCancel({
    className,
    children,
    ...props
}: AlertDialog.AlertDialogCancelProps) {
    return (
        <AlertDialog.Cancel 
            className={className}
            asChild
            {...props}
        >
            <Button variant="outline">{children}</Button>        
        </AlertDialog.Cancel>
    )
}

export function ConfirmAlertDialogAction({
    className,
    children,
    ...props
}: AlertDialog.AlertDialogActionProps) {
    return (
        <AlertDialog.Action 
            className={className}
            asChild
            {...props}
        >
            <Button variant="primary">{children}</Button>
        </AlertDialog.Action>
    )
}
