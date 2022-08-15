import { InputParameter } from "@modules/command";
import { signClass } from "../../init";
import { getPrivateAccount } from "#genshin/utils/private";
import { Private } from "#genshin/module/private/main";



export async function main(
	{ sendMessage, messageData, auth }: InputParameter
): Promise<void> {
	const { user_id: userID, raw_message: idMsg } = messageData;
	const info: Private | string = await getPrivateAccount( userID, idMsg, auth );
	if ( typeof info === "string" ) {
		await sendMessage( info );
		return;
	}
	
	const { cookie } = info.setting;
	await signClass.sign(sendMessage, [cookie]);
}