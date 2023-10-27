import Image from "next/image";
import ColorConverter from "./components/ColorConverter";
import ColorContrast from "./components/ColorContrast";

export default function Home() {
	return (
		<main>
			<ColorConverter />
			<ColorContrast />
		</main>
	);
}
