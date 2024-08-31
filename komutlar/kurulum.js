module.exports = [{
name: "kurulum",
aliases: ["setup", "kur"],
$if: "old",
code: `
$if[$getVar[kurulum]==yok]
$reply
$title[📁 Canlı Destek Kurulum \`1/2\`]
$description[Şimdi kurulumun ilk adımındayız. Kurulum oldukça sade ve kısadır.

**1.** Canlı destekler için hangi kategori altında kanallar açılsın?

❗️ **UYARI!** Seçeceğiniz kategorinin izinlerinde sadece Canlı Destek verebilecek yetkililerin görebilmesini ayarlamayı unutmayın.]
$color[#A260FF]
$thumbnail[$userAvatar[$clientID]]
$addSelectMenu[1;channel;kategori_$authorID;⚙️ Kategori ayarla;1;1;false]
$addTimestamp
$else
$reply
$title[📁 Canlı Destek Kurulum]
$description[⚙️ **Yetkili Kategori ID:** $getVar[yetkilikategori]
⚙️ **Canlı Destek Geçmişi Kanal ID:** $getVar[gecmis]

olarak ayarlar ayarlanmış. Ayarları değiştirmek istiyorsanız aşağıdaki butona tıklayınız.]
$color[#A260FF]
$thumbnail[$userAvatar[$clientID]]
$addButton[1;Kurulumu sıfırla;danger;sıfırla_$authorID;false;❌]
$addTimestamp
$endif

$globalCooldown[15s;
{newEmbed:
{title:❌ **Biraz bekle!**}
{description:Bu komutu tekrar kullanabilmek için **%sec% Saniye** kadar beklemelisin.}
{color:#E34A51}}{reply:$messageID}]

$onlyForIDs[$getVar[sahipid];
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu sadece sahiplerim kullanabilir.}
{color:#E34A51}}{reply:$messageID}]

$onlyClientPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Çalışabilmem için **YÖNETİCİ** yetkisine sahip olmam gerekiyor.}
{color:#E34A51}}{reply:$messageID}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$setVar[kurulum;yok]
$setVar[yetkilikategori;yok]
$setVar[gecmis;yok]
$interactionUpdate[{newEmbed:{title:📁 Canlı Destek Kurulum \`0/2\`}{description:Canlı Destek kurulumu başarıyla sıfırlandı ve kapatıldı.}{color:E34A51}{timestamp}{thumbnail:$userAvatar[$clientID]}}{actionRow:{button:Kurulumu sıfırla:danger:sıfırla_$authorID:true:❌}}]

$onlyForIDs[$getVar[sahipid];
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu sadece sahiplerim kullanabilir.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyClientPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Çalışabilmem için **YÖNETİCİ** yetkisine sahip olmam gerekiyor.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==sıfırla;]
`

}, {
type: "interaction",
prototype: "selectMenu",
code: `
$setVar[yetkilikategori;$interactionData[values[0]]]
$interactionUpdate[{newEmbed:{title:📁 Canlı Destek Kurulum \`2/2\`}{description:⚙️ **Yetkili Kategorisi:** <#$interactionData[values[0]]>
olarak ayarlandı ve kurulumun son adımına geçildi.

**2.** Canlı desteklerin geçmişi hangi kanala gönderilsin?

❗️ **UYARI!** Seçeceğiniz kanalın izinlerinde sadece Canlı Destek verebilecek yetkililerin görebilmesini ayarlamayı unutmayın.}{color:A260FF}{timestamp}{thumbnail:$userAvatar[$clientID]}}{actionRow:{button:Kurulumu sıfırla:danger:sıfırla_$authorID:false:❌}}{actionRow:{selectMenu:kanal_$authorID:⚙️ Kanal Ayarla:1:1:false:{channelInput}}}]

$onlyIf[$guildChannelExists[$guildID;$interactionData[values[0]]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:Sunucuda böyle bir **kategori** bulunmuyor.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$channelType[$interactionData[values[0]]]==category;
{newEmbed:
{title:❌ **Hata!**}
{description:Lütfen geçerli bir **kategori** seçin.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$getVar[kurulum]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu zaten açık.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyForIDs[$getVar[sahipid];
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu sadece sahiplerim kullanabilir.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyClientPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Çalışabilmem için **YÖNETİCİ** yetkisine sahip olmam gerekiyor.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==kategori;]
`

}, {
type: "interaction",
prototype: "selectMenu",
code: `
$setVar[kurulum;var]
$setVar[gecmis;$interactionData[values[0]]]
$setVar[sunucu;$guildID]
$interactionUpdate[{newEmbed:{title:📁 Canlı Destek Kurulum \`2/2\`}{description:⚙️ **Yetkili Kategorisi:** <#$getVar[yetkilikategori]>
⚙️ **Canlı Destek Geçmişi Kanalı:** <#$interactionData[values[0]]>
olarak ayarlandı ve kurulum tamamlandı!

İstediğiniz zaman tekrardan **$getGuildVar[Prefix]kurulum** komutunu kullandığınızda ayarları değiştirebilirsiniz.}{color:7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}}]

$onlyIf[$guildChannelExists[$guildID;$interactionData[values[0]]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:Sunucuda böyle bir **kanal** bulunmuyor.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$channelType[$interactionData[values[0]]]==text;
{newEmbed:
{title:❌ **Hata!**}
{description:Lütfen geçerli bir **metin kanalı** seçin.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$guildChannelExists[$guildID;$getVar[yetkilikategori]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:**1. Adımdaki** kurulumda sorun yaşandı. Lütfen kurulumu tekrar yapın.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$getVar[kurulum]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu zaten açık.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyForIDs[$getVar[sahipid];
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu sadece sahiplerim kullanabilir.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyClientPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Çalışabilmem için **YÖNETİCİ** yetkisine sahip olmam gerekiyor.}
{color:#E34A51}}{interaction}{ephemeral}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==kanal;]
`
}]