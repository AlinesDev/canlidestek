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
$color[#a260ff]
$thumbnail[$userAvatar[$clientID]]
$addButton[1;Kategori ayarla;secondary;kategori_$authorID;false;⚙️]
$addTimestamp
$else
$reply
$title[📁 Canlı Destek Kurulum]
$description[⚙️ **Yetkili Kategori ID:** $getVar[yetkilikategori]
⚙️ **Canlı Destek Geçmişi Kanal ID:** $getVar[gecmis]

olarak ayarlar ayarlanmış. Ayarları değiştirmek istiyorsanız aşağıdaki butona tıklayınız.]
$color[#a260ff]
$thumbnail[$userAvatar[$clientID]]
$addButton[1;Kurulumu sıfırla;danger;sıfırla_$authorID;false;❌]
$addTimestamp
$endif

$globalCooldown[15s;
{newEmbed:
{title:❌ **Biraz bekle!**}
{description:Bu komutu tekrar kullanabilmek için **%sec% Saniye** kadar beklemelisin.}
{color:#E34A51}}{options:{reply:$messageID}}]

$onlyPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmanız gerekiyor.}
{color:#E34A51}}{options:{reply:$messageID}}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$setVar[kurulum;yok]
$setVar[yetkilikategori;yok]
$setVar[gecmis;yok]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek Kurulum \`2/2\`}{description:Canlı Destek kurulumu başarıyla sıfırlandı ve kapatıldı.}{color:E34A51}{timestamp}{thumbnail:$userAvatar[$clientID]}};{actionRow:{button:Kurulumu sıfırla:danger:sıfırla_$authorID:true:❌}}]

$onlyPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{interaction:true}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==sıfırla;]
`

}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Kategori ID;kategori;
{actionRow:
{textInput:kategori:1:kategori:true:Kategori ID belirtin.:1:25}
}
]

$onlyIf[$getVar[kurulum]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu zaten açık.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{interaction:true}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==kategori;]
`

}, {
name: "kategori",
type: "interaction",
prototype: "modal",
code: `
$setVar[yetkilikategori;$textInputValue[kategori]]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek Kurulum \`2/2\`}{description:⚙️ **Yetkili Kategori ID:** $textInputValue[kategori]
olarak ayarlandı ve kurulumun son adımına geçildi.

**2.** Canlı desteklerin geçmişi hangi kanala gönderilsin?

❗️ **UYARI!** Seçeceğiniz kanalın izinlerinde sadece Canlı Destek verebilecek yetkililerin görebilmesini ayarlamayı unutmayın.}{color:a260ff}{timestamp}{thumbnail:$userAvatar[$clientID]}};{actionRow:{button:Kanal ayarla:secondary:kanal_$authorID:false:⚙️}{button:Kurulumu sıfırla:danger:sıfırla_$authorID:false:❌}}]

$onlyIf[$channelExists[$textInputValue[kategori]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:Sunucuda böyle bir **kategori ID** bulunmuyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu zaten açık.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`

}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Kanal ID;kanal;
{actionRow:
{textInput:kanal:1:kanal:true:Kanal ID belirtin.:1:25}
}
]

$onlyIf[$getVar[kurulum]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu zaten açık.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{interaction:true}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==kanal;]
`

}, {
name: "kanal",
type: "interaction",
prototype: "modal",
code: `
$setVar[kurulum;var]
$setVar[gecmis;$textInputValue[kanal]]
$setVar[sunucu;$guildID]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek Kurulum \`2/2\`}{description:⚙️ **Yetkili Kategori ID:** $getVar[yetkilikategori]
⚙️ **Canlı Destek Geçmişi Kanal ID:** $textInputValue[kanal]
olarak ayarlandı ve kurulum tamamlandı!

İstediğiniz zaman tekrardan **$getGuildVar[Prefix]kurulum** komutunu kullandığınızda ayarları değiştirebilirsiniz.}{color:7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}};{actionRow:{button:Kanal ayarla:success:kanal_$authorID:true:⚙️}{button:Kurulumu sıfırla:danger:sıfırla_$authorID:true:❌}}]

$onlyIf[$guildChannelExists[$guildID;$textInputValue[kanal]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:Sunucuda böyle bir **kanal ID** bulunmuyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu zaten açık.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyPerms[administrator;
{newEmbed:
{title:❌ **Hata!**}
{description:Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`
}]