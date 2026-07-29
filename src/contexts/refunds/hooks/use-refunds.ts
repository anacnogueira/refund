import { useQuery } from "@tanstack/react-query";
import { createSerializer, parseAsString, useQueryState } from "nuqs";
import { fetcher } from "../../../helpers/api";

const toSearchParams = createSerializer({
    q: parseAsString,
    page: parseAsString,
})

export default function useRefunds() {
    const [q, setQ] = useQueryState("q");
    const [page, setPage] = useQueryState("page");

    const { data, isLoading } = useQuery({
        queryKey: ["refunds", {q, page}],
        queryFn: () => fetcher(`/refunds${toSearchParams({q, page})}`)
    });

    return {
        refunds: data?.refunds,
        isLoadingRefunds: isLoading,
        filters: {
            q,
            setQ,
            page,
            setPage
        },
    }
    
}