import { useEffect, useState, type ReactNode } from "react";
import type { UserContext } from "../../types/user-context";
import { AuthContext } from "./auth.context";
import apiClient from "@/lib/axios";

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userContext, setUserContext] = useState<UserContext | null>(null);
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

	useEffect(() => {
		const checkAuth = async () => {
			if (userContext && authenticated) {
				return;
			}
			setAuthenticated(false);
			setIsAuthenticating(true);

			try {
				const response = await apiClient.get("/profile");
				const userContext: UserContext = response.data;
				setUserContext(userContext);
				setAuthenticated(true);
			} catch (err) {
				console.error(err);
				setAuthenticated(false);
			} finally {
				setIsAuthenticating(false);
			}
		};
		checkAuth();
	}, [authenticated, userContext]);

	if (isAuthenticating) {
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				userContext,
				authenticated,
				isAuthenticating,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
