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
		try {
			const { data } = await loginUser({ variables: formData });
			AuthLocal.setToken(data.loginUser.token);

			console.log(data.loginUser);
			const user = data.loginUser;
			setUserInfo({
				firstName: user.firstName,
				lastName: user.lastName,
				_id: user._id,
				userName: user.userName,
				createdAt: user.createdAt,
			});

			window.location.href = "/";
		} catch (err) {
			console.error("Login error:", err);
			// Handle login errors (e.g., display error message)
		}
	};

	console.log(formData);

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
							name="userName"
							onChange={(e) =>
								setFormData({ ...formData, userName: e.target.value })
							}
							value={formData.userName}
							type="text"
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
