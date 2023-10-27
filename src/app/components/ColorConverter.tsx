"use client";
import React, { useState } from "react";
import colorConvert from "color-convert";
import color from "color";
import { HSL, RGB } from "color-convert/conversions";

export default function ColorConverter() {
	const [colors, setColors] = useState({
		rgb: [0, 0, 0] as RGB,
		hsl: [0, 0, 0] as HSL,
		hex: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		format: string
	) => {
		const { value } = e.target;

		if (value.trim() === "") {
			// If the input is empty, clear all other fields
			setColors({
				rgb: [0, 0, 0],
				hsl: [0, 0, 0],
				hex: "",
			});
			return;
		}

		try {
			// Try to convert the input to different color formats
			let rgb: RGB = [0, 0, 0];
			let hsl: HSL = [0, 0, 0];
			let hex = "";

			if (format == "hex") {
				rgb = colorConvert.hex.rgb(value);
				hsl = colorConvert.hex.hsl(value);
				hex = value;
			}

			if (format == "rgb") {
				const rgbArray = value.split(",").map(Number);
				if (
					rgbArray.length === 3 &&
					rgbArray.every((num) => !isNaN(num))
				) {
					rgb = rgbArray as RGB;
					hsl = colorConvert.rgb.hsl(rgb) as HSL;
					hex = colorConvert.rgb.hex(rgb);
				}
			}

			if (format == "hsl") {
				const hslArray = value.split(",").map(Number);
				if (
					hslArray.length === 3 &&
					hslArray.every((num) => !isNaN(num))
				) {
					hsl = hslArray as HSL;
					rgb = colorConvert.hsl.rgb(hsl);
					hex = colorConvert.hsl.hex(hsl);
				}
			}

			setColors({
				rgb,
				hsl,
				hex,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-full mt-8 text-2xl grid place-content-center space-y-4">
			<h1 className="font-bold text-3xl">Color Converter</h1>
			<div>
				<label htmlFor="rgb">RGB: </label>
				<input
					id="rgb"
					type="text"
					value={colors.rgb.toString()}
					className="px-7 py-2"
					onChange={(e) => handleInputChange(e, "rgb")}
					placeholder="Enter RGB"
					maxLength={12}
				/>
			</div>
			<div>
				<label htmlFor="hsl">HSL: </label>
				<input
					id="hsl"
					type="text"
					value={colors.hsl.toString()}
					className="px-7 py-2"
					onChange={(e) => handleInputChange(e, "hsl")}
					placeholder="Enter HSL"
					maxLength={11}
				/>
			</div>
			<div>
				<label htmlFor="hex">HEX: </label>
				<input
					id="hex"
					type="text"
					value={colors.hex}
					className="px-7 py-2"
					onChange={(e) => handleInputChange(e, "hex")}
					placeholder="Enter HEX"
				/>
			</div>
		</div>
	);
}
