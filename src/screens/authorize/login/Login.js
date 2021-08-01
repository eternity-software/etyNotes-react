import classes from "./Login.module.scss";
import {Component} from "react";
import {Layout, Form} from "../../../components";
import Header from "../components/Header/Header";
import API from "../../../services/API";
import {Link} from "react-router-dom";

export class Login extends Component{
	constructor(props) {
		super(props);

		// Информация о форме авторизации
		this.form = {
			// Валидна ли форма
			valid: false,
			// Объект с изменяемыми полями
			fields: [
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
		document.title = "Авторизация";

		if(localStorage.getItem("token")){
			this.props.history.push("/dashboard");
		}
	}

	onSubmit = async (fields) => {
		try {

			// Загружаем данные асинхронно из несуществующего места.
			let result = await API.get(`/account/login?email=${fields.email}&password=${fields.password}`);
			if(result.data.type === "success"){
				localStorage.setItem("token", result.data.data.token);
				this.props.history.push("/dashboard");
			} else {
				alert(result.data.data[0].message);
			}

		} catch (e) {
			console.log(`😱 Axios request failed: ${e}`);
		}
	}

	render() {
		return(
			<Layout className={classes.Login}>
				<Header/>
				<main>
					<Form
						title="Вход"
						form={this.form}
						links={[(<Link to="/registration">Регистрация</Link>)]}
						onSubmit={this.onSubmit}
					/>
				</main>
			</Layout>
		);
	}
}