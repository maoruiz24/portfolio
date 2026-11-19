# Contact form email (Resend)

The contact form posts to a Next.js Server Action ([src/app/contact/actions.ts](../src/app/contact/actions.ts)) that validates the input with Zod and sends the message through [Resend](https://resend.com). The visitor's address is set as `reply-to`, so replying from your inbox answers them directly.

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` | yes | — | Resend API key (sending access). |
| `CONTACT_FROM_EMAIL` | no | `Portfolio <contact@iruiz.dev>` | Sender. Must use a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | no | `siteConfig.email` | Inbox that receives the messages. |

Without `RESEND_API_KEY` the form shows an error that points visitors to the email address shown on the page; nothing crashes.

## One-time setup

1. **Resend account** → *Domains* → *Add domain* → `iruiz.dev` (region closest to you).
2. **DNS in Cloudflare**: add exactly the records Resend shows (SPF/MX on the `send` subdomain and the `resend._domainkey` DKIM TXT). Set them to **DNS only** (grey cloud). Wait until Resend marks the domain *Verified*.
3. **API key** → *API Keys* → *Create* with permission **Sending access**, restricted to the `iruiz.dev` domain.
4. **Local test** (optional): copy `.env.example` to `.env.local`, paste the key, run `pnpm dev` and send a message from `/contact`.

## Kubernetes (k3s)

Store the values in a Secret and attach it to the existing deployment. `kubectl set env` changes the deployment spec, so the variables survive the image updates done by the GitHub Actions workflow.

```bash
kubectl -n portfolio create secret generic portfolio-contact \
  --from-literal=RESEND_API_KEY='re_xxxxxxxx' \
  --from-literal=CONTACT_FROM_EMAIL='Portfolio <contact@iruiz.dev>' \
  --from-literal=CONTACT_TO_EMAIL='maoruiz24@gmail.com'

kubectl -n portfolio set env deployment/app-portfolio --from=secret/portfolio-contact
kubectl -n portfolio rollout status deployment/app-portfolio
```

To rotate the key: `kubectl -n portfolio delete secret portfolio-contact`, create it again, then `kubectl -n portfolio rollout restart deployment/app-portfolio`.

## Spam protection

- Hidden honeypot field (`website`); bots that fill it get a fake success response.
- Submissions faster than 3 seconds after the page loads are discarded the same way.
- At most 3 messages per IP every 10 minutes. The counter is in memory, so it is per replica and resets on restart — fine for a single replica. The client IP comes from `X-Forwarded-For`, which Traefik sets.
- If spam becomes a problem, add Cloudflare Turnstile.
