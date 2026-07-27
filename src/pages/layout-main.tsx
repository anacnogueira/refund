import { Link, Outlet } from "react-router";
import NavLink from "../components/nav-link";
import Button from "../components/button";
import Logo from "../assets/images/logo.svg?react";

export function LayoutMain() {
    return (
        <main className="pt-10 pb-14 px-2 space-y-10">
            <header className="flex items-center justify-between gap-10 max-w-[1185px] mx-auto">
                <Logo />
                <div className="flex items-center gap-4">
                    <NavLink to="/">Solicitações de reembolso</NavLink>
                    <Button asChild className="w-fit">
                        <Link to="/new-refund">Nova solicitação</Link>
                    </Button>
                </div>
            </header>            
            <Outlet />
        </main>
    )
} 