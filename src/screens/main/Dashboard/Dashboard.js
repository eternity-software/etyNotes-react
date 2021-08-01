import React, {Component} from "react";
import classes from "./Dashboard.module.scss";
import {Layout, TaskList} from "../../../components";
import {ModalWindow} from "../../../components/ModalWindow/ModalWindow";
import Sidebar from "../components/Sidebar/Sidebar";
import API from "../../../services/API";

export class Dashboard extends Component{



	constructor(props) {
		super(props);

		this.state = {
			token: "",
			newDeskInput: "",
			newDeskDesc: "",
			account: {},
			deskLists: [],
			taskLists: [
				{
					id: 1,
					title: "Соси мой член 2004",
					list: [
						{
							text: "Пососи мой бигбон",
							username: "PIDOR",
							self: true,
							status: true
						}
					]
				},

				{
					id: 2,
					title: "Соси мой член 2005",
					list: [
						{
							text: "Пососи мой ролтон",
							username: "СУЧАРА",
							self: false,
							status: false
						}
					]
				}
			]
		};
	}





	componentDidMount() {
		document.title = "Панель управления";

		try {
			const token = localStorage.getItem("token");

			API.get(`/account/getInfo?token=${token}`).then((result) => {
				if(result.data.type === "success"){
					if(result.data.data.account.activated === "Y"){
						this.setState({account: result.data.data.account});
						this.updateDesks(token);

					} else {
						this.props.history.push("/activate");
					}
				} else {
					alert(result.data.data[0].message);
				}
			});
		} catch (e) {
			console.log(`😱 Axios request failed: ${e}`);
		}
	}

	updateDesks = (token) => {
		console.log(token);
		API.get(`/desk/getList?token=${token}`).then((result) => {
			if(result.data.type === "success"){
				this.setState({deskLists: result.data.data.desks, token: token});
			} else {
				alert(result.data.data[0].message);
			}
		});
	}



	updateDeskTasks = (token) => {
		API.get(`/desk/get?token=${token}`).then((result) => {
			if(result.data.type === "success"){
				this.setState({deskLists: result.data.data.desks});
			} else {
				alert(result.data.data[0].message);
			}
		});
	}

	removeDesk = (id) => {
		let token = this.state.token;
		API.get(`/desk/remove?token=${token}&id=${id}`).then((result) => {
			if(result.data.type === "success"){
				this.updateDesks(token);
			} else {
				console.log(result);
			}
		});
	}


	closeNewDesk = () => {
		window.location.href = "#close";
	};

	createNewDesk = () => {
		if(this.state.newDeskInput.length > 4 && this.state.newDeskDesc.length > 4) {
			try {
				const token = localStorage.getItem("token");
				const name = this.state.newDeskInput;
				const description = this.state.newDeskDesc;

				API.get(`/desk/create?token=${token}&name=${name}&description=${description}`).then((result) => {
					if (result.data.type === "success") {
						this.updateDesks(token);
						window.location.href = "#close";
					} else {
						alert(result.data.data[0].message);
					}
				});
			} catch (e) {
				console.log(`😱 Axios request failed: ${e}`);
			}
		}
		else
		{
			alert("Некорректные данные.")
		}
	};

	changeNewDeskInput = (valid, shit, e) => {
		this.setState({newDeskInput: e.target.value});
	};

	changeNewDeskDescription = (valid, shit,  e) => {
		this.setState({newDeskDesc: e.target.value});
	};

	render() {
		return (

			<Layout>

				<div className={classes.Dashboard}>
					<Sidebar
						removeDesk={this.removeDesk}

						token={this.state.token}

						deskLists={this.state.deskLists}
					/>

					<div className={classes.content}>

						{
							this.state.taskLists.map((el, index) => {
								return (
									<TaskList
										key={index}
										{...el}
									/>
								);
							})
						}
					</div>
				</div>

				<ModalWindow secondInputPlaceholder="Описание" secondInputChange={this.changeNewDeskDescription} secondInput={true} changeInput={this.changeNewDeskInput} newDesk={this.createNewDesk} closeClick={this.closeNewDesk} title="Создать стол" text="Введите название нового стола" placeholder="Название"/>

			</Layout>
		);
	}
}