import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RefundNewFormSchema } from "../schemas";
import type { RefundCreate, RefundShow } from "../../../types/api";
import { toast } from "sonner";
import { api, fetcher } from "../../../helpers/api";

export default function useRefund(id?: string) {
    const queryClient = useQueryClient();
    const [isDeleting, setIsDeleting] = React.useState(false);

    async function createRefund(payload: RefundNewFormSchema) {
        try {
            await api.post<RefundCreate>("refunds", {
                title: payload.title,
                category: payload.category,
                value: payload.value,
                receipt: payload.receipt,
            });

            queryClient.invalidateQueries({ queryKey: ["refunds"] });
        } catch(error) {
            toast.error("Erro ao criar solictação de reembolso");
            throw error;
        }
    }

    async function deleteRefund(refundId: string) {
        try {
            setIsDeleting(true);
            const response = await api.delete(`/refunds/${refundId}`);

            queryClient.invalidateQueries({ queryKey: ["refunds"] });
            toast.success("Solicitação de reembolso deletada com sucesso");

            return response.data;
        } catch (error){
            toast.error("Erro ao deletar solicitação de reembolso");
            throw error;
        } finally {
            setIsDeleting(false);
        }
    }    

    const { data, isLoading } = useQuery<RefundShow>({
        queryKey: ["refund", id],
        queryFn: () => fetcher(`/refunds/${id}`),
        enabled: !!id,
    })

    return {
       createRefund,
       deleteRefund,
       isDeleting,
       refund: data?.refund,
       isLoading,
    }
}