import axios from "axios";

// const dev = "http://localhost:3000";
const prod = "https://mini-e-commerce-back-end-nestjs.vercel.app/";

export const api = axios.create({
	baseURL: prod,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});
