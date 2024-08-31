const { Util, AoiClient, LoadCommands } = require("aoi.js");

const bot = new AoiClient({
token: "TOKEN BURAYA",
prefix: ["$getGuildVar[Prefix]", "$getGuildVar[Prefix] ", "<@!$clientID>", "<@$clientID> "],
intents: ["MessageContent", "GuildMessages", "Guilds", "GuildMembers", "DirectMessages"],
events: ["onMessage", "onInteractionCreate"],
suppressAllErrors: true, //Hata mesajını engeller. -BURAYI DEĞİŞTİRMEYİN!!!-
errorMessage: "", //Hata olduğunda bu mesaj döndürülür. -BURAYI DEĞİŞTİRMEYİN!!!-
disableFunctions: ["$clientToken"],
database: {
type: "aoi.db",
db: require("@akarui/aoi.db"),
tables: ["main"],
securityKey: "32-karakterli-bir-sifre-olusturr",
}
});

bot.status({
name: "Alines Development | Canlı Destek",
type: "STREAMING",
url: "https://www.twitch.tv/ardawn9",
time: "12",
});

bot.command({
name: "$alwaysExecute",
executeAt: "both",
guildOnly: false,
$if: "old",
code: `
$if[($getGlobalUserVar[talep;$authorID]==var)&&($getGlobalUserVar[dm;$authorID]==var)&&($isDM[$channelID]==true)]
$channelSendMessage[$getGlobalUserVar[kanal;$authorID];{newEmbed:{author:$username:$userAvatar}{description:$noMentionMessage}{color:Random}{timestamp}}]
$addMessageReactions[$channelID;$messageID;✅]
$endif

$if[($getGlobalUserVar[talep;$getChannelVar[kullanici;$channelID]]==var)&&($getGlobalUserVar[dm;$getChannelVar[kullanici;$channelID]]==var)&&($isDM[$channelID]==false)&&($stringStartsWith[$noMentionMessage;!]==true)&&($channelName[$channelID]==$username[$getChannelVar[kullanici;$channelID]]-$discriminator[$getChannelVar[kullanici;$channelID]])]
$sendDm[{newEmbed:{author:Yetkili $username:$userAvatar}{description:$replaceText[$noMentionMessage;!;]}{color:Random}{timestamp}};$getChannelVar[kullanici;$channelID];false]
$addMessageReactions[$channelID;$messageID;✅]

$onlyIf[$isUserDmEnabled[$getChannelVar[kullanici;$channelID]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:Karşı tarafın DM kutucuğu kapalı.}
{color:#E34A51}}{reply:$messageID}]
$endif

$onlyIf[$getVar[kurulum]!=yok;]
`
});

bot.variables(require('./değişkenler.js'));

bot.loadCommands("./komutlar/", true);

try { } catch (error) { console.log(error) }