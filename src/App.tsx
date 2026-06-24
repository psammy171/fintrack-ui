import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticatedRoute from "./auth/routes/authenticated-route";
import Dashboard from "./screens/dashboard";
import Home from "./screens/home";
import Expenses from "./screens/expenses";
import NotFound from "./screens/not-found";
import AuthProvider from "./auth/context/auth.provider";
import Callback from "./screens/callback";
import Tags from "./screens/tags";
import ContextProviderWrapper from "./context/context-provider-wrapper";

function App() {
	const isPWA =
		window.matchMedia("(display-mode: standalone)").matches ||
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window.navigator as any).standalone === true;

	return (
		<AuthProvider>
			<Router>
				<div className="bg">
					<Routes>
						<Route
							path="/"
							element={
								<AuthenticatedRoute>
									<Home />
								</AuthenticatedRoute>
							}
						/>
						<Route path="/callback" element={<Callback />} />
						<Route element={<ContextProviderWrapper />}>
							<Route
								path="/dashboard"
								element={
									<AuthenticatedRoute>
										<Dashboard />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/expenses"
								element={
									<AuthenticatedRoute>
										<Expenses />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/tags"
								element={
									<AuthenticatedRoute>
										<Tags />
									</AuthenticatedRoute>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</div>
			</Router>
			<Toaster
				position="top-right"
				containerStyle={{
					marginTop: isPWA ? "env(safe-area-inset-top)" : "0px",
				}}
			/>
		</AuthProvider>
	);
}

export default App;
