import { MessageType } from '@adiwajshing/baileys';

export default async function menuList({
  messageInfo, from, connection,
}) {
  // eslint-disable-next-line max-len
  connection.sendMessage(from, '[Amigãos Bot Menu:]\n\nᴄᴏᴍᴍᴀɴᴅꜱ:\n⁻ !ᵃᵗᵗᵖ  ᵗᵉˣᵗᵒ ᵈᵉ ᶜᵒˡᵒʳᵉˢ\n⁻ !ˢᵗⁱᶜᵏᵉʳ  ʲᵖᵍ ᵐᵖ⁴ ᵍⁱᶠ ᵃ ˢᵗⁱᶜᵏᵉʳ\n\nʏᴏᴜᴛᴜʙᴇ ᴄᴏᴍᴍᴀɴᴅꜱ:\n⁻ !ᵖˡᵃʸ  ᵇᵘˢᶜᵃᵈᵒʳ ʸᵒᵘᵗᵘᵇᵉ\n⁻ !ʸᵗᵐᵖ⁴ ᵈᵉˢᶜᵃʳᵍᵃʳ ᵛⁱᵈᵉᵒ ᵈᵉ ʸᵒᵘᵗᵘᵇᵉ ᵖᵒʳ ˡⁱⁿᵏ\n- !ʸᵗᵐᵖ³ ᵈᵉˢᶜᵃʳᵍᵃʳ ᵃᵘᵈⁱᵒ ᵈᵉ ʸᵒᵘᵗᵘᵇᵉ ᵖᵒʳ ˡⁱⁿᵏ\n\nɢᴏᴏɢʟᴇ ᴄᴏᴍᴍᴀɴᴅꜱ:\n⁻ !ᵍᵒᵒᵍˡᵉ  ᵇᵘˢᶜᵃᵈᵒʳ ᵈᵉ ᴳᵒᵒᵍˡᵉ\n⁻ !ⁱᵐᵃᵍᵉ  ⁱᵐᵖᵒʳᵗᵃʳ ⁱᵐᵃᵍᵉⁿ ᵈᵉ ᴳᵒᵒᵍˡᵉ\n⁻ !ᵗᵗˢ ᵗʳᵃᵈᵘᶜᵗᵒʳ ᵈᵉ ᴳᵒᵒᵍˡᵉ\n⁻ !ᵗˢ ᵛᵉʳ ⁱᵈⁱᵒᵐᵃˢ\n\nɴꜱꜰᴡ  ᴄᴏᴍᴍᴀɴᴅꜱ:\n⁻ !ʰᵉⁿᵗᵃⁱ  ᵍⁱᶠ ʰᵉⁿᵗᵃⁱ\n⁻ !ᵗʳᵃᵖ  ʰᵉⁿᵗᵃⁱ ᵗʳᵃᵖ\n⁻ !ⁿᵉᵏᵒ   ʰᵉⁿᵗᵃⁱ ⁿᵉᵏᵒ\n⁻ !ᶜᵘᵐ  ᵉʸᵃᶜᵘˡᵃʳ ᵃ\n⁻ !ᶠᵘᶜᵏ  ᶠᵒˡˡᵃʳ ᵃ\n⁻ !ᵃⁿᵃˡ  ᵃⁿᵃˡ ᵃ\n\nʀᴏʟᴇᴘʟᴀʏ:\n⁻ !ᵏⁱˢˢ  ᵇᵉˢᵃʳ ᵃ\n⁻ !ᵇᵃᵏᵃ  ᵈᵉᶜⁱʳˡᵉ ᵇᵃᵏᵃ ᵃ\n⁻ !ᵖᵃᵗ  ᵃᶜᵃʳⁱᶜⁱᵃʳ ᵃ\n⁻ !ˢˡᵃᵖ  ᶜᵃᶜʰᵉᵗᵉᵃʳ ᵃ\n⁻ !ʰᵘᵍ  ᵃᵇʳᵃᶻᵃʳ ᵃ', MessageType.text, { quoted: messageInfo });
}
