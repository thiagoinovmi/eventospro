# 🧪 TESTES - INTEGRAÇÃO MERCADO PAGO

## 📋 PLANO DE TESTES

---

## ✅ TESTE 1: CONFIGURAÇÃO INICIAL

### **Objetivo:** Verificar se as configurações do Mercado Pago estão corretas

**Passos:**
1. Acesse: `https://eventos.inovmi.com.br/dashboard/mercadopago/api/settings`
2. Verifique se o formulário carrega
3. Preencha com credenciais de teste do Mercado Pago
4. Clique em "Testar Conexão"
5. Verifique se a mensagem de sucesso aparece

**Resultado Esperado:**
- ✅ Formulário carrega sem erros
- ✅ Conexão com Mercado Pago estabelecida
- ✅ Mensagem de sucesso exibida
- ✅ Configurações salvas no banco

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 2: HABILITAR MÉTODOS DE PAGAMENTO

### **Objetivo:** Verificar se os métodos de pagamento podem ser habilitados

**Passos:**
1. Acesse: `https://eventos.inovmi.com.br/dashboard/mercadopago/api/payment-methods`
2. Verifique se a lista de métodos aparece
3. Habilite: Cartão de Crédito, Boleto, PIX
4. Configure parcelamento para Cartão de Crédito
5. Salve as alterações

**Resultado Esperado:**
- ✅ Lista de métodos carrega
- ✅ Métodos podem ser habilitados
- ✅ Parcelamento pode ser configurado
- ✅ Alterações são salvas

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 3: SELEÇÃO DE MÉTODO NO CHECKOUT

### **Objetivo:** Verificar se o Mercado Pago aparece como opção de pagamento

**Passos:**
1. Acesse um evento: `https://eventos.inovmi.com.br/events/{slug}#/checkout`
2. Selecione ingressos
3. Verifique se "Mercado Pago" aparece como opção
4. Selecione Mercado Pago
5. Verifique se o botão "Checkout" fica habilitado

**Resultado Esperado:**
- ✅ Opção Mercado Pago aparece
- ✅ Ícone de cartão exibido
- ✅ Pode ser selecionado
- ✅ Botão Checkout fica habilitado

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 4: PÁGINA DE CHECKOUT

### **Objetivo:** Verificar se a página de checkout carrega corretamente

**Passos:**
1. Após selecionar Mercado Pago, clique em "Checkout"
2. Verifique se a página `/mercadopago/checkout` carrega
3. Verifique se os métodos de pagamento aparecem
4. Verifique se o resumo do pedido aparece
5. Verifique se o botão "Pagar Agora" está presente

**Resultado Esperado:**
- ✅ Página carrega sem erros
- ✅ Métodos de pagamento aparecem
- ✅ Resumo do pedido exibido
- ✅ Botão "Pagar Agora" presente

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 5: PAINEL DO USUÁRIO - TRANSAÇÕES

### **Objetivo:** Verificar se as transações aparecem no painel do usuário

**Passos:**
1. Faça login como cliente
2. Acesse: `https://eventos.inovmi.com.br/mercadopago/transactions`
3. Verifique se a tabela de transações carrega
4. Verifique se há transações listadas
5. Clique em "Ver Detalhes" de uma transação
6. Verifique se o modal com detalhes abre

**Resultado Esperado:**
- ✅ Página carrega sem erros
- ✅ Transações aparecem na tabela
- ✅ Modal de detalhes abre
- ✅ Informações corretas exibidas

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 6: PAINEL ADMINISTRATIVO - ACESSO

### **Objetivo:** Verificar se o painel administrativo é acessível

**Passos:**
1. Faça login como administrador
2. Acesse: `https://eventos.inovmi.com.br/admin/mercadopago/transactions`
3. Verifique se o painel carrega
4. Verifique se o dashboard com estatísticas aparece
5. Verifique se a tabela de transações carrega

**Resultado Esperado:**
- ✅ Página carrega sem erros
- ✅ Dashboard com estatísticas exibido
- ✅ Tabela de transações carrega
- ✅ Filtros aparecem

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 7: FILTROS NO PAINEL ADMINISTRATIVO

### **Objetivo:** Verificar se os filtros funcionam corretamente

**Passos:**
1. No painel admin, teste cada filtro:
   - **Status**: Selecione "Aprovado"
   - **Método**: Selecione "Cartão de Crédito"
   - **Data**: Selecione intervalo
   - **Busca**: Digite um email
2. Verifique se os resultados são filtrados
3. Clique em "Resetar" para limpar filtros

**Resultado Esperado:**
- ✅ Filtro por Status funciona
- ✅ Filtro por Método funciona
- ✅ Filtro por Data funciona
- ✅ Busca funciona
- ✅ Resetar limpa todos os filtros

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 8: ESTATÍSTICAS DO PAINEL

### **Objetivo:** Verificar se as estatísticas são calculadas corretamente

**Passos:**
1. No painel admin, verifique:
   - **Total de Transações**: Deve corresponder ao número de transações
   - **Total Aprovado**: Deve ser a soma de valores aprovados
   - **Total Reembolsado**: Deve ser a soma de reembolsos
   - **Reembolsos Pendentes**: Deve contar reembolsos em aberto

**Resultado Esperado:**
- ✅ Total de Transações correto
- ✅ Total Aprovado correto
- ✅ Total Reembolsado correto
- ✅ Reembolsos Pendentes correto

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 9: SOLICITAR REEMBOLSO

### **Objetivo:** Verificar se o reembolso pode ser solicitado

**Passos:**
1. No painel do usuário, clique em ↩️ em uma transação aprovada
2. Preencha o motivo do reembolso
3. Opcionalmente, altere o valor
4. Clique em "Solicitar Reembolso"
5. Verifique se a mensagem de sucesso aparece
6. Verifique se a transação é atualizada

**Resultado Esperado:**
- ✅ Modal de reembolso abre
- ✅ Motivo é obrigatório
- ✅ Valor pode ser alterado
- ✅ Reembolso é processado
- ✅ Mensagem de sucesso exibida

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 10: PAGINAÇÃO

### **Objetivo:** Verificar se a paginação funciona

**Passos:**
1. No painel admin, verifique se há múltiplas páginas
2. Clique em "Próximo"
3. Verifique se a próxima página carrega
4. Clique em um número de página
5. Verifique se a página carrega

**Resultado Esperado:**
- ✅ Paginação aparece se houver múltiplas páginas
- ✅ Botão "Próximo" funciona
- ✅ Números de página funcionam
- ✅ Página correta carrega

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 11: RESPONSIVIDADE

### **Objetivo:** Verificar se a interface é responsiva

**Passos:**
1. Acesse o painel em diferentes resoluções:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
2. Verifique se a interface se adapta
3. Verifique se os botões são clicáveis
4. Verifique se a tabela é legível

**Resultado Esperado:**
- ✅ Interface se adapta em desktop
- ✅ Interface se adapta em tablet
- ✅ Interface se adapta em mobile
- ✅ Todos os elementos são acessíveis

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## ✅ TESTE 12: SEGURANÇA

### **Objetivo:** Verificar se a segurança está implementada

**Passos:**
1. Tente acessar `/admin/mercadopago/transactions` sem estar logado
2. Verifique se é redirecionado para login
3. Tente acessar como cliente (não admin)
4. Verifique se é negado acesso
5. Verifique se os dados sensíveis não são exibidos

**Resultado Esperado:**
- ✅ Não logado: Redirecionado para login
- ✅ Cliente: Acesso negado
- ✅ Admin: Acesso permitido
- ✅ Dados sensíveis protegidos

**Resultado Real:**
- [ ] Passou
- [ ] Falhou

**Notas:**
_______________________________________________

---

## 📊 RESUMO DOS TESTES

| Teste | Status | Notas |
|-------|--------|-------|
| 1. Configuração | [ ] | |
| 2. Métodos | [ ] | |
| 3. Seleção Checkout | [ ] | |
| 4. Página Checkout | [ ] | |
| 5. Painel Usuário | [ ] | |
| 6. Acesso Admin | [ ] | |
| 7. Filtros | [ ] | |
| 8. Estatísticas | [ ] | |
| 9. Reembolso | [ ] | |
| 10. Paginação | [ ] | |
| 11. Responsividade | [ ] | |
| 12. Segurança | [ ] | |

---

## ✅ CHECKLIST FINAL

- [ ] Todos os testes passaram
- [ ] Nenhum erro no console
- [ ] Nenhum erro nos logs
- [ ] Performance aceitável
- [ ] Interface responsiva
- [ ] Segurança validada
- [ ] Documentação completa

---

**Data dos Testes:** _______________
**Testador:** _______________
**Resultado Final:** _______________
