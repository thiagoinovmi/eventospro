# 🎯 GUIA COMPLETO - INTEGRAÇÃO MERCADO PAGO

## 📋 RESUMO EXECUTIVO

Integração completa do Mercado Pago com suporte a:
- ✅ Checkout transparente
- ✅ 5 métodos de pagamento
- ✅ Painel do usuário
- ✅ Painel administrativo
- ✅ Gerenciamento de reembolsos
- ✅ Relatórios e filtros

---

## 🚀 COMO ACESSAR

### **1. PAINEL DO USUÁRIO - Minhas Transações**

**URL:** `https://eventos.inovmi.com.br/mercadopago/transactions`

**Acesso:**
1. Faça login como cliente
2. Acesse o link acima
3. Ou navegue: Painel do Usuário → Transações Mercado Pago

**O que você vê:**
- Lista de todas as suas transações
- Detalhes completos de cada transação
- Opção para solicitar reembolso
- Status em tempo real

---

### **2. PAINEL ADMINISTRATIVO - Gerenciamento de Transações**

**URL:** `https://eventos.inovmi.com.br/admin/mercadopago/transactions`

**Acesso:**
1. Faça login como administrador
2. Acesse o link acima
3. Ou navegue: Voyager Admin → [Menu Mercado Pago - em desenvolvimento]

**O que você vê:**
- Dashboard com estatísticas
- Tabela de todas as transações do sistema
- Filtros avançados
- Busca por ID, Email ou Nome
- Gerenciamento de reembolsos

---

## 🔧 CONFIGURAÇÃO INICIAL

### **Passo 1: Configurar Credenciais do Mercado Pago**

**URL:** `https://eventos.inovmi.com.br/dashboard/mercadopago/api/settings`

**Passos:**
1. Acesse a URL acima (requer login de admin)
2. Preencha os campos:
   - **Access Token**: Token de acesso do Mercado Pago
   - **Public Key**: Chave pública
   - **Modo**: Teste ou Produção
   - **URL do Webhook**: `https://eventos.inovmi.com.br/webhooks/mercadopago`
   - **Token do Webhook**: Token para validar webhooks
3. Clique em "Testar Conexão"
4. Salve as configurações

### **Passo 2: Habilitar Métodos de Pagamento**

**URL:** `https://eventos.inovmi.com.br/dashboard/mercadopago/api/payment-methods`

**Passos:**
1. Acesse a URL acima
2. Você verá os métodos disponíveis:
   - Cartão de Crédito
   - Cartão de Débito
   - Boleto Bancário
   - PIX
   - Carteira Mercado Pago
3. Habilite os métodos desejados
4. Configure parcelamento (se aplicável)
5. Salve as alterações

---

## 💳 FLUXO DE PAGAMENTO

### **Cliente - Fazer uma Compra**

1. **Acesse um evento:**
   - URL: `https://eventos.inovmi.com.br/events/{event-slug}#/checkout`
   - Exemplo: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`

2. **Selecione ingressos e Mercado Pago:**
   - Escolha a quantidade de ingressos
   - Selecione "Mercado Pago" como método de pagamento
   - Clique em "Checkout"

3. **Preencha dados do pagamento:**
   - Selecione o método (Cartão, Boleto, PIX, etc)
   - Preencha os dados do titular
   - Selecione número de parcelas (se cartão)
   - Clique em "Pagar Agora"

4. **Confirmação:**
   - Você será redirecionado para a página de sucesso
   - Receberá email de confirmação
   - Poderá acompanhar em "Minhas Transações"

---

## 📊 PAINEL DO USUÁRIO - Detalhes

### **Funcionalidades:**

1. **Listar Transações**
   - Todas as suas transações aparecem em uma tabela
   - Paginação de 15 transações por página
   - Status com cores (Verde=Aprovado, Amarelo=Pendente, Vermelho=Rejeitado)

2. **Ver Detalhes**
   - Clique no ícone 👁️ para ver detalhes completos
   - Informações do pagador
   - Dados do pagamento
   - Histórico de reembolsos

3. **Solicitar Reembolso**
   - Clique no ícone ↩️ (apenas para pagamentos aprovados)
   - Preencha o motivo
   - Opcionalmente, escolha valor parcial
   - Clique em "Solicitar Reembolso"

4. **Acompanhar Status**
   - Veja o status em tempo real
   - Acompanhe reembolsos solicitados
   - Receba notificações por email

---

## 🔐 PAINEL ADMINISTRATIVO - Detalhes

### **Dashboard com Estatísticas:**

- **Total de Transações**: Contagem total de transações
- **Total Aprovado**: Soma de valores aprovados
- **Total Reembolsado**: Soma de reembolsos processados
- **Reembolsos Pendentes**: Contagem de reembolsos em aberto

### **Filtros Disponíveis:**

1. **Por Status:**
   - Pendente
   - Autorizado
   - Aprovado
   - Rejeitado
   - Cancelado
   - Reembolsado

2. **Por Método de Pagamento:**
   - Cartão de Crédito
   - Cartão de Débito
   - Boleto
   - PIX

3. **Por Data:**
   - Data inicial
   - Data final

4. **Busca:**
   - Por ID da transação
   - Por Email do pagador
   - Por Nome do pagador

### **Ações Disponíveis:**

1. **Ver Detalhes** (👁️)
   - Informações completas da transação
   - Dados do pagador
   - Histórico de reembolsos

2. **Solicitar Reembolso** (↩️)
   - Disponível apenas para pagamentos aprovados
   - Reembolso total ou parcial
   - Motivo obrigatório

---

## 🧪 TESTES RECOMENDADOS

### **Teste 1: Configuração**
- [ ] Acesse as configurações do Mercado Pago
- [ ] Teste a conexão com as credenciais
- [ ] Verifique se os métodos de pagamento aparecem

### **Teste 2: Checkout**
- [ ] Acesse um evento
- [ ] Selecione Mercado Pago como método
- [ ] Preencha os dados
- [ ] Verifique se a transação é criada no banco

### **Teste 3: Painel do Usuário**
- [ ] Acesse `/mercadopago/transactions`
- [ ] Verifique se a transação aparece
- [ ] Clique em "Ver Detalhes"
- [ ] Teste solicitar reembolso

### **Teste 4: Painel Administrativo**
- [ ] Acesse `/admin/mercadopago/transactions`
- [ ] Verifique se as estatísticas aparecem
- [ ] Teste os filtros
- [ ] Teste a busca
- [ ] Teste solicitar reembolso como admin

### **Teste 5: Webhooks**
- [ ] Configure webhook no Mercado Pago
- [ ] Verifique se as notificações são recebidas
- [ ] Verifique se o status é atualizado automaticamente

---

## 📱 MÉTODOS DE PAGAMENTO

### **Cartão de Crédito**
- ✅ Suporta parcelamento
- ✅ Dados do titular obrigatórios
- ✅ Validação de CVV
- ✅ Suporta 3D Secure

### **Cartão de Débito**
- ✅ Sem parcelamento
- ✅ Dados do titular obrigatórios
- ✅ Validação de CVV

### **Boleto Bancário**
- ✅ Sem parcelamento
- ✅ Geração automática
- ✅ Código de barras
- ✅ Vencimento configurável

### **PIX**
- ✅ Transferência instantânea
- ✅ QR Code gerado automaticamente
- ✅ Confirmação em tempo real

### **Carteira Mercado Pago**
- ✅ Saldo em conta
- ✅ Sem dados de cartão
- ✅ Rápido e seguro

---

## 🔔 NOTIFICAÇÕES E EMAILS

### **Cliente Recebe:**
- Email de confirmação de pagamento
- Email de reembolso solicitado
- Email de reembolso processado
- Notificações no painel

### **Admin Recebe:**
- Notificação de pagamento rejeitado
- Notificação de reembolso solicitado
- Relatório diário de transações (opcional)

---

## 📊 RELATÓRIOS

### **Disponíveis no Painel Admin:**

1. **Por Status**
   - Quantas transações em cada status
   - Valor total por status

2. **Por Método**
   - Qual método é mais usado
   - Valor total por método

3. **Por Data**
   - Transações em período específico
   - Tendências de vendas

4. **Reembolsos**
   - Reembolsos pendentes
   - Reembolsos processados
   - Valor total reembolsado

---

## 🐛 TROUBLESHOOTING

### **Problema: Erro 403 ao acessar `/storage/`**
**Solução:** Permissões de arquivo foram corrigidas. Se persistir:
```bash
sudo chown -R www-data:www-data /storage
sudo chmod -R 755 /storage
```

### **Problema: Transação não aparece no painel**
**Solução:** 
1. Verifique se o webhook foi recebido
2. Verifique os logs em `storage/logs/laravel.log`
3. Teste a conexão com Mercado Pago

### **Problema: Reembolso não funciona**
**Solução:**
1. Verifique se o pagamento está aprovado
2. Verifique se há saldo em conta
3. Verifique as permissões do token

---

## 📞 SUPORTE

Para problemas ou dúvidas:
1. Verifique os logs: `storage/logs/laravel.log`
2. Teste a conexão com Mercado Pago
3. Verifique as credenciais
4. Contate o suporte do Mercado Pago

---

## 📈 PRÓXIMOS PASSOS

- [ ] Implementar relatórios avançados em PDF
- [ ] Adicionar gráficos de vendas
- [ ] Implementar notificações em tempo real
- [ ] Adicionar suporte a múltiplas contas Mercado Pago
- [ ] Implementar reconciliação automática

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** ✅ Completo e Testado
