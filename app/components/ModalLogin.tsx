"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormGroup } from "./inputs/InputGlobal";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useUserContext } from "../contexts/UserContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useRef } from "react";

export interface IUserLogin {
	username: string;
	password: string;
}

export const ModalLogin = () => {
	const { loginUser, closeModal, showRegisterForm } = useUserContext();

	const ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		function handleOutClick(event: any) {
			const value = ref?.current;

			if (value && !value.contains(event.target)) {
				closeModal();
			}
		}
		document.addEventListener("mousedown", handleOutClick);

		return () => {
			document.removeEventListener("mousedown", handleOutClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formSchema = yup.object().shape({
		username: yup.string().required("Campo obrigatório"),
		password: yup.string().required("Campo obrigatório"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLogin>({ resolver: yupResolver(formSchema) });

	const onSubmitFunction = (data: IUserLogin) => {
		loginUser(data);
	};
	return (
		<Modal className="items-center justify-center z-10">
			<div
				className="relative flex flex-col items-center max-w-530 p-8 rounded-md bg-white"
				ref={ref}
			>
				<button className="absolute top-1 right-1" onClick={closeModal}>
					<AiOutlineCloseCircle
						size={22}
						color="gray"
						className="hover:bg-gray-50 rounded-full hover:fill-gray-600"
					/>
				</button>
				<div className="flex flex-col items-center">
					<h3 className="font-bold  text-2xl">Seja bem-vindo</h3>
					<span className="font-bold text-gray-500 text-lg pb-6">
						Já sou cliente
					</span>
				</div>
				<form onSubmit={handleSubmit(onSubmitFunction)}>
					<div>
						<FormGroup
							label="Usuário"
							register={register}
							registerName="username"
							errors={errors?.username?.message}
						/>
						<FormGroup
							label="Senha"
							register={register}
							type="password"
							registerName="password"
							errors={errors?.password?.message}
						/>
					</div>
					<button
						type="submit"
						className="font-bold text-lg text-center w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2"
					>
						Entrar
					</button>
				</form>
				<div className="pt-4 flex-col text-center">
					<p>Ainda não tem uma conta?</p>
					<button
						className="font-semibold hover:underline text-blue-700"
						onClick={showRegisterForm}
					>
						Cadastre-se aqui!
					</button>
				</div>
			</div>
		</Modal>
	);
};
