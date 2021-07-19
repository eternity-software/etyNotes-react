import React from "react";
import classes from "./Task.module.scss";
import {Image} from "../../Image/Image";

const Task = props => {
	// Класс
	const classesPerformer = [classes.performerName];
	if(props.self) classesPerformer.push(classes.self);

	return (
		<div className={classes.Task}>
			<p className={classes.text}>{props.text}</p>
			<div className={classes.actions}>
				<div className={classesPerformer.join(" ")}>
					<span>{ props.self ? "Вы исполнитель" : props.username }</span>
				</div>

				<div
					className={classes.status}
				>
					<div className={props.self ? classes.statusSelf : classes.statusOur}>
						{
							props.status ?
							<React.Fragment>
								<Image src="/img/checkmark.svg" />
								<span>Выполнено</span>
							</React.Fragment>
							: props.self ?
							<React.Fragment>
								<Image src="/img/checkmark-selected.svg" />
								<span className={classes.done}>Отметить</span>
							</React.Fragment>
							:
							<React.Fragment>
								<span>Невыполнено</span>
							</React.Fragment>

						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Task;