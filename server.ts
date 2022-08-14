import { Logger } from "log4js";
import {SignConfig} from "./module/config";
import express from "express";
import SignRouter from "./routes/sign-route"

export function createServer( config: SignConfig, logger: Logger ): void {
	const app = express();
	app.use( express.static( __dirname ) );
	
	app.use( "/api/sign", SignRouter );
	
	app.listen( config.serverPort, () => {
		logger.info( "签到 服务器已启动" );
	} );
}