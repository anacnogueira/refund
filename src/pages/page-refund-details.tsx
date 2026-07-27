import { useParams } from "react-router";

export default function PageRefundDetails() {
    const { id } = useParams();
    return (
        <div>
            Detalhes da solicitação
        </div>
    )
}