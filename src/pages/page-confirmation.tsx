import { Link } from "react-router";
import CircleCheck from "../assets/icons/circle-check.svg?react";
import Button from "../components/button";


export default function PageConfirmation() {
    return (
        <div className="rounded-2xl bg-gray-500 max-w-lg mx-auto p-10 flex flex-col gap-10">
            <div className="flex flex-col items-center gap-6">
                <h1 className="font-bold text-2xl text-green-100">
                    Solicitação de reembolso
                </h1>
                <CircleCheck />
                <span className="text-sm text-gray-200 text-center">
                    Agora é só aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.
                </span>
            </div>
            <Button asChild>
                <Link to="/new-refund">Nova Solicitação</Link>
            </Button>            
        </div>
    )

}