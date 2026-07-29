import React from "react";
import { toast } from "sonner";
import type { RefundReceiptShow } from "../../../types/api";
import { api } from "../../../helpers/api";

export function useRefundReceipt() {
    const [isLoading, setIsLoading] = React.useState(false);

    async function fetchRefundReceipt(receiptId: string) {
        try {
            setIsLoading(true);
            const response = await api.get<RefundReceiptShow>(`/receipts/download/${receiptId}`);

            return response.data;
        } catch (error) {
            toast.error("Erro ao buscar comprovante de reembolso");
            throw error;
        } finally {
            setIsLoading(false);
        }

    }

    return {
        isLoading,
        fetchRefundReceipt,
    };        
}