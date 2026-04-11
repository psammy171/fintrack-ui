import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../lib/axios";

const Callback = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code");
	const state = searchParams.get("state");

	const getRedirectUri = useCallback(() => {
		if (state) {
			try {
				const url = new URL(state.toString(), window.location.origin);
				return url.pathname;
			} catch (error: unknown) {
				console.error(
					`Error while parsing state with value ${state}:`,
					error,
				);
				return "/";
			}
		}

		return "/";
	}, [state]);

	useEffect(() => {
		const authorize = async () => {
			if (!code) return;

			try {
				await apiClient.get("/oauth2/callback", {
					params: {
						code,
					},
				});
			} catch (error) {
				console.error(error);
			} finally {
				const navigateTo = getRedirectUri();
				navigate(navigateTo);
			}
		};

		authorize();
	}, [code, state, navigate, getRedirectUri]);

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div>Loading...</div>
		</div>
	);
};

export default Callback;
