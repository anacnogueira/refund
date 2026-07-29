import React from "react";
import Button from "../components/button";
import FileInput from "../components/file-input";
import Input from "../components/input";
import SelectInput from "../components/select-input";
import { categoryOptions } from "../contexts/refunds/helpers";

export default function PageNewRefund() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        setIsSubmitting(true);
        event.preventDefault();
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
                    />
                    <div className="flex items-center gap-4">
                        <SelectInput
                            name="category"
                            labelText="Categoria"
                            options={categoryOptions}
                            disabled={isSubmitting}
                        />

                        <Input
                        name="value"
                        labelText="Valor"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        className="max-w-[154px]"
                    />
                    </div>
                    <FileInput 
                        labelText="Comprovante"
                        className="w-full"
                        name="file"
                        placeholder="Nome do arquivo.pdf"
                    />
                </fieldset>
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
            </form >
        </div>

    )
}