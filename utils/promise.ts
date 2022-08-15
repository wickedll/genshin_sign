import * as api from "./api";
import { cookies } from "../init";

export enum ErrorMsg {
	NOT_FOUND = "未查询到角色数据，请检查米哈游通行证（非UID）是否有误或是否设置角色信息公开",
	UNKNOWN = "发生未知错误",
	FORM_MESSAGE = "米游社接口报错: "
}

type SignResult = {
	total_sign_day: number,
	today: string,
	is_sign: boolean,
	first_bind: boolean
};

type UserGameRolesData = {
	region: string,
	game_biz: string,
	game_uid: number,
	nickname: string,
	level: number,
	is_chosen: string,
	region_name: string,
	is_official: string
};


export async function signPromise( uid: number, region: string, cookie: string): Promise<object> {
	const { retcode, message, data } = await api.sign( uid, region, cookie ? cookie : cookies.get() );
	
	return new Promise( async ( resolve, reject ) => {
		if ( retcode !== 0 ) {
			reject( `米游社接口报错: ${ message }` );
			return;
		}
		resolve( data );
	} );
}

export async function hasSignPromise( uid: number, region: string, cookie: string): Promise<SignResult> {
	const { retcode, message, data } = await api.getHasSign( uid, region, cookie ? cookie : cookies.get() );
	
	return new Promise( async ( resolve, reject ) => {
		if ( retcode !== 0 ) {
			reject( `米游社接口报错: ${ message }` );
			return;
		}

		resolve( data );
	} );
}

export async function userGameRolesPromise(cookie: string): Promise<UserGameRolesData[]> {
	const { retcode, message, data } = await api.getUserGameRolesByCookie( cookie ? cookie : cookies.get() );
	
	return new Promise( async ( resolve, reject ) => {
		if ( retcode !== 0 ) {
			reject( `米游社接口报错: ${ message }` );
			return;
		} else if ( !data.list || data.list.length === 0 ) {
			reject( "未查询到绑定账号信息，请检查米哈游通行证（非UID）是否有误或是否有绑定账号" );
			return;
		}
		resolve( data.list );
	} );
}