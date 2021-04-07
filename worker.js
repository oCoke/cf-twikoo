addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})

const reqUrl = "https://tcb-api.tencentcloudapi.com/web?env=" + ENVID
const date = new Date();
const time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
/**
 * 获取 Refresh Token
 * @returns {string} Refresh Token 值
 */
async function get_refresh_token() {
    const step_1_body = {
        action: "auth.signInAnonymously",
        anonymous_uuid: "",
        dataVersion: time,
        env: ENVID,
        refresh_token: "",
        seqId: ""
    }
    const step_1 = {
        body: JSON.stringify(step_1_body),
        method: "POST",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    }
    return JSON.parse(await (await fetch(reqUrl, step_1)).text())["refresh_token"]
}
/**
 * 获取 Access Token
 * @param {string} refresh_token 获得的 Refresh Token
 * @returns {string} Access Token 的值
 */
async function get_access_token(refresh_token) {
    const step_2_body = {
        action: "auth.fetchAccessTokenWithRefreshToken",
        anonymous_uuid: "",
        dataVersion: time,
        env: ENVID,
        refresh_token: refresh_token,
        seqId: ""
    }
    const step_2 = {
        body: JSON.stringify(step_2_body),
        method: "POST",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    }
    return JSON.parse(await (await fetch(reqUrl, step_2)).text())["access_token"];
}

async function get_comment(access_token, path, before) {
    const re_data = { "event": "COMMENT_GET", "reqUrl": path, "before": before }
    const step_3_body = {
        access_token: access_token,
        action: "functions.invokeFunction",
        dataVersion: time,
        env: ENVID,
        function_name: "twikoo",
        request_data: JSON.stringify(re_data),
        seqId: ""
    }
    const step_3 = {
        body: JSON.stringify(step_3_body),
        method: "POST",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    }
    return (await (await fetch(reqUrl, step_3)).text())
}
async function handleRequest(req) {

    const path = req["path"]
    const before = req["before"]
    let refresh_token = await KVNAME.get("hpp_comment_refresh_token")
    let access_token = await KVNAME.get("hpp_comment_access_token")
    let val = await get_comment(access_token, path, before)
    if (await JSON.parse(val)['code'] == 'CHECK_LOGIN_FAILED') {
        refresh_token = await get_refresh_token()
        await KVNAME.put("hpp_comment_refresh_token", refresh_token)
        access_token = await get_access_token(refresh_token)
        await KVNAME.put("hpp_comment_access_token", access_token)
        val = await get_comment(access_token, path, before)
    }
    return new Response(val, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    )
}