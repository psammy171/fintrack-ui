import type { FC } from "react";
import Header from "./header";
import TransactionIcon from "../icons/transaction";
import DashboardIcon from "../icons/dashboard";
import { Link, useLocation } from "react-router-dom";
import TagIcon from "../icons/tag";

interface Props {
	children: React.ReactNode;
}

interface MenuItem {
	icon: React.ReactNode;
	label: string;
	path: string;
}

const Layout: FC<Props> = ({ children }) => {
	const location = useLocation();
	const pathName = location.pathname;

	const menuItems: MenuItem[] = [
		{
			icon: (
				<TransactionIcon className="w-5 h-5 transition-colors duration-200" />
			),
			label: "Expenses",
			path: "/expenses",
		},
		{
			icon: (
				<DashboardIcon className="w-5 h-5 transition-colors duration-200" />
			),
			label: "Dashboard",
			path: "/dashboard",
		},
		{
			icon: (
				<TagIcon className="w-5 h-5 transition-colors duration-200" />
			),
			label: "Tags",
			path: "/settings",
		},
	];

	return (
		<div className="w-full h-screen flex flex-col overflow-hidden overflow-y-scroll fixed">
			<Header />
			<div className="fixed hidden sm:block top-[50px] bg-gray-200 left-0 bottom-0 w-12 hover:w-52 z-20 overflow-hidden transition-all duration-200">
				{menuItems.map((item) => (
					<SideBarItem
						key={item.label}
						item={item}
						pathName={pathName}
					/>
				))}
			</div>
			<div className="w-full h-full overflow-scroll flex-grow pl-0 sm:pl-12">
				{children}
			</div>
			<div className="w-full flex justify-around border-t bg-slate-100 sm:hidden">
				{menuItems.map((item) => (
					<BottomNavigationItem
						key={item.label}
						item={item}
						pathName={pathName}
					/>
				))}
			</div>
		</div>
	);
};

export default Layout;

const SideBarItem = ({
	item,
	pathName,
}: {
	item: MenuItem;
	pathName: string;
}) => {
	return (
		<Link to={item.path} key={item.label}>
			<span
				className={`border-b border-b-gray-300 hover:bg-gray-300 transition-colors duration-200 ${
					pathName.startsWith(item.path)
						? "text-indigo-600"
						: "text-gray-600 hover:text-gray-900"
				} inline-flex items-center w-full cursor-pointer`}
			>
				<span className="h-11 min-w-12 w-12 flex items-center justify-center">
					{item.icon}
				</span>
				<p className="font-semibold">{item.label}</p>
			</span>
		</Link>
	);
};

const BottomNavigationItem = ({
	item,
	pathName,
}: {
	item: MenuItem;
	pathName: string;
}) => {
	return (
		<Link
			to={item.path}
			key={item.label}
			className={`flex items-center gap-x-1 p-2 flex-col font-semibold ${pathName.startsWith(item.path) ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"} transition-colors duration-200`}
		>
			{item.icon}
			<p>{item.label}</p>
		</Link>
	);
};
