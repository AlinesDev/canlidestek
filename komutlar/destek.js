module.exports = [{
name: "destek",
executeAt: "both",
guildOnly: false,
aliases: ["ticket", "support"],
code: `
$reply
$title[📁 Canlı Destek]
$description[Destek talebi oluşturmak için bir kategori belirtmelisiniz. Lütfen konunuz yetkilileri ilgilendiren, ciddi bir şey ise destek talebini oluşturun.

❗️ **NOT!** Botun size DM üzerinden ulaşabilme imkanı olması gerekiyor.]
$color[#a260ff]
$thumbnail[$userAvatar[$clientID]]
$addTimestamp
$addSelectMenu[1;destekmenu_$authorID;👉 Kategori seç.;1;1;false;Premium:Premium almak istiyorum.:pre:false:💎;Yardım:Yardım almak istiyorum.:yardım:false:⛑️;Diğer:Başka konular hakkında konuşmak istiyorum.:diger:false:📙]

$globalCooldown[15s;
{newEmbed:
{title:❌ **Biraz bekle!**}
{description:Bu komutu tekrar kullanabilmek için **%sec% Saniye** kadar beklemelisin.}
{color:#E34A51}}{options:{reply:$messageID}}]

$onlyIf[$isUserDmEnabled[$authorID]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:DM kutucuğunuz kapalı. Botun sana DM üzerinden ulaşabilmesi için DM kutucuğunuzu açmanız gerekiyor.}
{color:#E34A51}}{options:{reply:$messageID}}]

$onlyIf[$getGlobalUserVar[talep;$authorID]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten devam etmekte olan **$getGlobalUserVar[konu;$authorID]** konulu bir destek talebin var. (DM kutucuğumu kontrol edin.)}
{color:#E34A51}}{options:{reply:$messageID}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{reply:$messageID}}]
`
}, {
type: "interaction",
prototype: "selectMenu",
code: `
$setGlobalUserVar[talep;var;$authorID]
$setGlobalUserVar[konu;Yardım;$authorID]
$setGlobalUserVar[acilan;$sum[$getGlobalUserVar[acilan;$authorID];1];$authorID]
$setChannelVar[kullanici;$authorID;$get[canli]]
$pinMessage[$get[mesaj];$get[canli]]
$let[mesaj;$channelSendMessage[$get[canli];{newEmbed:{title:📁 Canlı Destek}
{description:**[$username[$authorID]#$discriminator[$authorID]](https://discord.com/users/$authorID)** adlı kişi **Yardım** konulu bir canlı destek oluşturdu.}{color:a260ff}{thumbnail:$userAvatar[$clientID]}{timestamp}};true]]
$title[📁 Canlı Destek]
$color[#a260ff]
$addTimestamp
$description[Canlı destek Eğer onaylanırsa konuşma başlayacak ve bu destekte konuşulanlar kayıt altına alınacak. Canlı destek onaylanmazsa bu kanal kapatılacak ve konuşma yaşanmayacak. Canlı destek onaylansın mı?]
$addButton[1;Reddet;danger;reddet;false;❌]
$addButton[1;Onayla;success;onayla;false;✔️]
$useChannel[$get[canli]]
$let[canli;$createChannel[$getVar[sunucu];$username-$discriminator;Text;true;$getVar[yetkilikategori]]]
$sendDm[{newEmbed:{title:📁 Canlı Destek}{timestamp}{color:a260ff}{thumbnail:$userAvatar[$authorID]}{description:**Yardım** konulu destek talebiniz yetkililerimize gönderildi. Lütfen geri dönütün gelmesini bekleyiniz. DM kutucuğunuz açık kalmalı aksi taktirde desteğin onaylanıp onaylanmadığını göremezsiniz.}};$authorID;false]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek}{description:**Yardım** konulu destek talebiniz yetkililerimize gönderildi. Lütfen geri dönütün gelmesini bekleyiniz.}{color:7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}}]

$onlyIf[$isUserDmEnabled[$authorID]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:DM kutucuğunuz kapalı. Botun sana DM üzerinden ulaşabilmesi için DM kutucuğunuzu açmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getGlobalUserVar[talep;$authorID]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten devam etmekte olan **$getGlobalUserVar[konu;$authorID]** konulu bir destek talebin var. (DM kutucuğumu kontrol edin.)}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$interactionData[values[0]]==yardım;]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{interaction:true}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==destekmenu;]
`

}, {
type: "interaction",
prototype: "selectMenu",
code: `
$setGlobalUserVar[talep;var;$authorID]
$setGlobalUserVar[konu;Premium;$authorID]
$setGlobalUserVar[acilan;$sum[$getGlobalUserVar[acilan;$authorID];1];$authorID]
$setChannelVar[kullanici;$authorID;$get[canli]]
$pinMessage[$get[mesaj];$get[canli]]
$let[mesaj;$channelSendMessage[$get[canli];{newEmbed:{title:📁 Canlı Destek}
{description:**[$username[$authorID]#$discriminator[$authorID]](https://discord.com/users/$authorID)** adlı kişi **Premium** konulu bir canlı destek oluşturdu.}{color:a260ff}{thumbnail:$userAvatar[$clientID]}{timestamp}};true]]
$title[📁 Canlı Destek]
$color[#a260ff]
$addTimestamp
$description[Canlı destek Eğer onaylanırsa konuşma başlayacak ve bu destekte konuşulanlar kayıt altına alınacak. Canlı destek onaylanmazsa bu kanal kapatılacak ve konuşma yaşanmayacak. Canlı destek onaylansın mı?]
$addButton[1;Reddet;danger;reddet;false;❌]
$addButton[1;Onayla;success;onayla;false;✔️]
$useChannel[$get[canli]]
$let[canli;$createChannel[$getVar[sunucu];$username-$discriminator;Text;true;$getVar[yetkilikategori]]]
$sendDm[{newEmbed:{title:📁 Canlı Destek}{timestamp}{color:a260ff}{thumbnail:$userAvatar[$authorID]}{description:**Premium** konulu destek talebiniz yetkililerimize gönderildi. Lütfen geri dönütün gelmesini bekleyiniz. DM kutucuğunuz açık kalmalı aksi taktirde desteğin onaylanıp onaylanmadığını göremezsiniz.}};$authorID;false]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek}{description:**Premium** konulu destek talebiniz yetkililerimize gönderildi. Lütfen geri dönütün gelmesini bekleyiniz.}{color:7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}}]

$onlyIf[$isUserDmEnabled[$authorID]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:DM kutucuğunuz kapalı. Botun sana DM üzerinden ulaşabilmesi için DM kutucuğunuzu açmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getGlobalUserVar[talep;$authorID]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten devam etmekte olan **$getGlobalUserVar[konu;$authorID]** konulu bir destek talebin var. (DM kutucuğumu kontrol edin.)}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$interactionData[values[0]]==pre;]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{interaction:true}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==destekmenu;]
`

}, {
type: "interaction",
prototype: "selectMenu",
code: `
$interactionModal[Konu;diğer;
{actionRow:
{textInput:konu:1:konu:true:Konu belirtin.:3:200}
}
]

$onlyIf[$isUserDmEnabled[$authorID]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:DM kutucuğunuz kapalı. Botun sana DM üzerinden ulaşabilmesi için DM kutucuğunuzu açmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getGlobalUserVar[talep;$authorID]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten devam etmekte olan **$getGlobalUserVar[konu;$authorID]** konulu bir destek talebin var. (DM kutucuğumu kontrol edin.)}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$interactionData[values[0]]==diger;]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{interaction:true}]
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==destekmenu;]
`

}, {
name: "diğer",
type: "interaction",
prototype: "modal",
code: `
$setGlobalUserVar[talep;var;$authorID]
$setGlobalUserVar[konu;$textInputValue[konu];$authorID]
$setGlobalUserVar[acilan;$sum[$getGlobalUserVar[acilan;$authorID];1];$authorID]
$setChannelVar[kullanici;$authorID;$get[canli]]
$pinMessage[$get[mesaj];$get[canli]]
$let[mesaj;$channelSendMessage[$get[canli];{newEmbed:{title:📁 Canlı Destek}
{description:**[$username[$authorID]#$discriminator[$authorID]](https://discord.com/users/$authorID)** adlı kişi **$textInputValue[konu]** konulu bir canlı destek oluşturdu.}{color:a260ff}{thumbnail:$userAvatar[$clientID]}{timestamp}};true]]
$title[📁 Canlı Destek]
$color[#a260ff]
$addTimestamp
$description[Canlı destek Eğer onaylanırsa konuşma başlayacak ve bu destekte konuşulanlar kayıt altına alınacak. Canlı destek onaylanmazsa bu kanal kapatılacak ve konuşma yaşanmayacak. Canlı destek onaylansın mı?]
$addButton[1;Reddet;danger;reddet;false;❌]
$addButton[1;Onayla;success;onayla;false;✔️]
$useChannel[$get[canli]]
$let[canli;$createChannel[$getVar[sunucu];$username-$discriminator;Text;true;$getVar[yetkilikategori]]]
$sendDm[{newEmbed:{title:📁 Canlı Destek}{timestamp}{color:a260ff}{thumbnail:$userAvatar[$authorID]}{description:**$textInputValue[konu]** konulu destek talebiniz yetkililerimize gönderildi. Lütfen geri dönütün gelmesini bekleyiniz. DM kutucuğunuz açık kalmalı aksi taktirde desteğin onaylanıp onaylanmadığını göremezsiniz.}};$authorID;false]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek}{description:**$textInputValue[konu]** konulu destek talebiniz yetkililerimize gönderildi. Lütfen geri dönütün gelmesini bekleyiniz.}{color:7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}}]

$onlyIf[$isUserDmEnabled[$authorID]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:DM kutucuğunuz kapalı. Botun sana DM üzerinden ulaşabilmesi için DM kutucuğunuzu açmanız gerekiyor.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getGlobalUserVar[talep;$authorID]!=var;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten devam etmekte olan **$getGlobalUserVar[konu;$authorID]** konulu bir destek talebin var. (DM kutucuğumu kontrol edin.)}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`

}, {
name: "reddet",
type: "interaction",
prototype: "button",
code: `
$deleteChannel[$channelID]
$wait[10s]
$setGlobalUserVar[talep;yok;$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[konu;?;$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[kapatilan;$sum[$getGlobalUserVar[kapatilan;$getChannelVar[kullanici;$channelID]];1];$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[reddedilen;$sum[$getGlobalUserVar[reddedilen;$authorID];1];$authorID]
$channelSendMessage[$getVar[gecmis];{newEmbed:{title:📁 Canlı Destek}{description:**[$username[$getChannelVar[kullanici;$channelID]]#$discriminator[$getChannelVar[kullanici;$channelID]]](https://discord.com/users/$getChannelVar[kullanici;$channelID])** adlı kişinin **$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu canlı destek talebi <@$authorID> tarafından reddedildi.}{color:#E34A51}{timestamp}{thumbnail:$userAvatar[$clientID]}}]
$sendDm[{newEmbed:{title:📁 Canlı Destek}{timestamp}{color:E34A51}{thumbnail:$userAvatar[$authorID]}{description:**$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu destek talebiniz <@$authorID> adlı yetkilimiz tarafından onaylanmadı.}};$getChannelVar[kullanici;$channelID];false]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek}{description:**$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu destek talebi <@$authorID> tarafından reddedildi. Bu kanal **10 Saniye** sonra kapanacak ve geçmişe gönderilecek.}{color:E34A51}{timestamp}{thumbnail:$userAvatar[$clientID]}};{actionRow:{button:Onayla:success:onayla:true:✔️}{button:Reddet:danger:reddet:true:❌}}]

$onlyIf[$getGlobalUserVar[talep;$getChannelVar[kullanici;$channelID]]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten bu canlı destek kapanmış.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`

}, {
name: "onayla",
type: "interaction",
prototype: "button",
code: `
$setGlobalUserVar[onaylanan;$sum[$getGlobalUserVar[onaylanan;$authorID];1];$authorID]
$setGlobalUserVar[dm;var;$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[kanal;$channelID;$getChannelVar[kullanici;$channelID]]
$channelSendMessage[$getVar[gecmis];{newEmbed:{title:📁 Canlı Destek}{description:**[$username[$getChannelVar[kullanici;$channelID]]#$discriminator[$getChannelVar[kullanici;$channelID]]](https://discord.com/users/$getChannelVar[kullanici;$channelID])** adlı kişinin **$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu canlı destek talebi <@$authorID> tarafından onaylandı.}{color:#7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}}]
$sendDm[{newEmbed:{title:📁 Canlı Destek}{timestamp}{color:7DFF82}{thumbnail:$userAvatar[$authorID]}{description:**$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu destek talebiniz <@$authorID> adlı yetkilimiz tarafından onaylandı. Buradan yazdığın mesajlar karşı tarafa aktarılacak.}};$getChannelVar[kullanici;$channelID];false]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek}{description:**$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu destek talebi <@$authorID> tarafından onaylandı. Mesajınızın başına **!** eklerseniz mesajınız karşı tarafa iletilir. Destek bittiğinde aşağıdaki kapat düğmesine basabilirsiniz.}{color:7DFF82}{timestamp}{thumbnail:$userAvatar[$clientID]}};{actionRow:{button:Kapat:danger:kapat:false:❌}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`

}, {
name: "kapat",
type: "interaction",
prototype: "button",
code: `
$deleteChannel[$channelID]
$wait[10s]
$setGlobalUserVar[talep;yok;$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[konu;?;$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[kapatilan;$sum[$getGlobalUserVar[kapatilan;$getChannelVar[kullanici;$channelID]];1];$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[kanal;yok;$getChannelVar[kullanici;$channelID]]
$setGlobalUserVar[dm;yok;$getChannelVar[kullanici;$channelID]]
$channelSendMessage[$getVar[gecmis];{newEmbed:{title:📁 Canlı Destek}{description:**[$username[$getChannelVar[kullanici;$channelID]]#$discriminator[$getChannelVar[kullanici;$channelID]]](https://discord.com/users/$getChannelVar[kullanici;$channelID])** adlı kişinin **$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu canlı destek talebi <@$authorID> tarafından sonlandırıldı.}{color:#a260ff}{timestamp}{thumbnail:$userAvatar[$clientID]}}]
$sendDm[{newEmbed:{title:📁 Canlı Destek}{timestamp}{color:a260ff}{thumbnail:$userAvatar[$authorID]}{description:**$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu destek talebiniz <@$authorID> adlı yetkilimiz tarafından sonlandırıldı.}};$getChannelVar[kullanici;$channelID];false]
$interactionUpdate[;{newEmbed:{title:📁 Canlı Destek}{description:**$getGlobalUserVar[konu;$getChannelVar[kullanici;$channelID]]** konulu destek talebi <@$authorID> tarafından sonlandırıldı. Bu kanal **10 Saniye** sonra kapanacak ve geçmişe gönderilecek.}{color:a260ff}{timestamp}{thumbnail:$userAvatar[$clientID]}};{actionRow:{button:Kapat:danger:kapat:true:❌}}]

$onlyIf[$getGlobalUserVar[talep;$getChannelVar[kullanici;$channelID]]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Zaten bu canlı destek kapanmış.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`
}]