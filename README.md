# Teatro dirbtuvėlė

Lithuanian landing page and registration form for children’s theatre workshops in Pavilnys, Vilnius. It is a single Next.js application: the public page and `POST /api/registrations` run in the same container.

## Local development

Requires Node.js 24 or newer.

```sh
cp .env.example .env
npm install
npm run dev
```

The site runs at `http://localhost:3000`. Set a real Gmail app password in `.env` before testing a submission. Without it, the form deliberately returns an error and no registration is accepted.

Run the production checks with:

```sh
npm run typecheck
npm run build
```

## Registration endpoint

`POST /api/registrations` accepts the child’s name and surname, age group, parent or guardian email address, and phone number. The route validates data again on the server, limits bodies to 12 KB, allows five requests per IP address in 15 minutes, and rejects a hidden honeypot field.

Registration details are never stored or logged. Gmail SMTP sends a plain-text notification from and to `teatrodirbtuvele@gmail.com`; the parent’s email is only used as the message `Reply-To` address. The browser sees success only after Gmail accepts the send request.

The in-memory rate limiter is designed for this single-container deployment. If the service is scaled to multiple instances, replace it with a shared rate-limit store.

### Shared nginx and Cloudflare

In Cloudflare, create DNS records for both `teatrodirbtuvele.lt` and `www.teatrodirbtuvele.lt` that point to the VPS. Use Full (strict) encryption with an origin certificate covering both names. The proxy configuration redirects HTTP and `www` traffic to `https://teatrodirbtuvele.lt`.
