import { Link } from "react-router";
import Skeleton from "../../../components/skeleton";
import { categoryIcons } from "../helpers";
import useRefunds from "../hooks/use-refunds";

export default function RefundsList() {
    const { refunds, isLoadingRefunds } = useRefunds();

    return (
        <div className="flex flex-col gap-4">
            {isLoadingRefunds ? (
                Array.from({ length: 10 }).map((_, index) => (
                    <RefundsListSkeleton key={index} />
                ))
            ) : refunds && refunds.data.length > 0 ? (
                refunds.data.map((refund) => {
                    const Icon = categoryIcons[refund.category].icon;
                    const categoryText = categoryIcons[refund.category].label;

                    return (
                        <Link
                            to={`/refunds/${refund.id}`}
                            key={refund.id}
                            className="flex items-center justify-between py-0.5"
                   
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-gray-400">
                                    <Icon weight="fill" className="size-4.5 text-green-100" />
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">{refund.title}</span>
                                    <span className="text-xs text-gray-200">{categoryText}</span>
                                </div>
                            </div>

                            <div className="text-gray-200 text-xs">
                                R$ &nbsp;
                                <span className="font-semibold text-sm text-gray-100">
                                    {refund.value}
                                </span>
                            </div>
                        </Link>
                    )
                })                
                
            ) : (
                <RefundsListEmpty />
            )}
        </div>
    );
}

function RefundsListSkeleton() {
    return (
        <div className="flex items-center justify-betweenm py-0.5">
            <div className="flex items-center gap-3">
                <Skeleton className="size-8.5 rounded-full"/>
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-4.5 w-20" />
                    <Skeleton className="h-3.5 w-16" />
                </div>
            </div>

             <Skeleton className="h-5 w-12" />
        </div>
    )
}

function RefundsListEmpty() {
    return (
        <div className="flex items-center justify-center p-10 text-sm text-gray-200">
            Nenhuma solicitação encontrada.
        </div>
    )
}