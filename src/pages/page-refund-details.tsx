import type { ComponentProps } from "react";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";
import Skeleton from "../components/skeleton";
import Input from "../components/input";
import SelectInput from "../components/select-input";
import { categoryOptions } from "../contexts/refunds/helpers";
import Button from "../components/button";
import { FileIcon } from "@phosphor-icons/react";
import { ConfirmAlertDialogAction, ConfirmAlertDialogCancel, ConfirmAlertDialogContent, ConfirmAlertDialogDescription, ConfirmAlertDialogOverlay, ConfirmAlertDialogPortal, ConfirmAlertDialogRoot, ConfirmAlertDialogTitle, ConfirmAlertDialogTrigger } from "../components/confirm-dialog";
import useRefund from "../contexts/refunds/hooks/use-refund";
import { useRefundReceipt } from "../contexts/refunds/hooks/use-refund-receipt";

export default function PageRefundDetails() {
    const { id } = useParams();
    const { refund, isLoading, isDeleting } = useRefund(id);
    const { fetchRefundReceipt, isLoading: isLoadingReceipt} = useRefundReceipt();
    

    async function handleOpenReceipt() {
        if(refund?.receipt.id) {
            const { url } = await fetchRefundReceipt(refund.receipt.id);
            window.open(`${import.meta.env.VITE_API_URL}${url}`, "_blank");
        }
    }

    return (
        <div className="rounded-2xl bg-gray-500 max-w-lg mx-auto p-10 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
                <h1 className="font-bold text-xl text-gray-100">
                    Solicitação de reembolso
                </h1>
                <span className="text-sm text-gray-200">
                    Dados da despesa para solicitar reembolso
                </span>                    
            </div>

            <div className="flex flex-col gap-8">
                {
                    isLoading ? (
                        <InputSkeleton labelText="Nome da Solicitação"/>
                    ) : (
                        refund && (
                            <Input
                                readOnly
                                name="name"
                                value={refund.title}
                                labelText="Nome da Solicitação"
                            />
                        )
                )}

                <div className="flex items-center gap-4">
                    { isLoading ? (
                        <InputSkeleton labelText="Categoria"/>
                    ) : (
                        refund && (
                            <SelectInput
                                labelText="Categoria"
                                name="category"
                                options={categoryOptions}
                                value={refund.category}
                                open={false}
                           />
                        )
                    )}

                    {isLoading ? (
                        <InputSkeleton 
                            labelText="Valor"
                            containerProps={{ className: "max-w-[154px]"}}
                        />
                    ) : (
                        refund && (
                            <Input
                                labelText="Valor"
                                type="number"
                                step="0.01"
                                min="0"
                                name="value"
                                value={refund.value}
                                placeholder="0,00"
                                readOnly
                                className="max-w-[154px]"
                            />
                        )
                    )}
                </div>

                <div className="space-y-4">
                    <Button
                        disabled={ isLoading || isDeleting || isLoadingReceipt}
                        variant="outline"
                        onClick={handleOpenReceipt}
                    >
                        <FileIcon weight="bold" size="18" />
                        { isLoadingReceipt ? "Abrindo Comprovante..." : "Abrir Comprovante" }                        
                    </Button>

                    <ConfirmFileDeletionDialog />
                </div>
            </div>
            
        </div>
    )
}

function ConfirmFileDeletionDialog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refund, isLoading, deleteRefund, isDeleting } = useRefund(id);

    async function handleDelete() {
        if (refund) {
            await deleteRefund(refund.id);
            navigate("/");
        }
    }
        

    return (
        <ConfirmAlertDialogRoot>
            <ConfirmAlertDialogTrigger asChild>
                <Button disabled={isLoading || isDeleting} variant="primary">
                    { isDeleting ? "Excluindo..." : "Excluir" }
                </Button>
            </ConfirmAlertDialogTrigger>

            <ConfirmAlertDialogPortal>
                <ConfirmAlertDialogOverlay />
                <ConfirmAlertDialogContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <ConfirmAlertDialogTitle>
                            Excluir Solicitação
                        </ConfirmAlertDialogTitle>
                        <ConfirmAlertDialogDescription>
                            Tem Certeza que deseja excluir essa solitação? <br />
                            Essa ação é irreversível.
                        </ConfirmAlertDialogDescription>
                    </div>
                    <div className="flex items-center w-full justify-end gap-4">
                        <ConfirmAlertDialogCancel className="w-fit">
                            Cancelar
                        </ConfirmAlertDialogCancel>
                        <ConfirmAlertDialogAction onClick={handleDelete} className="w-fit">
                            Confirmar
                        </ConfirmAlertDialogAction>
                    </div>
                </ConfirmAlertDialogContent>
            </ConfirmAlertDialogPortal>
        </ConfirmAlertDialogRoot>
    )

}
interface InputSkeletonProps {
    labelText: string;
    className?: string;
    containerProps?: ComponentProps<"div">;
}


function InputSkeleton({
    labelText,
    className,
    containerProps
}: InputSkeletonProps) {
    const propsWithoutClassName = { ...containerProps}
    delete propsWithoutClassName.className;

    return (
        <div
            className={twMerge(
            "text-gray-200 text-2xs uppercase flex flex-col gap-2 w-full",
            containerProps?.className
            )}
            {...propsWithoutClassName}
        >
            {labelText}
            <div className="rounded-lg border h-12 border-gray-300 py-4 pl-4 text-sm flex items-center">
                <Skeleton className={twMerge("w-20", className)}>-</Skeleton>
            </div>
        </div>
    )
}