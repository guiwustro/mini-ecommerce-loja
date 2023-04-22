import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${poppins.variable}`}
		>
			<h1 className="mt-4 p-4 ">teste</h1>
		</main>
	);
}
