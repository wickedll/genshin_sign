import { InputParameter } from "@modules/command";
import { signClass } from "../init";



export async function main(
	{ sendMessage }: InputParameter
): Promise<void> {
	await signClass.sign(sendMessage);
}