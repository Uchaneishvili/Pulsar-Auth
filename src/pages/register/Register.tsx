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
import { notification } from "antd";

interface FormData {
	userName: string;
	password: string;
	repeatPassword: string;
	firstName: string;
	lastName: string;
}

const Register = () => {
	const [show, setShow] = useState({ password: false, repeatPassword: false });
	const [registerUser] = useMutation(REGISTER_MUTATION);
	const [formData, setFormData] = useState<FormData>({
		userName: "",
		password: "",
		repeatPassword: "",
		firstName: "",
		lastName: "",
	});

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		console.log(formData);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.userName)) {
			notification.error({
				message: "The email address you entered is invalid",
				description:
					"Please enter a valid email address in the correct format (e.g., example@domain.com).",
			});
			return;
		}

		if (formData.password.length === 0) {
			notification.error({
				message: "The password field is required.",
				description: "Please enter your password to create an account.",
			});
			return;
		} else if (formData.password.length < 6) {
			notification.error({
				message: "Oops, your password must be at least 6 characters long.",
				description: "Please enter a stronger password to log in successfull",
			});
			return;
		} else if (formData.password !== formData.repeatPassword) {
			notification.error({
				message: "Passwords do not match",
				description: "Please ensure the passwords you entered match.",
			});
			return;
		}

		const data = {
			userName: formData.userName,
			firstName: formData.firstName,
			lastName: formData.lastName,
			password: formData.password,
		};
		try {
			await registerUser({
				variables: { userInput: data },
			}).then(() => {
				window.location.href = "/login";
			});
		} catch (err: any) {
			if (err?.message.includes("USERNAME_ALREADY_EXISTS")) {
				notification.error({
					message: "Email already registered",
					description:
						"The email address you entered is already associated with an existing account. Please use a different email or log in if you already have an account.",
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
							name="repeatPassword"
							onChange={(e) =>
								setFormData({ ...formData, repeatPassword: e.target.value })
							}
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
