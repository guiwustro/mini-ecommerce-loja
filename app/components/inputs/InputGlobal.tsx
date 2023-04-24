import { UseFormRegister } from "react-hook-form";

interface IFormGroupProps {
	errors?: string;
	register: UseFormRegister<any>;
	label: string;
	registerName: string;
	type?: "password" | "text";
	defaultValue?: string;
}

export const FormGroup = ({
	errors,
	register,
	registerName,
	label,
	defaultValue,
	type = "text",
}: IFormGroupProps) => {
	return (
		<div
			className={`flex relative flex-col w-full h-20 ${
				errors ? "border-red-500" : "border-gray-0"
			}`}
		>
			<label
				className={`font-medium ${errors ? "text-red-500" : "text-gray-0"}`}
				htmlFor={registerName}
			>
				{label}
			</label>
			<input
				type={type}
				id={registerName}
				placeholder=" "
				{...register(registerName)}
				defaultValue={defaultValue}
				className={`outline-gray-600 w-full rounded-md px-4 h-10 bg-gray-50 border-2 ${
					errors ? "border-red-500" : "border-gray-0"
				} `}
			/>

			{!!errors && <p className="text-red-500 text-xs">{errors}</p>}
		</div>
	);
};
