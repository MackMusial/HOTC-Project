/**
 * Heart of the City — builds the "HOTC Website Content" sheet in one step.
 *
 * 1. Create a new, empty Google Sheet named "HOTC Website Content".
 * 2. Extensions > Apps Script, paste this file, save, pick setupContentSheet in the toolbar, Run.
 *    Approve the permissions prompt (it only touches this sheet).
 * 3. Back in the sheet: File > Share > Publish to web. For each tab (Photos, Text, Announcement,
 *    Events, Board, Videos) choose the tab and "Comma-separated values (.csv)", then Publish.
 *    Paste each link into CONTENT_CSV at the top of js/content.js.
 *
 * Everything in this sheet is public once published. Keep private things (form messages) in the
 * separate "HOTC Website Inbox" sheet.
 * Running it again rebuilds the tabs from scratch, so only run it on a new sheet.
 */
function setupContentSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();

  const guide = makeTab(book, "How to use", ["Heart of the City website: how to update it"], [
    ["Changes show on the website within about 5 minutes. Refresh the page to see them."],
    [""],
    ["PHOTOS tab: upload the photo to the Photos folder in Google Drive, right-click it > Share > Copy link,"],
    ["  then paste the link into the Drive link column of the spot you want to change. Leave it blank to keep the current photo."],
    ["  Description: one sentence saying what is in the photo (read aloud to visitors who use screen readers)."],
    ["  Photos must be in the shared Photos folder, which is set to 'Anyone with the link can view'."],
    [""],
    ["TEXT tab: type new wording in the Text column. Leave it blank to keep what is on the site now."],
    ["EVENTS tab: one row per event. Past events disappear from the site on their own."],
    ["ANNOUNCEMENT tab: tick Show to put the message in a red banner at the top of every page. Untick it to remove it."],
    ["BOARD tab: one row per board member. The photo link works like the Photos tab."],
    ["VIDEOS tab: paste a YouTube link. The video section only appears once there is at least one video."],
    [""],
    ["Please do not rename the tabs, change the first row, or edit the grey columns. The website relies on them."],
    ["Anything else (new pages, layout, wording not listed here): contact the website developer."],
  ]);
  guide.setColumnWidth(1, 900);
  guide.getRange("A1").setFontSize(14);

  const photos = makeTab(book, "Photos", ["Slot", "Where it shows", "Drive link", "Description"], [
    ["site-background", "Background photo behind the page titles on every page", "", ""],
    ["home-learn", "Home: Learn card", "", ""],
    ["home-grow", "Home: Grow card", "", ""],
    ["home-engage", "Home: Engage card", "", ""],
    ["home-heal", "Home: Heal card (a diverse, inclusive family)", "", ""],
    ["home-collage-1", "Home: first photo collage, left", "", ""],
    ["home-collage-2", "Home: first photo collage, middle", "", ""],
    ["home-collage-3", "Home: first photo collage, right", "", ""],
    ["home-collage-4", "Home: second photo collage, left", "", ""],
    ["home-collage-5", "Home: second photo collage, middle", "", ""],
    ["home-collage-6", "Home: second photo collage, right", "", ""],
    ["about-founder-front", "About: Founder's Story, small front photo (Cherie and I'Lexsis)", "", ""],
    ["about-founder-back", "About: Founder's Story, larger photo behind it", "", ""],
    ["adult-main", "Adult Programming: main photo", "", ""],
    ["youth-main", "Youth (K-15) and Families: main photo", "", ""],
    ["sponsor", "Get Involved: Become a Sponsor photo", "", ""],
  ]);
  lockColumns(photos, 2);
  widths(photos, [170, 380, 380, 380]);

  const text = makeTab(book, "Text", ["Key", "Where it shows", "Text"], [
    ["home-tagline", "Home: the script line under the big title (now: Your Recipe for Healing)", ""],
    ["founder-1", "About: Founder's Story, first paragraph", ""],
    ["founder-2", "About: Founder's Story, second paragraph", ""],
    ["founder-3", "About: Founder's Story, third paragraph", ""],
  ]);
  lockColumns(text, 2);
  widths(text, [130, 420, 700]);
  text.getRange("C:C").setWrap(true);

  const announcement = makeTab(book, "Announcement", ["Message", "Link", "Show"], [
    ["Example: Registration for our summer program is now open!", "", false],
  ]);
  announcement.getRange("C2:C").insertCheckboxes();
  widths(announcement, [600, 320, 80]);

  const events = makeTab(book, "Events", ["Date", "Title", "Time", "Location", "Description", "Link"], [
    ["", "", "", "", "", ""],
  ]);
  events.getRange("A2:A").setNumberFormat("yyyy-mm-dd").setDataValidation(
    SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false)
      .setHelpText("Pick a date (double-click the cell for a calendar).").build()
  );
  events.getRange("A2").setNote("Example row: delete this note and fill in a real event. Double-click a Date cell for a calendar.");
  widths(events, [110, 260, 130, 260, 420, 260]);

  const board = makeTab(book, "Board", ["Name", "Role", "Drive photo link"], []);
  widths(board, [240, 240, 420]);

  const videos = makeTab(book, "Videos", ["Title", "YouTube link"], []);
  widths(videos, [360, 420]);

  // Drop the default empty tab if it is still there.
  const blank = book.getSheetByName("Sheet1");
  if (blank && book.getSheets().length > 1) book.deleteSheet(blank);
  book.setActiveSheet(guide);
  book.moveActiveSheet(1);
}

function makeTab(book, name, header, rows) {
  const old = book.getSheetByName(name);
  if (old) book.deleteSheet(old);
  const sheet = book.insertSheet(name);
  sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold").setBackground("#5b2a86").setFontColor("#ffffff");
  if (rows.length) sheet.getRange(2, 1, rows.length, header.length).setValues(rows);
  sheet.setFrozenRows(1);
  // Warn (not block) anyone who edits the header row.
  sheet.getRange(1, 1, 1, header.length).protect().setDescription(name + " header row").setWarningOnly(true);
  return sheet;
}

// Grey out and protect the first n columns (slot names the website relies on).
function lockColumns(sheet, n) {
  const range = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), n);
  range.setBackground("#eeeeee").setFontColor("#555555");
  range.protect().setDescription(sheet.getName() + ": do not edit").setWarningOnly(true);
}

function widths(sheet, list) {
  list.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
}
