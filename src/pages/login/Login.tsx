import { Link } from "react-router-dom";
import {
	EmailIcon,
	PasswordIcon,
	ShowPasswordIcon,
} from "../../components/ui/icon";
import styles from "./Login.module.css";
import { useState } from "react";
const Login = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<form className={styles.form}>
					<div className={styles.flexColumn}>
						<label>Email </label>
					</div>
					<div className={styles.inputForm}>
						<EmailIcon />
						<input
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
					<button className={styles.buttonSubmit}>Sign In</button>
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
