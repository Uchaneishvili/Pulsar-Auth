import { Link } from "react-router-dom";
import {
	EmailIcon,
	PasswordIcon,
	ShowPasswordIcon,
} from "../../components/ui/icon";
import styles from "./Register.module.css";
import { useState } from "react";
import { REGISTER_MUTATION } from "../../apis/mutations/authMutations";
import { useMutation } from "@apollo/client";
import AuthLocal from "../../utils/Auth";

interface FormData {
	userName: string;
	password: string;
	firstName: string;
	lastName: string;
}

const Register = () => {
	const [show, setShow] = useState({ password: false, repeatPassword: false });
	const [registerUser] = useMutation(REGISTER_MUTATION);
	const [formData, setFormData] = useState<FormData>({
		userName: "",
		password: "",
		firstName: "",
		lastName: "",
	});

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			const { data } = await registerUser({
				variables: { userInput: formData },
			});

			if (data.registerUser.token) {
				AuthLocal.setToken(data.registerUser.token);
				// Redirect to a protected route or handle successful register
				window.location.href = "/";
			} else {
				console.log(data);
			}
		} catch (err) {
			console.error("Register error:", err);
			// Handle register errors (e.g., display error message)
		}
	};

	return (
		<>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.flexColumn}>
						<label>First Name </label>
					</div>
					<div className={styles.inputForm}>
						<input
							onChange={(e) =>
								setFormData({ ...formData, firstName: e.target.value })
							}
							type="text"
							name="firstName"
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
							name="lastName"
							onChange={(e) =>
								setFormData({ ...formData, lastName: e.target.value })
							}
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
							onChange={(e) =>
								setFormData({ ...formData, userName: e.target.value })
							}
							name="userName"
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
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							type={show.password ? "text" : "password"}
							className={styles.input}
							placeholder="Enter your Password"
							name="password"
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
					<button className={styles.buttonSubmit} type="submit">
						Sign Up
					</button>
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
