import React, {Component} from "react";
import classes from "./Dashboard.module.scss";
import {Layout, TaskList} from "../../../components";
import Sidebar from "../components/Sidebar/Sidebar";
import API from "../../../services/API";

export class Dashboard extends Component{
	constructor(props) {
		super(props);

		this.state = {
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

						API.get(`/desk/getList?token=${token}`).then((result) => {
							if(result.data.type === "success"){
								this.setState({deskLists: result.data.data.desks});
							} else {
								alert(result.data.data[0].message);
							}
						});
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

	render() {
		return (
			<Layout>
				<div className={classes.Dashboard}>
					<Sidebar
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
			</Layout>
		);
	}
}