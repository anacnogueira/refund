import { FileIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import Button from "../components/button";
import ButtonIcon from "../components/button-icon";
import { ConfirmAlertDialogAction, ConfirmAlertDialogCancel, ConfirmAlertDialogContent, ConfirmAlertDialogDescription, ConfirmAlertDialogOverlay, ConfirmAlertDialogPortal, ConfirmAlertDialogRoot, ConfirmAlertDialogTitle, ConfirmAlertDialogTrigger } from "../components/confirm-dialog";
import FileInput from "../components/file-input";
import Input from "../components/input";
import SelectInput from "../components/select-input";

export default function PageComponents() {
    return(
        <main className="p-5 flex flex-col items-center gap-6 w-full">
            <div className="space-y-3 flex flex-col w-full">
                <Button>Label</Button>
                <Button disabled>Label</Button>
                <Button variant="outline" className="">
                    <FileIcon size={18} /> Abrir comprovante
                </Button>
            </div>
            <div className="space-y-3 flex flex-col w-full">
                <ButtonIcon icon={MagnifyingGlassIcon} />
                <ButtonIcon disabled icon={MagnifyingGlassIcon} />
            </div>

            <div className="space-y-3 flex flex-col w-full">
                <ConfirmAlertDialogRoot>
                    <ConfirmAlertDialogTrigger>
                        <Button variant="primary">Abrir Modal</Button>
                    </ConfirmAlertDialogTrigger>
                    <ConfirmAlertDialogPortal>
                        <ConfirmAlertDialogOverlay />
                            <ConfirmAlertDialogContent className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3">
                                    <ConfirmAlertDialogTitle>
                                    Excluir Solicitação
                                    </ConfirmAlertDialogTitle>
                                    <ConfirmAlertDialogDescription>
                                    Tem certeza que deseja excluir esta solicitação? <br />
                                    Esta ação não pode ser desfeita.
                                    </ConfirmAlertDialogDescription>
                                </div>

                                <div className="flex items-center w-full justify-end gap-4">
                                    <ConfirmAlertDialogCancel className="w-fit">
                                        Cancelar
                                    </ConfirmAlertDialogCancel>
                                    <ConfirmAlertDialogAction className="w-fit">
                                        Excluir
                                    </ConfirmAlertDialogAction>
                                    </div>
                            </ConfirmAlertDialogContent>
                    </ConfirmAlertDialogPortal>
                </ConfirmAlertDialogRoot>
            </div>

            <div className="space-y-3 flex flex-col w-full">
                <FileInput labelText="Arquivo:" placeholder="Escolha o arquivo..."/>
            </div>

            <div className="space-y-3 flex flex-col w-full">
                <Input labelText="Título" placeholder="Placeholder" />
            </div>

            <div className="space-y-3 flex flex-col w-full">
                Links Aqui
            </div>

            <div className="space-y-3 flex flex-col w-full">
                <SelectInput 
                name="category"
                labelText="Categoria"
                options={[
                    {label: "Alimentação", value: "food"},
                    {label: "Transporte", value: "transport"}
                ]}
                />
            </div>
        </main>
    )
}