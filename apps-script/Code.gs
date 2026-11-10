/**
 * Heart of the City — contact form + newsletter backend (NOT YET DEPLOYED).
 *
 * TODO(hookup):
 * 1. Create a Google Sheet (owned by yourrecipe4healing@gmail.com) with two tabs: "Contact" and "Newsletter".
 * 2. Extensions > Apps Script, paste this file, then Deploy > New deployment > Web app
 *    (Execute as: Me, Who has access: Anyone).
 * 3. Copy the web app URL into FORM_ENDPOINT at the top of js/main.js.
 */
const NOTIFY_EMAIL = "yourrecipe4healing@gmail.com";

function doPost(e) {
  const p = e.parameter;
  const book = SpreadsheetApp.getActiveSpreadsheet();

  if (p.form === "newsletter") {
    book.getSheetByName("Newsletter").appendRow([new Date(), p.email]);
  } else {
    book.getSheetByName("Contact").appendRow([new Date(), p.name, p.email, p.phone, p.interest, p.message]);
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: p.email,
      subject: "Website message from " + p.name,
      body: [
        "Name: " + p.name,
        "Email: " + p.email,
        "Phone: " + (p.phone || "-"),
        "Interested in: " + (p.interest || "-"),
        "",
        p.message,
      ].join("\n"),
    });
  }
  return ContentService.createTextOutput("ok");
}
