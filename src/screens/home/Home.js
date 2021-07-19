import classes from "./Home.module.scss";
import {Image, Layout} from "../../components/index";
import {Link} from "react-router-dom";

export const Home = () => {
	document.title = "Добро пожаловать";

	return (
		<Layout className={classes.Home}>
			<div className={"container " + classes.container}>
				<Image className={classes.logotype} src="/img/welcome-logo.svg" alt="Welcome logo" />
				<h2 className={classes.title}>Бесплатно. Удобно. Просто.</h2>
				<p className={classes.slogan}>Организуйте работу путём создания досок и заданий, распределяйте обязанности и отслеживайте их выполнение!</p>
				<Link to="/login" style={{alignSelf: "flex-end"}}>
					<button className={classes.startBtn}>Начать!</button>
				</Link>
			</div>
		</Layout>
	);
}