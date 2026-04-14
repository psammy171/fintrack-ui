import { useAuth } from "../hooks/use-auth";
import { useLocation } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}

const AuthenticatedRoute = ({ children }: Props) => {
	const location = useLocation();
	const pathName = location.pathname;
	const authRoutes = ["/expenses", "/dashboard", "/tags"];
	const { isAuthenticating, authenticated } = useAuth();

	const isAuthRoute = () => authRoutes.includes(pathName);

	if (!isAuthenticating && !authenticated && isAuthRoute()) {
		window.location.href =
			import.meta.env.VITE_API_LOGIN_URL +
			"&state=" +
			window.location.pathname;
	}

	return children;
};

export default AuthenticatedRoute;
