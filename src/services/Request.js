import Axios from "./Axios";

class Request{
	/**
	 * Send GET request
	 * @param url
	 * @param errorCallback
	 * @param params
	 * @returns {Promise<boolean>}
	 */
	static async get(url, errorCallback = alert, params = {}){
		// Convert object to string query
		let query = "", queryI = 0;
		for(let key in params){
			query += (queryI > 0) ? "&" : "?";
			query += `${key}=${params[key]}`;
			queryI++;
		}

		// Make request
		try{
			const result = await Axios.get(`${url}${query}`).data;

			if(result.type === "success"){
				return result.data;
			} else {
				errorCallback(result.data[0].message);
				return false;
			}
		} catch (e) {
			errorCallback(e);
			return false;
		}
	}
}

export default Request;