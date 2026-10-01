# 🚀 Deploy Hostinger & Rastreador Real de Doações Stripe (CENA)

Este projeto está hospedado e em produção na **Hostinger** através da integração Git com o repositório `cenaorg.ca` (branch `main`).

---

## 📌 1. Visão Geral da Arquitetura

1. **Frontend**: Vite + React + TypeScript + TailwindCSS.
2. **Hospedagem**: Hostinger (Apache/LiteSpeed + Node.js Vite Build).
3. **Build no Hostinger**: `npm run build` compila os arquivos para a pasta `dist/`.
4. **Arquivos Públicos**: Tudo o que está em `public/` (incluindo `.htaccess` e a pasta `api/`) é copiado automaticamente para o `dist/`.

---

## 🎄 2. Rastreador Real de Doações (Stripe Webhook Tracker)

O contador foi **zerado** e agora reflete **estritamente pagamentos finalizados e confirmados** no Stripe.

### Como funciona:
1. **Contador Inicial**: `$0` angariados / `0%` do objetivo / `0` doadores.
2. **Fluxo de Doação**:
   - O doador clica num dos cartões de doação ($30, $100, $250, $400 ou valor customizado).
   - O Stripe Checkout abre com o valor pré-selecionado ou customizado digitado pelo usuário.
   - **Se o usuário fechar a página ou não pagar:** a doação **NÃO** é contabilizada.
   - **Ao finalizar com sucesso:** o Stripe envia um evento de webhook (`checkout.session.completed` com status `paid`).
3. **Endpoint de Webhook**:
   - URL: `https://cena-ca.org/api/stripe-webhook` (atendido por `public/api/stripe-webhook.php`)
   - Valida idempotência para não duplicar sessões.
   - Salva a transação em `public/api/data/donations.json`.
4. **Endpoint de Estatísticas**:
   - URL: `https://cena-ca.org/api/donation-stats` (atendido por `public/api/donation-stats.php`)
   - Fornece o valor total arrecadado, número de doadores e percentual alcançado.
5. **Frontend**:
   - O hook [useDonationStats.ts](file:///c:/Users/manym/Downloads/cena.org.dev/Cenaorg/hooks/useDonationStats.ts) atualiza a barra de progresso em tempo real a cada 60 segundos.

---

## ⚙️ 3. Configuração no Painel do Stripe

Para conectar o rastreador ao seu Stripe:

1. Acesse o **Stripe Dashboard** (https://dashboard.stripe.com/).
2. Vá para **Developers (Desenvolvedores)** > **Webhooks**.
3. Clique em **Add endpoint (Adicionar endpoint)**.
4. Insira a URL do Endpoint:
   ```text
   https://cena-ca.org/api/stripe-webhook
   ```
5. Selecione os eventos para escutar:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
6. Clique em **Add endpoint**.

*(Opcional: caso queira validar assinatura criptográfica do Stripe, copie a chave de segredo do webhook `whsec_...` e crie o arquivo `public/api/config.php` retornando `['STRIPE_WEBHOOK_SECRET' => 'whsec_...']`).*

---

## 🔒 4. Segurança

- A pasta de dados `public/api/data/` é protegida com `.htaccess` com diretiva `Deny from all`, impedindo que visitantes baixem dados das doações diretamente pelo navegador.
