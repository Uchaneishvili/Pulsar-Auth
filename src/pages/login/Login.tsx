import { Link } from "react-router-dom";
import {
	EmailIcon,
	PasswordIcon,
	ShowPasswordIcon,
} from "../../components/ui/icon";
import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../apis/mutations/authMutations";
import AuthLocal from "../../utils/Auth";
import AuthContext from "../../contexts/AuthContext";
import { notification } from "antd";

interface FormData {
	userName: string;
	password: string;
}

const Login = () => {
	const [loginUser] = useMutation(LOGIN_MUTATION);
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		userName: "",
		password: "",
	});
	const { setUserInfo } = useContext(AuthContext);

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.userName)) {
			notification.error({
				message: "The email address you entered is invalid",
				description:
					"Please double-check and enter a valid email address to proceed with the login.",
			});
			return;
		}

		if (formData.password.length === 0) {
			notification.error({
				message: "The password field is required.",
				description: "Please enter your password to log in to your account.",
			});
			return;
		} else if (formData.password.length < 6) {
			notification.error({
				message: "Sorry, but your password is too short to log in.",
				description: "Please enter a password with a minimum of 6 characters",
			});
			return;
		}

		try {
			const { data } = await loginUser({ variables: formData });

			AuthLocal.setToken(data.loginUser.token);

			if (data.loginUser) {
				const user = data.loginUser;
				setUserInfo({
					firstName: user.firstName,
					lastName: user.lastName,
					id: user.id,
					userName: user.userName,
					successedSignInCount: user.successedSignInCount + 1,
					createdAt: user.createdAt,
				});

				window.location.href = "/";
			}
		} catch (err: any) {
			if (err?.message.includes("MAXIMUM_LOGIN_ATTEMPTS_REACHED")) {
				notification.error({
					message: "Maximum Login Attempts Reached",
					description:
						"Your account is temporarily locked for security reasons.",
				});
			} else if (err?.message.includes("INVALID_PASSWORD")) {
				notification.error({
					message: "Invalid password",
					description:
						"Your account will be temporarily locked after multiple failed login attempts for security reasons",
				});
			} else {
				notification.error({
					message: "Fail",
					description:
						"An error occurred while processing your request. Please try again later or contact support if the issue persists",
				});
			}
		}
	};

	return (
		<>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.flexColumn}>
						<label>Email </label>
					</div>
					<div className={styles.inputForm}>
						<EmailIcon />
						<input
							type="mail"
							name="userName"
							onChange={(e) =>
								setFormData({ ...formData, userName: e.target.value })
							}
							value={formData.userName}
							className={styles.input}
							placeholder="Enter your Email"
						/>
					</div>

					<div className={styles.flexColumn}>
						<label>Password </label>
					</div>
					<div className={styles.inputForm}>
						<PasswordIcon />
						<input
							name="password"
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							value={formData.password}
							type={show ? "text" : "password"}
							className={styles.input}
							placeholder="Enter your Password"
							autoComplete="false"
						/>
						<span
							className={styles.showPassword}
							onClick={() => setShow(!show)}
						>
							<ShowPasswordIcon />
						</span>
					</div>

					<div className={styles.flexRow}>
						<div>
							<input type="checkbox" />
							<label>Remember me </label>
						</div>
						<span className={styles.span}>Forgot password?</span>
					</div>
					<button type="submit" className={styles.buttonSubmit}>
						Sign In
					</button>
					<p className={styles.p}>
						Don't have an account?
						<Link to="/register">
							<span className={styles.span}>Sign Up</span>
						</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Login;
