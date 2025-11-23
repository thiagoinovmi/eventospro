# 🔍 INSTRUÇÕES PARA VERIFICAR OS LOGS DE DEBUG

## 📋 O QUE FOI ADICIONADO

Adicionei logs detalhados no backend para rastrear exatamente o que está acontecendo quando você acessa a página do evento.

---

## 🧪 COMO VERIFICAR OS LOGS

### **Passo 1: Acessar o Evento**

1. Acesse: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`
2. Selecione uma data e hora
3. Selecione uma quantidade de ingressos

### **Passo 2: Verificar os Logs**

Execute este comando em outro terminal:

```bash
cd /www/wwwroot/eventos.inovmi.com.br
tail -50 storage/logs/laravel.log | grep -A 10 "MERCADO PAGO DEBUG"
```

### **Passo 3: Interpretar os Logs**

Você deve ver algo como:

```
[2025-11-23 18:15:30] local.INFO: === MERCADO PAGO DEBUG ===
[2025-11-23 18:15:30] local.INFO: enabled: 1
[2025-11-23 18:15:30] local.INFO: token empty: NO
[2025-11-23 18:15:30] local.INFO: key empty: NO
[2025-11-23 18:15:30] local.INFO: Enabled check passed
[2025-11-23 18:15:30] local.INFO: Token and Key check passed - MERCADO PAGO ENABLED
[2025-11-23 18:15:30] local.INFO: is_mercadopago result: 1
```

---

## 📊 INTERPRETAÇÃO DOS LOGS

### **Se você ver:**

```
enabled: 1
token empty: NO
key empty: NO
Token and Key check passed - MERCADO PAGO ENABLED
is_mercadopago result: 1
```

✅ **Significa:** Mercado Pago está habilitado e configurado corretamente
- A opção **DEVE** aparecer no checkout
- Se não aparecer, o problema está no frontend (Vue)

---

### **Se você ver:**

```
enabled: 1
token empty: YES
key empty: NO
Token or Key empty - MERCADO PAGO DISABLED
is_mercadopago result: 0
```

❌ **Significa:** Token está vazio
- Verifique se você preencheu o Access Token em `/admin/settings`
- Execute: `mysql -h 127.0.0.1 -u sql_eventos -p8261d7f2f44d sql_eventos -e "SELECT \`key\`, value FROM settings WHERE \`key\` = 'mercadopago.access_token';"`

---

### **Se você ver:**

```
enabled: 1
token empty: NO
key empty: YES
Token or Key empty - MERCADO PAGO DISABLED
is_mercadopago result: 0
```

❌ **Significa:** Public Key está vazia
- Verifique se você preencheu a Public Key em `/admin/settings`
- Execute: `mysql -h 127.0.0.1 -u sql_eventos -p8261d7f2f44d sql_eventos -e "SELECT \`key\`, value FROM settings WHERE \`key\` = 'mercadopago.public_key';"`

---

### **Se você ver:**

```
enabled: 0
Enabled check failed - MERCADO PAGO DISABLED
is_mercadopago result: 0
```

❌ **Significa:** Mercado Pago está desabilitado
- Verifique se o toggle "Habilitar Mercado Pago" está ativado em `/admin/settings`
- Execute: `mysql -h 127.0.0.1 -u sql_eventos -p8261d7f2f44d sql_eventos -e "SELECT \`key\`, value FROM settings WHERE \`key\` = 'mercadopago.enabled';"`

---

## 🔄 MONITORAR LOGS EM TEMPO REAL

Para ver os logs em tempo real enquanto você acessa a página:

```bash
tail -f storage/logs/laravel.log | grep "MERCADO PAGO"
```

Depois:
1. Abra outra aba do terminal
2. Acesse o evento: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`
3. Selecione ingressos
4. Volte para o terminal e veja os logs em tempo real

---

## 📝 CHECKLIST

- [ ] Acessei o evento
- [ ] Selecionei ingressos
- [ ] Executei o comando `tail -50 storage/logs/laravel.log | grep -A 10 "MERCADO PAGO DEBUG"`
- [ ] Vi os logs de debug
- [ ] Verifiquei se `is_mercadopago result: 1`
- [ ] Se for 1, a opção deve aparecer no checkout

---

## 🚀 PRÓXIMO PASSO

1. Execute os comandos acima
2. Compartilhe os logs comigo
3. Vamos identificar exatamente onde está o problema

---

**Status:** 🔍 Aguardando Logs
**Data:** 23 de Novembro de 2025
