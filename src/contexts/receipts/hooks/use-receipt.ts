import { toast } from "sonner";
import type { ReceiptNewFormSchema } from "../schema";
import type { ReceiptCreate } from "../../../types/api";
import { api } from "../../../helpers/api";

export default function useReceipt() {

    async function createReceipt(payload: ReceiptNewFormSchema) {
        try {
            const formData = new FormData();
            console.log(payload);
            formData.append("receiptFile", payload.receiptFile);

            const receipt = await api.post<ReceiptCreate>("/receipts", formData);

            return receipt.data;

        } catch (error) {
            toast.error("Erro ao cadastrar comprovante")
            console.log(error);
        }
    
    }

    return {
        createReceipt
    }
}