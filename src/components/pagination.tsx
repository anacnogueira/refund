import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import ButtonIcon from "./button-icon";
import Skeleton from "./skeleton";

export function Pagination () {
    const isLoadingRefunds = false;
    return (
        <div className="flex items-center self-center gap-2.5">
            <ButtonIcon 
                icon={CaretLeftIcon}
                className="p-1"
                disabled={false}
            />
            <span className="text-sm text-gray-200">
                { isLoadingRefunds 
                    ? <PaginationSkeleton />
                    : "Página 1 de 10"
                }
            </span>

            <ButtonIcon
                icon={CaretRightIcon}
                className="p-1"
                disabled={false}
            />
        </div>
    )
}

export function PaginationSkeleton() {
    return (
        <Skeleton className="h-5 w-5.25" />
    );
}