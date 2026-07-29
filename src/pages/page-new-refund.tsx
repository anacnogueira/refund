import React, { useState } from "react";
import Button from "../components/button";
import FileInput from "../components/file-input";
import Input from "../components/input";
import SelectInput from "../components/select-input";
import { categoryOptions } from "../contexts/refunds/helpers";
import { useNavigate } from "react-router";
import type { $ZodFlattenedError } from "zod/v4/core";
import { refundReceiptSchema, refundStepOneSchema } from "../contexts/refunds/schemas";
import { receiptNewFormSchema } from "../contexts/receipts/schema";
import { z } from "zod";
import useRefund from "../contexts/refunds/hooks/use-refund";
import useReceipt from "../contexts/receipts/hooks/use-receipt";

type ValidationErrors = $ZodFlattenedError<
  z.infer<typeof refundStepOneSchema>
> &
  $ZodFlattenedError<z.infer<typeof receiptNewFormSchema>>;

export default function PageNewRefund() {
     const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors | null>(null);

  const { createRefund } = useRefund();
  const { createReceipt } = useReceipt();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const category = formData.get("category");
    const value = Number(formData.get("value"));
    const file = formData.get("file");

    const receiptValidation = receiptNewFormSchema.safeParse({
      receiptFile: file,
    });
    const refundStepOneValidation = refundStepOneSchema.safeParse({
      title,
      category,
      value,
    });

    if (refundStepOneValidation.error) {
      const formattedErrors = z.flattenError(refundStepOneValidation.error);
      setValidationErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    if (receiptValidation.error) {
      const formattedErrors = z.flattenError(receiptValidation.error);
      setValidationErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const { receipt } = await createReceipt({
        receiptFile: receiptValidation.data.receiptFile,
      });

      const refundReceiptValidation = refundReceiptSchema.safeParse({
        receipt: receipt.id,
      });

      if (!refundReceiptValidation.success) {
        return;
      }

      await createRefund({
        category: refundStepOneValidation.data.category,
        title: refundStepOneValidation.data.title,
        value: refundStepOneValidation.data.value,
        receipt: refundReceiptValidation.data.receipt,
      });

      navigate("/confirmation");
    } catch {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl bg-gray-500 max-w-lg mx-auto p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl text-gray-100">
          Nova solicitação de reembolso
        </h1>
        <span className="text-sm text-gray-200">
          Dados da despesa para solicitar reembolso.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-6 group/fieldset"
        >
          <Input
            name="title"
            labelText="Nome da solicitação"
            error={validationErrors?.fieldErrors.title?.[0]}
          />

          <div className="flex items-center gap-4">
            <SelectInput
              labelText="Categoria"
              name="category"
              options={categoryOptions}
              disabled={isSubmitting}
              error={validationErrors?.fieldErrors.category?.[0]}
            />

            <Input
              labelText="Valor"
              type="number"
              step="0.01"
              min="0"
              name="value"
              placeholder="0,00"
              className="max-w-[154px]"
              error={validationErrors?.fieldErrors.value?.[0]}
            />
          </div>

          <FileInput
            labelText="Comprovante"
            className="w-full"
            name="file"
            placeholder="Nome do arquivo.pdf"
            error={validationErrors?.fieldErrors.receiptFile?.[0]}
          />
        </fieldset>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}