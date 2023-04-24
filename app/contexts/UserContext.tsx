"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { IUserLogin } from "../components/ModalLogin";
import { api } from "../services/api";
import { toast } from "react-hot-toast";

type IActualModalForm = "login" | "register" | "closed";

interface IUserProvider {
	children: ReactNode;
}

interface ILoginRes {
	data: {
		token: string;
	};
}

interface IProductOrder {
	_id: string;
	amount: number;
	product: {
		name: string;
		price: number;
		is_active: boolean;
		created: string;
	};
}
interface IOrderUser {
	_id: string;
	user: string;
	products: IProductOrder[];
	total_price: number;
	status: "awaiting";
	created: string;
}
interface IOrderUserRes {
	data: IOrderUser[];
}

interface IUserContext {
	actualModalForm?: IActualModalForm;
	showRegisterForm: () => void;
	showLoginForm: () => void;
	closeModal: () => void;
	loginUser: (data: IUserLogin) => void;
	logout: () => void;
	createUser: (userData: IUserLogin) => Promise<void>;
	isAuthenticated: boolean;
	getUserOrder: () => Promise<void>;
	userOrder?: IOrderUser[];
}

const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProvider) => {
	const [actualModalForm, setActualModalForm] =
		useState<IActualModalForm>("closed");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userOrder, setUserOrder] = useState<IOrderUser[]>();
	const showRegisterForm = () => setActualModalForm("register");
	const showLoginForm = () => setActualModalForm("login");
	const closeModal = () => setActualModalForm("closed");

	const loginUser = async (loginData: IUserLogin) => {
		toast.loading("Loading infos... ");
		try {
			const { data }: ILoginRes = await api.post("/login", loginData);
			localStorage.setItem("@mini-ecommerce:token", data.token);
			api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
			closeModal();
			setIsAuthenticated(true);
			toast.dismiss();
			toast.success("Login realizado com sucesso!", {
				duration: 3000,
			});
		} catch (error) {
			console.log(error);
			toast.dismiss();
			toast.error("Wrong username or password.");
		}
	};

	const getUserOrder = async () => {
		const token = localStorage.getItem("@mini-ecommerce:token");
		if (!token) return;
		try {
			api.defaults.headers.common[
				"Authorization"
			] = `Bearer ${localStorage.getItem("@mini-ecommerce:token")}`;
			const { data }: IOrderUserRes = await api.get("/orders");
			setIsAuthenticated(true);
			setUserOrder(data);
		} catch (error) {
			setIsAuthenticated(false);
			localStorage.removeItem("@mini-ecommerce:token");
		}
	};

	const createUser = async (userData: IUserLogin) => {
		toast.loading("Creating your account... ");
		api
			.post("/users", userData)
			.then((data) => {
				toast.dismiss();
				closeModal();
				toast.success("Registration successful. Please login now.");
			})
			.catch((error) => {
				toast.dismiss();
				toast.error("username already registered. Please use another.");
			});
	};

	const logout = () => {
		localStorage.removeItem("@mini-ecommerce:token");
		setIsAuthenticated(false);
	};

	return (
		<UserContext.Provider
			value={{
				actualModalForm,
				showRegisterForm,
				showLoginForm,
				closeModal,
				loginUser,
				createUser,
				logout,
				isAuthenticated,
				getUserOrder,
				userOrder,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
