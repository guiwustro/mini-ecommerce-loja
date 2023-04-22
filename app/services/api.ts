import axios from "axios";

const dev = "http://localhost:3000";

export const api = axios.create({
	baseURL: dev,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});
