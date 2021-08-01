import classes from "./Sidebar.module.scss";
import {Image} from "../../../../components";

const Sidebar = props => {

	function newDeskClick() {
		window.location.href = "#win1";
	}

	return (
		<div className={classes.Sidebar}>
			<div className={classes.content}>
				<Image className={classes.logotype} src="/img/blue-logo.svg" alt="Logotype" />
				<br/>
				<div className="row">
					<h3>Ваши столы</h3>
				</div>
				<br/>

				<ul className={classes.list}>
					<li onClick={newDeskClick}>
						<div className={classes.info}>
							<h5 className={classes.title}>Создать новый</h5>

						</div>
						<div className={classes.actions}>
							<Image src="/img/arrow-right.svg" style={{maxWidth: 25}} />
						</div>
					</li>
					{
						props.deskLists.map((el, index) => {

							let finalname = el.name;
							if(el.name.length > 15)
							{
								finalname = el.name.substr(0, 15) + "..";
							}

							return (
								<li
									key={index}
								>
									<div className={classes.info}>
										<h5 className={classes.title}>{finalname}</h5>
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