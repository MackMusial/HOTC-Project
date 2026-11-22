# HOTC website: launch plan

As of 2026-11-22. Covers what makes the site run after launch: the contact form, the newsletter, the content the center edits themselves, and the domain. Background is in `context.md`.

**Decisions**
- Google files (Drive folder, both Sheets, the form script) live in Mack's Google account, shared with the center. Ownership transfers to the center before handoff.
- Newsletter: MailerLite.
- Photos: the center pastes Google Drive links into the content Sheet and the site loads them directly.

## Status

| Piece | Code | Waiting on |
|---|---|---|
| Contact form | Done: `apps-script/Code.gs`, `initForms()` in `js/main.js` | Mack deploys the script and fills in `FORM_ENDPOINT` |
| Newsletter | Done: `NEWSLETTER_ENDPOINT` in `js/main.js` | MailerLite account and a sender address on their domain |
| Editable content (photos, text, events, board, announcement, videos) | Done: `js/content.js`, `apps-script/ContentSetup.gs` | Mack builds the Sheet and pastes the published links into `CONTENT_CSV` |
| Domain | Not started | GoDaddy access |
| Client guide | Not started | Everything above |

Until a link is filled in, every piece falls back to what's in the HTML today, so the site is never broken while setup is in progress.

## Mack's setup checklist

### 1. Google Drive folder
1. Create the folder "HOTC Website" with the subfolders `Photos`, `Documents` and `From client`.
2. Share the folder with the center's Google account as Editor.
3. Set `Photos` to "Anyone with the link can view". Direct image links need this. Anything in that folder is effectively public.

### 2. Contact form: "HOTC Website Inbox" (private)
1. Create the Sheet. Extensions > Apps Script, paste `apps-script/Code.gs`.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
3. Put the URL in `FORM_ENDPOINT` (`js/main.js`).
4. Test from the live site: the email reaches yourrecipe4healing@gmail.com and a row appears in `Contact`.

Emails send from Mack's Gmail with the visitor as reply-to, and the email body says it came from the website.

### 3. Editable content: "HOTC Website Content" (public)
1. Create an empty Sheet. Extensions > Apps Script, paste `apps-script/ContentSetup.gs`, run `setupContentSheet`. It builds every tab, the pre-filled photo slots, checkboxes, date pickers and a "How to use" tab.
2. File > Share > Publish to web. Publish each tab (Photos, Text, Announcement, Events, Board, Videos) as CSV and paste each link into `CONTENT_CSV` (`js/content.js`).
3. Test: paste a Drive photo link into a slot and confirm it shows within about 5 minutes. Add a future event (it appears) and a past one (it's hidden).

What the center can change from the Sheet:

| Tab | Shows on |
|---|---|
| Photos | 16 named spots, including the page-title background. The slot names match `data-slot` on the `<img>` tags |
| Text | Home tagline and the three Founder's Story paragraphs (`data-text` in the HTML) |
| Announcement | Red banner under the header on every page, while Show is ticked |
| Events | Home > Upcoming events. Past events hide on their own |
| Board | About > Board Members (replaces the placeholder) |
| Videos | Home > "See Us in Action". Hidden until there's a video |

Page layout, colors, new pages and any wording not listed above stay with the developer.

**Known risk:** the Drive image URL (`lh3.googleusercontent.com/d/<id>`) isn't an official Google API. If it stops working, photos fall back to the built-in ones, and the fix is one line in `driveImage()` in `js/content.js`.

### 4. Newsletter: MailerLite
1. Create the account. **Blocker:** MailerLite won't send from a @gmail.com address. Set up an address on their domain (e.g. news@heartofthecity989.com) and add MailerLite's SPF/DKIM records at GoDaddy. Confirm the exact requirement in MailerLite's sender settings.
2. Forms > Embedded forms > "Website sign-up", with double opt-in on. Copy the `<form action="…">` URL into `NEWSLETTER_ENDPOINT`.
3. Use 4790 Gratiot Rd. as the mailing address for the email footer.
4. Check the current free-plan limits on mailerlite.com/pricing before telling the center it's free. Apply for the nonprofit discount only if they need a paid plan.
5. Test: sign up, confirm the opt-in email, and check the subscriber appears.

### 5. Domain
1. Add a `CNAME` file to the repo containing `www.heartofthecity989.com`. **Only do this once DNS is ready**, because it immediately redirects the github.io address.
2. At GoDaddy: A records for `@` to 185.199.108.153, .109.153, .110.153 and .111.153, plus a CNAME for `www` to `mackmusial.github.io`.
3. In the repo's Settings > Pages, enter the custom domain and turn on "Enforce HTTPS".
4. The center then cancels Squarespace. Check nothing else (email, store) depends on it first.

### 6. Handoff
1. Transfer ownership of the Drive folder and both Sheets to the center's account.
2. Signed in as the center, redeploy the contact script and put the new URL in `FORM_ENDPOINT`. A web app runs as whoever deployed it.
3. Write the one-page client guide: changing a photo, adding an event, the announcement banner, sending a newsletter, where form messages go, and who to contact for anything else.

## Instagram (@heartofthecity989)

Linked in the header, the footer and on the Contact page. Checked 2026-11-22:
- The last post is from Oct 23, 2024. Ask the center to start posting again before launch, or hide the icon until they do.
- The bio only mentions individuals with intellectual and developmental disabilities. It should cover Youth (K–15) and Families too.
- The link in bio (www.heartofthecity989.com) shows the old Squarespace site until the domain switch (step 5).
- There are two Facebook pages: the old `heartofthecitydevelopmentcenter` and the new "HOTC: Healing, Hope, & Growth". Ask which one Instagram should connect to.
- No Instagram feed on the site: the simple feed API was shut down in Dec 2024, and the account rarely posts.

## Needed from the center
- [ ] Their Google account, to share the folder
- [ ] A domain email address for the newsletter, or permission to set one up
- [ ] GoDaddy access, for the DNS records
- [ ] An updated Instagram bio, and new posts
- [ ] Biography, board photos and names, the Heal family photo, the updated sponsorship form, and new photos (these can go straight into the shared folder)
