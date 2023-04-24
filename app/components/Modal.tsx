import React, { ReactNode } from "react";

interface IModal {
	children: ReactNode;
	className?: string;
}

const Modal = ({ children, className }: IModal) => {
	return (
		<div
			className={`fixed left-0 flex bg-opacity-50 bg-black top-0 h-screen w-screen ${className}`}
		>
			{children}
		</div>
	);
};

export default Modal;
