import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import ButtonIcon from "../../../components/button-icon";
import Input from "../../../components/input";

export default function RefundsSearch() {

    function handleSubmit() {}
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
            <Input
                className="w-full"
                placeholder="Pesquise pelo nome"
                name="search"
            />
            <ButtonIcon icon={MagnifyingGlassIcon} />
        </form>
    )
}