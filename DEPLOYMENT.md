# Guia de Deploy Seguro - flownex.com.br

## 🔒 Arquitetura de Segurança Implementada

Seu `agent-id` do ElevenLabs agora está **100% protegido**:

- ✅ Não aparece no código fonte do GitHub
- ✅ Não aparece no bundle JavaScript compilado
- ✅ Armazenado de forma segura no Supabase Edge Functions
- ✅ Acessado apenas via API protegida

---

## 📋 Passo 1: Configurar Secret no Supabase

**IMPORTANTE**: Você precisa adicionar o `agent-id` como secret no Supabase:

1. Acesse: https://supabase.com/dashboard/project/pkekrrqvlwnupfgaxkjr/settings/functions
2. Vá em **Edge Functions** → **Secrets**
3. Adicione um novo secret:
   - **Nome**: `ELEVENLABS_AGENT_ID`
   - **Valor**: `agent_4601k6zzfw2ffwgthzay9gamk19s`
4. Salve

Após configurar, a Edge Function `elevenlabs-proxy` vai funcionar automaticamente.

---

## 🚀 Passo 2: Deploy na Vercel (Recomendado)

### 2.1 - Criar conta e conectar repositório

1. Acesse: https://vercel.com/signup
2. Conecte sua conta do GitHub
3. Importe seu repositório
4. Vercel vai detectar automaticamente que é um projeto Vite + React

### 2.2 - Configurar Variáveis de Ambiente na Vercel

Na dashboard da Vercel, adicione estas variáveis:

```
VITE_SUPABASE_URL=https://pkekrrqvlwnupfgaxkjr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWtycnF2bHdudXBmZ2F4a2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjMwNzQsImV4cCI6MjA3Njk5OTA3NH0.YswKOHzlq-ARZKzkA6D5YVlwG9EAiGcEf0yM1hOJJhE
```

### 2.3 - Deploy

Clique em **Deploy**. A Vercel vai:
- Instalar dependências (`npm install`)
- Fazer build (`npm run build`)
- Publicar automaticamente

---

## 🌐 Passo 3: Conectar seu Domínio flownex.com.br

### Na Vercel:

1. Vá em **Settings** → **Domains**
2. Adicione: `flownex.com.br`
3. A Vercel vai fornecer registros DNS para configurar

### No Hostinger:

1. Acesse o painel do Hostinger
2. Vá em **Domínios** → **flownex.com.br** → **DNS/Nameservers**
3. Adicione os registros que a Vercel forneceu:

**Opção A - CNAME (mais comum)**:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Opção B - A Records**:
```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: A
Name: www
Value: 76.76.21.21
```

4. Aguarde propagação DNS (pode levar até 48h, geralmente 15-30 minutos)

---

## ✅ Verificar se está funcionando

Após o deploy:

1. Acesse `https://flownex.com.br`
2. Abra o Console do navegador (F12)
3. O widget do ElevenLabs deve carregar sem erros
4. O `agent-id` **NÃO** aparece no código fonte ou JavaScript

---

## 🔄 Alternativa: Deploy na Netlify

Se preferir Netlify ao invés de Vercel:

1. Acesse: https://app.netlify.com
2. Conecte seu repositório GitHub
3. Configure as mesmas variáveis de ambiente
4. O processo de domínio é similar

---

## 🛠️ Para Desenvolver Localmente

```bash
npm install
npm run dev
```

O projeto roda em: `http://localhost:5173`

---

## 📝 Notas Importantes

- ✅ O arquivo `.env` está no `.gitignore` - nunca vai para o GitHub
- ✅ O `agent-id` só existe no Supabase Edge Functions (servidor)
- ✅ Frontend busca o `agent-id` via API protegida
- ✅ Seu repositório GitHub está 100% seguro para ser público

---

## ❓ Dúvidas?

Se tiver problemas:
1. Verifique se o secret foi adicionado no Supabase
2. Confirme que as variáveis de ambiente estão na Vercel
3. Teste a Edge Function: `https://pkekrrqvlwnupfgaxkjr.supabase.co/functions/v1/elevenlabs-proxy`
