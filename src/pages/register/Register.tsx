import { Link } from "react-router-dom";
import {
	EmailIcon,
	PasswordIcon,
	ShowPasswordIcon,
} from "../../components/ui/icon";
import styles from "./Register.module.css";
import { useState } from "react";
const Register = () => {
	const [show, setShow] = useState({ password: false, repeatPassword: false });
	return (
		<>
			<div className={styles.container}>
				<form className={styles.form}>
					<div className={styles.flexColumn}>
						<label>First Name </label>
					</div>
					<div className={styles.inputForm}>
						<input
							type="text"
							className={styles.input}
							placeholder="Enter your First Name"
						/>
					</div>
					<div className={styles.flexColumn}>
						<label>Last Name </label>
					</div>
					<div className={styles.inputForm}>
						<input
							type="text"
							className={styles.input}
							placeholder="Enter your Last Name"
						/>
					</div>
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
							type={show.password ? "text" : "password"}
							className={styles.input}
							placeholder="Enter your Password"
							autoComplete="false"
						/>
						<span
							className={styles.showPassword}
							onClick={() => setShow({ ...show, password: !show.password })}
						>
							<ShowPasswordIcon />
						</span>
					</div>

					<div className={styles.flexColumn}>
						<label>Repeat Password </label>
					</div>
					<div className={styles.inputForm}>
						<PasswordIcon />
						<input
							type={show.repeatPassword ? "text" : "password"}
							className={styles.input}
							placeholder="Enter your Password"
							autoComplete="false"
						/>
						<span
							className={styles.showPassword}
							onClick={() =>
								setShow({ ...show, repeatPassword: !show.repeatPassword })
							}
						>
							<ShowPasswordIcon />
						</span>
					</div>

					<div className={styles.flexRow}>
						<div className={styles.policy}>
							By clicking Sign Up, you agree to the Company User Agreement,
							Privacy Policy, and Cookie Policy.
						</div>
					</div>
					<button className={styles.buttonSubmit}>Sign Up</button>
					<p className={styles.p}>
						Do you have an account?
						<Link to="/login">
							<span className={styles.span}>Sign In</span>
						</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Register;
