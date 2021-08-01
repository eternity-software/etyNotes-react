import React, {Component} from "react";
import classes from "./Dashboard.module.scss";
import {Layout, TaskList} from "../../../components";
import {ModalWindow} from "../../../components/ModalWindow/ModalWindow";
import Sidebar from "../components/Sidebar/Sidebar";
import API from "../../../services/API";
import Axios from "../../../services/Axios";

export class Dashboard extends Component{



	constructor(props) {
		super(props);

		this.state = {
			token: "",
			newDeskInput: "",
			newDeskDesc: "",
			newListInput: "",
			newListDesc: "",
			selectedDesk: 0,
			account: {},
			deskLists: [],
			taskLists: [
				{
					id: 1,
					name: "абхчба",
					list: [
						{
							text: "ауе блин",
							username: "PIDOR",
							self: true,
							status: true
						}
					]
				},

				{
					id: 2,
					name: "кто это написал",
					list: [
						{
							text: "оп оп суп",
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

			Axios.get(`/account/getInfo?token=${token}`).then((result) => {
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
		Axios.get(`/desk/getList?token=${token}`).then((result) => {
			if(result.data.type === "success"){
				this.setState({deskLists: result.data.data.desks, token: token});
			} else {
				alert(result.data.data[0].message);
			}
		});
	}



	updateDeskTasks = (deskId) => {
		this.setState({selectedDesk: deskId});
		let token = this.state.token;
		Axios.get(`/desk/getTaskLists?token=${token}&deskId=${deskId}`).then((result) => {
			if(result.data.type === "success"){
				this.setState({taskLists: result.data.data.lists});
			} else {
				alert(result.data.data[0].message);
			}
		});
	}

	removeDesk = (id) => {
		let token = this.state.token;
		Axios.get(`/desk/remove?token=${token}&id=${id}`).then((result) => {
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

				console.log(token);

				Axios.get(`/desk/create?token=${token}&name=${name}&description=${description}`).then((result) => {
					if (result.data.type === "success") {
						this.updateDesks(token);
						window.location.href = "#close";
					} else {
						alert(result.data.data[0].message);
					}
				});
			} catch (e) {
				alert(e)
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

	closeNewList = () => {
		window.location.href = "#close";
	};

	createNewList = () => {
		if(this.state.newListInput.length > 4 && this.state.newListDesc.length > 4) {
			try {
				const token = localStorage.getItem("token");
				const name = this.state.newListInput;
				const description = this.state.newListDesc;
				const deskId = this.state.selectedDesk;

				console.log(token);

				Axios.get(`/list/create?token=${token}&name=${name}&description=${description}&deskId=${deskId}`).then((result) => {
					if (result.data.type === "success") {
						this.updateDesks(token);

						window.location.href = "#close";
					} else {
						alert(result.data.data[0].message);
					}
				});
			} catch (e) {
				alert(e)
				console.log(`😱 Axios request failed: ${e}`);
			}
		}
		else
		{
			alert("Некорректные данные.")
		}
	};

	changeNewListInput = (valid, shit, e) => {
		this.setState({newListInput: e.target.value});
	};

	changeNewListDescription = (valid, shit,  e) => {
		this.setState({newListDesc: e.target.value});
	};

	render() {
		return (

			<Layout>

				<div className={classes.Dashboard}>
					<Sidebar
						removeDesk={this.removeDesk}

						token={this.state.token}
						clickDesk={this.updateDeskTasks}
						deskLists={this.state.deskLists}
					/>
					<div className={classes.rows}>
						<h3>Название доски</h3>
						<a href="#win2">Создать список</a>
					</div>
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
				<ModalWindow id="win2" secondInputPlaceholder="Описание" secondInputChange={this.changeNewListDescription} secondInput={true} changeInput={this.changeNewListInput} newDesk={this.createNewList} closeClick={this.closeNewList} title="Создать список" text="Введите название нового списка" placeholder="Название"/>
				<ModalWindow id="win1" secondInputPlaceholder="Описание" secondInputChange={this.changeNewDeskDescription} secondInput={true} changeInput={this.changeNewDeskInput} newDesk={this.createNewDesk} closeClick={this.closeNewDesk} title="Создать стол" text="Введите название нового стола" placeholder="Название"/>

			</Layout>
		);
	}
}