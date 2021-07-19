import React from "react";
import classes from "./TaskList.module.scss";
import Task from "./Task/Task";
import {Image} from "../Image/Image";

export const TaskList = props => {
	return (
		<div className={classes.TaskList}>
			<div className={classes.TaskList__header}>
				<h4 className={classes.title}>{props.title.length > 15 ? props.title.substr(0, 15) + ".." : props.title}</h4>
				<div className={classes.actions}>
					<Image src="/img/edit-icon.svg" />
					<Image src="/img/delete-icon.svg" />
					<span className={classes.id}>#{props.id}</span>
				</div>
			</div>

			<div className={classes.TaskList__content}>
				{
					props.list.map((el, index) => {
						return (
							<Task
								key={index}
								text={el.text}
								username={el.username}
								self={el.self}
								status={el.status}
							/>
						);
					})
				}
			</div>
		</div>
	);
}