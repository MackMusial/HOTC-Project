# HOTC website: build plan

As of 2026-11-11. Covers the three pieces that make the site work for the client after launch: the newsletter, the contact form, and the content they can change themselves. None of the three is built yet. Background is in `context.md`.

## Order of work

| # | Piece | Blocked on | Size |
|---|---|---|---|
| 1 | Contact form (email + Google Sheet) | Access to the client's Gmail account, or 15 minutes with them on a call | Small |
| 2 | Newsletter sign-up (MailerLite) | Client creates a MailerLite account | Small |
| 3 | Events the client can edit | Nothing | Medium |
| 4 | Videos and announcement banner the client can edit | Client's videos on YouTube | Small, reuses #3 |
| 5 | One-page "how to update your website" guide | #1 to #4 done | Small |

Do #1 first: it is the only one where a visitor's message is lost today.

## 1. Contact form

**Goal:** a message sent from the Contact page is emailed to yourrecipe4healing@gmail.com and logged in a private Google Sheet with a timestamp.

**What exists:** the form on `contact.html`, the submit code in `js/main.js`, and the script in `apps-script/Code.gs`. The script has never been deployed or tested.

**Steps**
1. In the client's Google account, create a sheet named "HOTC Website Inbox" with a tab named `Contact`. Keep it private.
2. Extensions > Apps Script. Paste `apps-script/Code.gs`. Remove the newsletter branch (see #2).
3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
4. Paste the web app URL into `FORM_ENDPOINT` at the top of `js/main.js`.
5. Send a test message from the live draft. Confirm the email arrives and the row appears.

**Known limits**
- The browser cannot read the script's reply, so the site shows "Thank you" whenever the request is delivered, even if the script itself fails. Test after every script change.
- Spam protection is one hidden field. If spam gets through, add Cloudflare Turnstile.
- The script must be deployed from the client's account, so the emails come from them and they own the data.

## 2. Newsletter: MailerLite

**Why MailerLite:** free to start, simplest editor of the options, adds the legally required unsubscribe link, and gives nonprofits 30% off paid plans. Check the current free-plan subscriber cap at mailerlite.com/pricing before promising "free": sources disagree (250, 500 or 1,000).

**Steps**
1. Client creates a MailerLite account with yourrecipe4healing@gmail.com and verifies the sender address. MailerLite asks for a physical mailing address for the email footer: use 4790 Gratiot Rd.
2. In MailerLite: Forms > Embedded form > create "Website sign-up". Turn on double opt-in.
3. Copy the form's action URL from the embed code.
4. In `js/main.js`, point the newsletter form at that URL instead of `FORM_ENDPOINT`. The box keeps its current look.
5. Test with a real address: sign up, confirm, check it appears in MailerLite.
6. Apply for the nonprofit discount only if they move to a paid plan.

**Decision for the client:** a MailerLite logo appears on emails sent from the free plan. Removing it needs a paid plan.

## 3 and 4. Content the client can change themselves

**How it works:** one Google Sheet, published to the web as CSV. The site reads it when a page loads and fills in the section. The client edits a row and the site updates within a few minutes.

**Sheet: "HOTC Website Content"** (separate from the private inbox sheet, because anything in it is public)

| Tab | Columns | Shows on |
|---|---|---|
| `Events` | Date, Title, Time, Location, Description, Link | Home page "Upcoming events" |
| `Videos` | Title, YouTube link, Description | Home page, new video section |
| `Announcement` | Message, Link, Show (yes/no) | Banner under the header, every page |

**Build steps**
1. Create the sheet with example rows. File > Share > Publish to web > each tab as CSV.
2. Add `js/content.js`: fetch each CSV, parse it, render it. Past events are hidden automatically by date.
3. Replace the events placeholder in `index.html` with the rendered list.
4. Every section has built-in fallback text, so a slow or failed fetch never leaves an empty box.
5. Protect the header row and add data validation on the Date and Show columns, so a typo cannot break the site.

**Stays with the developer**
- Page wording, layout, colors, new pages.
- Photos. Google Drive links are unreliable as website images. The client emails photos and they are added by hand.

**If they later want to edit everything themselves:** that is a site builder (Squarespace, which they had), not this site. Raise it before launch, not after.

## 5. Client guide

One page with screenshots, written for someone who does not use spreadsheets much:
- How to add or remove an event
- How to change the video
- How to turn the announcement banner on and off
- How to send a newsletter in MailerLite
- Where form messages go
- Who to contact for anything else

## Needed from the client

- [ ] 15 minutes signed in to their Gmail, for the form script and the two sheets
- [ ] A MailerLite account
- [ ] The two event videos uploaded to YouTube
- [ ] Their first real events, to replace the example rows

## Not in this plan

Founder's story, board photos, the Heal photo, photo approvals, the Events and Notary pages from the old site, YouTube channel guidance, and the GoDaddy domain hookup. These are tracked in `context.md`.
