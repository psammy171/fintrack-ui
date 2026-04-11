const Login = () => {
	return (
		<a
			href={
				import.meta.env.VITE_API_LOGIN_URL +
				"&state=" +
				window.location.pathname
			}
		>
			Login
		</a>
	);
};

export default Login;
