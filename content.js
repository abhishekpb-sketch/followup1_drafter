(function() {
  let name = "there";
  
  // Try to extract name from the original emails in the thread
  // In Gmail, the email bodies are usually inside divs with classes like "a3s aiL" or "ii gt"
  const messageBodies = document.querySelectorAll('.a3s.aiL, .ii.gt');
  
  for (let i = 0; i < messageBodies.length; i++) {
    const text = messageBodies[i].innerText || "";
    // The same regex used in the Google Apps Script
    const nameMatch = text.match(/^(?:Hi|Hello|Dear|Hey)\s+([^\r\n]+)/im);
    
    if (nameMatch) {
      name = nameMatch[1].trim();
      if (name.endsWith(',')) {
        name = name.slice(0, -1).trim();
      }
      break;
    }
  }

  // The template from the Google Apps Script
  const htmlTemplate = `<div dir="ltr" style="font-family: sans-serif; font-size: 14px; color: #000000;">Hi ${name},<br><br>Just checking in to see if you had a chance to go through the case studies and deck I shared. I’d love to take 15 minutes to walk you through how we’ve approached influencer and UGC campaigns for similar brands. Let me know if this is something you're currently exploring.<br><br>Looking forward to hearing from you.<br><br>Regards,<br>Abhishek</div><br>`;

  // Insert the HTML at the current cursor location
  // We assume the user has already clicked in the correct place in the compose box.
  try {
    document.execCommand('insertHTML', false, htmlTemplate);
  } catch (e) {
    console.error("Failed to insert via execCommand", e);
  }
})();
