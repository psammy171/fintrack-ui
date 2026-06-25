import { Link, useLocation } from "react-router";
import { useCallback, useEffect, useState, type FC } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../auth/hooks/use-auth";
import apiClient from "../../../lib/axios";
import Login from "./login";
import Button from "./button";
import LogoIcon from "../icons/logo";

interface Props {
	isHome?: boolean;
}

const Header: FC<Props> = ({ isHome }) => {
	const location = useLocation();
	const { userContext } = useAuth();
	const [open, setOpen] = useState(false);

	const isPWA =
		window.matchMedia("(display-mode: standalone)").matches ||
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window.navigator as any).standalone === true;

	const closeProfile = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		if (open) {
			window.addEventListener("click", closeProfile);
		} else {
			window.removeEventListener("click", closeProfile);
		}
		return () => {
			window.removeEventListener("click", closeProfile);
		};
	}, [open, closeProfile]);

	const toggleProfile = (e: React.MouseEvent) => {
		e.stopPropagation();
		setOpen(!open);
	};

	const logoutHandler = async () => {
		try {
			await apiClient.get("/oauth2/logout");
			toast.success("Logged out successfully");
			window.location.href = "/";
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			toast.error("Failed to log out");
		}
	};

	const getTitle = () => {
		switch (location.pathname) {
			case "/dashboard":
				return "Dashboard";
			case "/expenses":
				return "Expenses";
			case "/tags":
				return "Tags";
			default:
				return "FinTrack";
		}
	};

	return (
		<header
			className={`flex items-center w-full gap-x-4 sticky z-20 top-0 bg-indigo-600`}
			style={{
				paddingTop:
					isHome && isPWA ? "env(safe-area-inset-top)" : "0px",
			}}
		>
			{userContext ? (
				<div className="relative h-12.5 flex items-center p-3 justify-end gap-x-4 text-white bg-indigo-600 flex-grow">
					<Link to={"/"}>
						<LogoIcon className="w-6 h-6 text-white fill-indigo-600" />
					</Link>
					<p className="text-xl font-bold">{getTitle()}</p>
					<span className="flex-grow"></span>
					<span
						className="border-2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
						onClick={toggleProfile}
					>
						<p>{userContext.firstName.charAt(0)}</p>
					</span>
					<span
						className={`absolute w-72 border border-gray-300 bg-gray-200 right-[6px] top-14 ${
							open
								? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
								: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
						} transition-all duration-300 p-4 rounded-lg text-gray-800 shadow-lg`}
						onClick={(e) => e.stopPropagation()}
					>
						<span className="flex items-center gap-x-3 z-20">
							<span className="border-2 border-gray-700 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer peer text-lg">
								{userContext.firstName.charAt(0)}
							</span>
							<span>
								<p className="font-semibold">
									{userContext.firstName}{" "}
									{userContext.lastName}
								</p>
								<p>{userContext.email}</p>
							</span>
						</span>
						<Button
							className="mx-0 w-full mt-3 "
							onClick={logoutHandler}
						>
							Log Out
						</Button>
					</span>
				</div>
			) : (
				<div className="relative h-12.5 flex items-center p-3 justify-end gap-x-4 text-white bg-indigo-600 flex-grow">
					<Login />
				</div>
			)}
		</header>
	);
};

export default Header;
