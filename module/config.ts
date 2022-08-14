import FileManagement from "@modules/file";

export class SignConfig {
	public readonly openTiming: boolean;
	public readonly cron: string;
	public readonly serverPort: number;
	
	static initObject = {
		openTiming: false,
		cron: "0 0 7 * * *",
		serverPort: 58613,
	};
	
	constructor( file: FileManagement ) {
		const config = file.loadYAML( "genshin_sign" );
		
		this.openTiming = config.openTiming;
		this.cron = config.cron;
		this.serverPort = config.serverPort;
	}
}