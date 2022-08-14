import express from "express";
import { userGameRolesPromise, hasSignPromise, signPromise } from "../utils/promise";
import { cookies } from "../init";
import Adachi  from "ROOT";

const router = express.Router();

router.get( "/", async ( req, res ) => {
	const cookieList = cookies.getCookies();
	let result: string = "";
	for (const cookie of cookieList) {
		let users;
		try {
			users = await userGameRolesPromise(cookie);
		} catch (error) {
			if (error !== "gotten") {
				result += (error as string);
				continue;
			}
		}
		Adachi.logger.info("绑定角色信息：" + JSON.stringify(users));
		for (const item of users) {
			try {
				Adachi.logger.info(item);
				const signResult = await hasSignPromise(item.game_uid, item.region, cookie);

				Adachi.logger.info("查询是否签到信息：" + JSON.stringify(signResult));

				if (signResult.is_sign) {
					Adachi.logger.info(`用户 ${item.game_uid} ${signResult.today} 已签到，请勿重复签到`);
					result += (` 用户 ${item.game_uid} ${signResult.today} 已签到，请勿重复签到，总签到天数：${signResult.total_sign_day}`);
					continue;
				}
				const sign: Object = await signPromise(item.game_uid, item.region, cookie);

				Adachi.logger.info("签到信息：" + JSON.stringify(sign));

				Adachi.logger.info(`用户 ${item.game_uid} ${signResult.today} 签到成功，总签到天数：${signResult.total_sign_day + 1}`);
				result += (` 用户 ${item.game_uid} ${signResult.today} 签到成功，总签到天数：${signResult.total_sign_day + 1}`);
			} catch (error) {
				if (error !== "gotten") {
					result += (error as string);
					continue;
				}
			}
		}
	}
	Adachi.client.sendPrivateMsg(Adachi.config.master, result);
	res.send( result );
} );

export default router;