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

Registration details are never stored or logged. Gmail SMTP sends a plain-text notification from `SMTP_USER` to `viola.aurea@gmail.com`; the parent’s email is only used as the message `Reply-To` address. The browser sees success only after Gmail accepts the send request.

The in-memory rate limiter is designed for this single-container deployment. If the service is scaled to multiple instances, replace it with a shared rate-limit store.

## Gmail setup

1. Enable 2-Step Verification on `viola.aurea@gmail.com`.
2. Create a Google App Password for this site and use the generated value as `SMTP_APP_PASSWORD`.
3. Set `SMTP_USER=viola.aurea@gmail.com`.
4. Rotate the app password by creating a new one, updating the GitHub secret, deploying, then revoking the old password.

Never commit `.env`, a Gmail password, Cloudflare certificate, or private key.

## Production deployment

The application image is built as a standalone Next.js Docker image. `docker-compose.prod.yml` runs it as `teatrodirbtuvele-next` on the external `shared-proxy` network. The existing `lazy-food` nginx service is the public edge proxy and must be updated separately.

### Required GitHub Actions secrets

- `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`
- `VPS_HOST`, `VPS_USER`, and `VPS_SSH_KEY`
- `SMTP_USER` and `SMTP_APP_PASSWORD`

The deploy workflow publishes `username/teatrodirbtuvele:<commit-sha>`, copies the Compose file to `~/teatrodirbtuvele` on the VPS, writes SMTP values to a protected runtime `.env`, and starts the matching image.

### Shared nginx and Cloudflare

Copy [deployment/lazy-food-proxy/teatrodirbtuvele.lt.conf](deployment/lazy-food-proxy/teatrodirbtuvele.lt.conf) into the `lazy-food` nginx configuration and deploy that repository’s proxy. Store these files in `lazy-food/nginx/conf.d/certs/` from deployment secrets, never Git:

- `teatrodirbtuvele.lt.pem`
- `teatrodirbtuvele.lt.key`

In Cloudflare, create DNS records for both `teatrodirbtuvele.lt` and `www.teatrodirbtuvele.lt` that point to the VPS. Use Full (strict) encryption with an origin certificate covering both names. The proxy configuration redirects HTTP and `www` traffic to `https://teatrodirbtuvele.lt`.

After deployment, verify the health endpoint from the container, both HTTPS hostnames, canonical redirects, and a real form submission arriving at `viola.aurea@gmail.com` with the parent address available through Reply-To.
