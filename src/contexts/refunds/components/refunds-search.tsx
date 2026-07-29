import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import ButtonIcon from "../../../components/button-icon";
import Input from "../../../components/input";
import useRefunds from "../hooks/use-refunds";

export default function RefundsSearch() {
    const { filters } = useRefunds();

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const search = formData.get("search");

        if (search && typeof search === "string" && search.trim().length > 0) {
            const trimmedSearch = search.trim();
            filters.setQ(trimmedSearch);
        } else {
            filters.setQ("");
        }

        filters.setPage("1");
    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
            <Input
                defaultValue={ filters.q ?? ""}
                className="w-full"
                placeholder="Pesquise pelo nome"
                name="search"
            />
            <ButtonIcon icon={MagnifyingGlassIcon} />
        </form>
    )
}