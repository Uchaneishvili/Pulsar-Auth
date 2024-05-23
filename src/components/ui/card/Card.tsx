import { FC } from "react";
import styles from "./Card.module.css";

type ICardProps = {
	title: String;
	value: number;
};
const Card: FC<ICardProps> = ({ title, value }) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardContent}>
				<p className={styles.cardTitle}>{value}</p>
				<p className={styles.cardPara}>{title}</p>
			</div>
		</div>
	);
};
export default Card;
