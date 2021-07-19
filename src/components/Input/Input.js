import React, {Component} from "react";
import classes from "./Input.module.scss";

export class Input extends Component{
	constructor(props) {
		super(props);

		this.state = {
			cls: [classes.Input]
		};
		// Получаем основные параметры
		this.minLength = props.minLength || false;
		this.maxLength = props.maxLength || false;
		this.regex = props.regex || false;
	}
	// Функция при изменениях
	onChange = event => {
		const text = event.target.value;
		const valid = this.validate(text);
		// Выполняем функцию по изменению (если есть)
		if(this.props.onChange)
			this.props.onChange(valid, this.props.name);
	}
	// Проверяем на правильность
	validate = text => {
		// Проверяем если текст есть
		if(text.length > 0) {
			if (this.minLength !== false && text.length < this.minLength) return this.makeError();
			if (this.maxLength !== false && text.length > this.maxLength) return this.makeError();
			if (this.regex !== false && !this.regex.test(text)) return this.makeError();
			// Успех
			this.makeSuccess();
		} else {
			this.clearStatus();
		}
		return text;
	}
	// Отчистить правильность поля
	clearStatus = () => {
		this.setState({cls: [classes.Input]});
	}
	// Делаем поле верным
	makeSuccess = () => {
		this.setState({cls: [classes.Input, classes.success]});
		return true;
	}
	// Делаем поле неверным
	makeError = () => {
		this.setState({cls: [classes.Input, classes.error]});
		return false;
	}
	// Рендерим
	render() {
		return (
			<div className={this.state.cls.join(" ")}>
				<input
					type={this.props.type}
					placeholder={this.props.placeholder}
					name={this.props.name}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}