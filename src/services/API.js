import Request from "./Request";
import {Redirect} from "react-router-dom";

class API {

	/**
	 * Authentication user
	 */
	static async auth(){
		const result = {};
		const token = localStorage.getItem("token");
		const request = await Request.get("/account/getInfo", alert, {token});

		if(request.account.activated === "Y"){
			result.account = request.account;

			const requestDesks = await Request.get("/desk/getList", alert, {token});
			if(requestDesks) {
				result.deskLists = requestDesks.desks;
			}

			return result;
		} else {
			return (<Redirect to="/activate" />);
		}
	}

	error(e){
		console.log(`😱 Axios request failed: ${e}`);
	}
}

export default API;