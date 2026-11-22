/**
 * Heart of the City — contact form backend (NOT YET DEPLOYED).
 * Goes in the private "HOTC Website Inbox" sheet. The newsletter does not use this: it posts
 * straight to MailerLite (see NEWSLETTER_ENDPOINT in js/main.js).
 *
 * Setup:
 * 1. Create a Google Sheet named "HOTC Website Inbox" with a tab named "Contact". Keep it private.
 * 2. Extensions > Apps Script, paste this file, save.
 * 3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 *    Approve the permissions prompt (it needs the sheet and permission to send email).
 * 4. Copy the web app URL into FORM_ENDPOINT at the top of js/main.js.
 * 5. Send a test message from the site and check the email and the new row.
 *
 * Handoff: a web app runs as whoever deployed it, and emails are sent from that account.
 * After ownership of this sheet moves to the center, someone signed in as the center must
 * deploy it again (step 3) and the new URL must go into FORM_ENDPOINT.
 * Any change to this file also needs Deploy > Manage deployments > Edit > New version.
 */
const NOTIFY_EMAIL = "yourrecipe4healing@gmail.com";

function doPost(e) {
  const p = e.parameter;
  if (p.form !== "contact" || !p.email || !p.message) {
    return ContentService.createTextOutput("ignored");
  }

  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName("Contact") || book.insertSheet("Contact");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Received", "Name", "Email", "Phone", "Interested in", "Message"]);
  }
  sheet.appendRow([new Date(), p.name, p.email, p.phone, p.interest, p.message]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: p.email,
    subject: "Website message from " + p.name,
    body: [
      "Someone sent a message through the Contact page on the Heart of the City website.",
      "Reply to this email to answer them directly.",
      "",
      "Name: " + p.name,
      "Email: " + p.email,
      "Phone: " + (p.phone || "-"),
      "Interested in: " + (p.interest || "-"),
      "",
      p.message,
      "",
      "Every message is also saved in the \"HOTC Website Inbox\" Google Sheet.",
    ].join("\n"),
  });
  return ContentService.createTextOutput("ok");
}
