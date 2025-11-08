import { NavLink } from "react-router";
import { ConnectWallet } from "./connect-wallet";

export function Header() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 bg-zinc-950/90 border-b border-zinc-800 px-[50px] py-4 mb-20">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight flex items-center">
          <NavLink to="/" className="hover:underline">
            Crowdfund
          </NavLink>
          .
        </h2>
        <ConnectWallet/>
      </div>
    </div>
  );
}