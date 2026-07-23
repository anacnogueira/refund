import { NavLink as RRNavLink, type NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";


type Props = NavLinkProps;    

export default function NavLink({
    className,
    children,
    ...props

}: Props) {
    return (
        <RRNavLink 
            className={
                typeof className === "function"
                ? className
                : ({ isActive }) =>
                    twMerge("px-3 py-5 text-gray-200 hover:text-green-100 font-semibold text-sm transition-colors",
                        isActive && "text-green-100",
                        className
                    )
            }
            {...props}
        >
            {children}
        </RRNavLink>
    );
}