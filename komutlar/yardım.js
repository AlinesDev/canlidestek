module.exports = [{
name: "help",
executeAt: "both",
guildOnly: false,
aliases: ["yardım", "yardim", "menü", "liste", "list", "menu"],
code: `
$reply
$title[📁 Canlı Destek Yardım]
$thumbnail[$userAvatar[$clientID]]
$color[#A260FF]
$description[# 🛠️ Komutlar
- \`$getGuildVar[Prefix]destek\` - **Canlı Destek açarsınız.**
- \`$getGuildVar[Prefix]kurulum\` - **Botu kurarsınız.**
- \`$getGuildVar[Prefix]istatistik\` - **Canlı Destek istatistiklerinize bakarsınız.**

## 🤖 Sürüm
- **v1.0.0**

### ❤️ Özel Teşekkürler
- **[Ardawn](https://github.com/ardawn9) (Yapımcı)**]
$footer[AlinesDev tarafından ❤️ ile yapıldı.;$userAvatar[$clientID]]
$addTimestamp

$globalCooldown[15s;
{newEmbed:
{title:❌ **Biraz bekle!**}
{description:Bu komutu tekrar kullanabilmek için **%sec% Saniye** kadar beklemelisin.}
{color:#E34A51}}{reply:$messageID}]
`
}]