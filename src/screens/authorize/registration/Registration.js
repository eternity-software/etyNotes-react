import classes from "./Registration.module.scss";
import {Component} from "react";
import {Layout, Form} from "../../../components";
import Header from "../components/Header/Header";
import API from "../../../services/API";
import {Link} from "react-router-dom";

export class Registration extends Component{
	constructor(props) {
		super(props);

		// Информация о форме авторизации
		this.form = {
			// Валидна ли форма
			valid: false,
			// Объект с изменяемыми полями
			fields: [
				{
					name: "name",
					type: "text",
					placeholder: "Имя",
					minLength: 4,
					maxLength: 255,
					value: "",
					valid: false
				},
				{
					name: "email",
					type: "email",
					placeholder: "Email",
					regex: /(.*)@(.*)\.(\w+)/gm,
					minLength: 4,
					maxLength: 255,
					value: "",
					valid: false
				},
				{
					name: "password",
					type: "password",
					placeholder: "Пароль",
					minLength: 6,
					value: "",
					valid: false
				}
			]
		}
	}

	componentDidMount() {
		document.title = "Регистрация";
	}

	onSubmit = fields => {
		try {
			this.props.history.push("/activate");
			// Загружаем данные асинхронно из несуществующего места.
			let result = API.get("/account.create", fields);
		} catch (e) {
			console.log(`😱 Axios request failed: ${e}`);
		}
	}

	render() {
		return(
			<Layout className={classes.Registration}>
				<Header/>
				<main>
					<Form
						title="Регистрация"
						form={this.form}
						links={[(<Link to="/login">Авторизация</Link>)]}
						onSubmit={this.onSubmit}
					/>
				</main>
			</Layout>
		);
	}
}