import classes from "./Sidebar.module.scss";
import {Image} from "../../../../components";

const Sidebar = props => {
	return (
		<div className={classes.Sidebar}>
			<div className={classes.content}>
				<Image className={classes.logotype} src="/img/blue-logo.svg" alt="Logotype" />
				<h3>Ваши столы</h3>
				<ul className={classes.list}>
					{
						props.deskLists.map((el, index) => {
							return (
								<li
									key={index}
								>
									<div className={classes.info}>
										<h5 className={classes.title}>{el.name}</h5>
										<p className={classes.subtitle}>12 заданий, 10 ваши</p>
									</div>
									<div className={classes.actions}>
										<Image src="/img/delete-icon.svg" />
										<Image src="/img/arrow-right.svg" style={{maxWidth: 25}} />
									</div>
								</li>
							);
						})
					}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;