import React, {Component} from "react";
import classes from "./Form.module.scss";
import {Link} from "react-router-dom";
import {Image, Input} from "../index";

export class Form extends Component{
	constructor(props) {
		super(props);
		// Записываем переданную форму
		this.state = props.form;
	}

	// Функция отправки формы
	onSubmit = e => {
		e.preventDefault();
		// Расчитываем индикатор валидности
		let valid = true;
		let fields = {};
		for(let field of this.state.fields){
			if(field.valid !== valid){
				valid = field.valid;
				break;
			}
			fields[field.name] = field.value;
		}
		// Если форма невалидна - отмена
		if(valid === false) return alert("Исправьте все ошикби!");

		if(this.props.onSubmit)
			this.props.onSubmit(fields);
	}

	// Функция, отлавливающая изменения полей формы
	onFieldChange = (text, key) => {
		const state = this.state;
		// Задаём статус валидности / невалидности
		state.fields.find((item, index) => {
			if(item.name === key){
				if(!text) {
					state.valid = false;
					state.fields[index].valid = false;
				} else {
					state.fields[index].valid = true;
				}
				// Меняем значение поля
				state.fields[index].value = text;
			}
		});
		// Сохраняем результат
		this.setState(state);
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className={classes.Form}>
				<h3 className={classes.title}>{this.props.title}</h3>
				<div className={classes.content}>
					{this.props.children}

					{
						this.state.fields.map((field, index) => {
							return (
								<Input
									key={index}
									name={index}
									onChange={this.onFieldChange}
									{...field}
								/>
							);
						})
					}
				</div>
				<div className={classes.actions}>
					{
						this.props.links.map((el) => {
							return el;
						})
					}

					<button className={classes.submit}><Image src="/img/arrow-right.svg" /></button>
				</div>
			</form>
		);
	}
}