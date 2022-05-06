import { request } from "./Structures/Modules/request/request";
import Configuration from "./Structures/GUI/HSBC_GUI";
const pUuid = Player.getUUID();
const headers = {
    "User-Agent": "Mozilla/5.0@HypixelSkyblockCustom"
};
let authenticated = false;

(function () {
request({
    url: `https://s.edemarz.repl.co/whitelisted/${pUuid}`,
    json: false,
    connectTimeout: 10000,
    headers: headers
}).then((resp) => {
    console.log(pUuid);
    const whitelisted = JSON.parse(resp["body"])["whitelisted"];
    if (whitelisted) ChatLib.chat("&6[HSBC]&r&a You have been whitelisted, have fun with HSBC!");
    else ChatLib.chat("&6[HSBC]&r&c You are not whitelisted, therefore you cannot use HSBC.");
}).catch((err) => {
    ChatLib.chat(`&6[HSBC]&r&c HSBC has ran into an error while authenticating user, we are sorry for the inconvenience.`);
    });
})();

export { authenticated };