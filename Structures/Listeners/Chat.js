import Configuration from "../GUI/HSBC_GUI";
let alreadyUsed = false;
const pickaxeNames = [
    "pickaxe",
    "pickonimbus",
    "stonk",
    "gauntlet",
    "drill"
];
import { C08PacketPlayerBlockPlacement, BP } from "../Constants/Packets";

register("chat", (api_key) => {
    ChatLib.chat(`&6[HSBC]&r&e HSBC has updated your API key configuration to:&r&b ${api_key}`);
    Configuration.apiKey = api_key;
}).setCriteria("Your new API key is ${api_key}").setExact();

register("chat", (rank, name, guildRank, message, event) => {
    if (!rank || !name || !guildRank || !message || !Configuration.guildMessageFormat) return;
    if (!Configuration.guildMessageFormat?.includes("{rank}") || !Configuration.guildMessageFormat?.includes("{name}") || !Configuration.guildMessageFormat?.includes("{guildRank}") ||  !Configuration.guildMessageFormat?.includes("{message}")) return ChatLib.chat("&6[HSBC]&r&c The guild message formatting config must have the &r&a{rank}, {name}, {guildRank}, and {message}&r&c fields.&r");
    ChatLib.chat(Configuration.guildMessageFormat?.replace(/{rank}/gim, rank)?.replace(/{name}/gim, name)?.replace(/{guildRank}/gim, guildRank)?.replace(/{message}/gim, message));
    cancel(event);
}).setCriteria("Guild > ${rank} ${name} ${guildRank}: ${message}").setParameter("contains");

register("chat", () => {
    if (Configuration.miningSpeedBoostAlert) {
    Client.showTitle("&aYour &r&6Mining Speed Boost&r&a is available.&r", `${Configuration.advancedTooltips && !Configuration.autoMiningSpeedBoost ? '&aYou can enable&r&6 Mining Speed Boost&r&a to automatically use your pickaxe ability.' : ''}`, 2, 40, 2);
    if (Configuration.autoMiningSpeedBoost) {
        if (!Player.getHeldItem()) return;
        if (alreadyUsed) return;
    let holdingPickaxe = false;
    pickaxeNames.forEach((pickaxe) => {
        if (Player?.getHeldItem()?.getName()?.removeFormatting()?.toLowerCase()?.includes(pickaxe)) holdingPickaxe = true;
    });
    if (!holdingPickaxe && holdingPickaxe !== true) return;
    else Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(Player.getHeldItemIndex()).getItemStack(), 0, 0, 0));
    };
};
}).setCriteria("Mining Speed Boost is now available!").setExact()

register("chat", (cooldown, event) => {
    if (Configuration.hideCooldownMessage) cancel(event);
}).setCriteria("This ability is on cooldown for ${cooldown}.").setExact();

register("chat", (event) => {
    if (Configuration.hideBlocksInTheWay) cancel(event);
}).setCriteria("There are blocks in the way!").setExact();

register("chat", () => {
    if (!alreadyUsed) alreadyUsed = true;
}).setCriteria("You used your Mining Speed Boost Pickaxe Ability!").setExact();

register("chat", () => {
    if (alreadyUsed) alreadyUsed = false;
}).setCriteria("Your Mining Speed Boost has expired!").setExact();

register("chat", () => {
    Client.showTitle("&cYour Hitshield has broken!", "&r&6Your Voidling's Stronghold Buff is now active for the next &a20 seconds!", 2, 40, 2)
}).setCriteria("Your Hitshield have broken! Your Voidling's Stronghold Buff is now active for the next 20 seconds!").setExact();

// register("command", (args) => {
    
// }).setName("test");