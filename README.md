[README.md](https://github.com/user-attachments/files/33505012/README.md)
# FreshBasket Grocery Website

A responsive front-end grocery shop website for a college community project. Built with plain HTML, CSS and JavaScript — no server or database required.

## Included features
- Responsive design for mobile and desktop
- Product categories and search
- Add-to-cart, quantity controls and estimated total
- Order request flow prepared for WhatsApp
- Contact section and editable store details

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in Chrome.

For editing, open the folder in VS Code. You do not need to install Python or Flask.

## Personalize before publishing
1. In `index.html`, change `FreshBasket` / `Fresh Basket Grocery` to your shop name.
2. Update the address, phone number and opening hours in the Contact section.
3. In `script.js`, update product names, units and prices in the `products` array.
4. To enable WhatsApp ordering, in `script.js` find `const whatsappNumber=""` and enter the shop WhatsApp number with country code and digits only, e.g. `919876543210` (no `+` or spaces).
5. Update the page title and description near the top of `index.html`.

## Publish it online for free
### Option A: Netlify Drop (quickest)
1. Open Netlify Drop: https://app.netlify.com/drop
2. Sign in or create a free account if prompted.
3. Extract the ZIP first, then drag the `fresh_basket_grocery_website` folder (or its contents) onto the drop area.
4. Netlify will publish it and provide a public website link. You can share that link with your teacher.
5. To update the site later, make changes to the files and upload the updated folder again.

### Option B: GitHub Pages
1. Create a GitHub account and a new public repository.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. In repository Settings → Pages, enable deployment from the `main` branch and root folder.
4. Wait for the published link shown by GitHub Pages.

## Important project note
This is a front-end demo. It does not process online payments, store orders in a database, or automatically manage inventory. WhatsApp ordering works after adding a real shop number. Use real prices and contact details before presenting it as a live shop.
