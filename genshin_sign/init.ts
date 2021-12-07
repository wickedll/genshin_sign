import { PluginSetting } from "@modules/plugin";
import { OrderConfig } from "@modules/command";
import { AuthLevel } from "@modules/management/auth";
import { MessageScope } from "@modules/message";
import {Cookies} from "./module/cookies";
import {SignConfig} from "./module/config";
import {SignClass} from "./module/sign";
import bot from "ROOT";
import { createServer } from "./server";

export const cookies = new Cookies();
export const signConfig = new SignConfig(bot.file);
export const signClass = new SignClass(signConfig, cookies);

const sign: OrderConfig = {
	type: "order",
	cmdKey: "genshin.mys.sign",
	desc: [ "米游社签到", ""],
	headers: [ "mysSign" ],
	regexps: [ "" ],
	main: "achieves/sign",
	auth: AuthLevel.Manager,
	detail: "使用配置中cookie的米游社签到",
    scope: MessageScope.Private
}

export async function init(): Promise<PluginSetting> {
	if(!signConfig.openTiming){
		createServer(signConfig, bot.logger);
	}
    return { 
        pluginName: "genshin_sign", 
        cfgList: [ sign ] 
    };
}