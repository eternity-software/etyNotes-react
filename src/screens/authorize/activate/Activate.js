import classes from "./Activate.module.scss";
import {Component} from "react";
import {Layout, Form} from "../../../components";
import Header from "../components/Header/Header";
import API from "../../../services/API";
import {Link} from "react-router-dom";

export class Activate extends Component{
	constructor(props) {
		super(props);

		// Информация о форме активации
		this.form = {
			// Валидна ли форма
			valid: false,
			// Объект с изменяемыми полями
			fields: [
				{
					name: "code",
					type: "text",
					regex: /(\d+)/gm,
					placeholder: "Код подтверждения",
					minLength: 6,
					maxLength: 6,
					value: "",
					valid: false
				}
			]
		}
	}

	componentDidMount() {
		document.title = "Активация аккаунта";
	}

	onSubmit = async (fields) => {
		try {
			const token = localStorage.getItem("token");
			// Загружаем данные асинхронно из несуществующего места.
			let result = await API.get(`/account/activate?token=${token}&code=${fields.code}`);
			if(result.data.type === "success"){
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
			<Layout className={classes.Activate}>
				<Header/>
				<main>
					<Form
						title="Подтверждение"
						form={this.form}
						links={[<Link to="/login">Вход</Link>]}
						onSubmit={this.onSubmit}
					>
						<p className={classes.subtext}>Введите код, отправленный на <a href="mailto:test@test.su">test@test.su</a></p>
					</Form>
				</main>
			</Layout>
		);
	}
}