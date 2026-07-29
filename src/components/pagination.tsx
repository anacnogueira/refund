import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import ButtonIcon from "./button-icon";
import Skeleton from "./skeleton";
import useRefunds from "../contexts/refunds/hooks/use-refunds";

/* TO DO: Implementar Hooks */
export function Pagination () {
    const { refunds, filters, isLoadingRefunds } = useRefunds();

    function handlePreviousNavigation() {
        if (refunds?.meta.previousPageUrl) {
            filters.setPage(String(Number(filters.page ?? 1) - 1))
        }
    }

    function handleNextNavigation() {
        if (refunds?.meta.nextPageUrl) {
            filters.setPage(String(Number(filters.page ?? 1) + 1));
        }
    }

    if (!refunds) return null;

    return (
        <div className="flex items-center self-center gap-2.5">
            <ButtonIcon 
                icon={CaretLeftIcon}
                className="p-1"
                disabled={!refunds.meta.previousPageUrl}
                onClick={handlePreviousNavigation}
            />
            <span className="text-sm text-gray-200">
                { isLoadingRefunds 
                    ? <PaginationSkeleton />
                    : (
                        `${refunds.meta.currentPage}/${refunds.meta.lastPage}`
                    )
                }
            </span>

            <ButtonIcon
                icon={CaretRightIcon}
                className="p-1"
                disabled={!refunds.meta.nextPageUrl}
                onClick={handleNextNavigation}
            />
        </div>
    )
}

export function PaginationSkeleton() {
    return (
        <Skeleton className="h-5 w-5.25" />
    );
}