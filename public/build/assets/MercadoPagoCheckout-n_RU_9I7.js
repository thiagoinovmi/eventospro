import { n as normalizeComponent } from "./mixins-DsimpN2H.js";
const _sfc_main = {
  props: {
    event: Object,
    tickets: Array,
    total: Number,
    currency: String,
    bookingData: Object,
    paymentMethods: {
      type: Object,
      default: () => ({})
    },
    installmentOptions: {
      type: Array,
      default: () => {
        const options = [];
        for (let i = 1; i <= 12; i++) {
          options.push({
            value: i,
            label: i === 1 ? "1x sem juros" : `${i}x ${i <= 6 ? "sem juros" : "com juros"}`
          });
        }
        return options;
      }
    }
  },
  data() {
    return {
      selectedMethod: "credit_card",
      selectedTicket: null,
      cardData: {
        holderName: "",
        number: "",
        expiry: "",
        cvv: "",
        installments: 1
      },
      errors: {
        cardholderName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: ""
      },
      errorMessage: "",
      successMessage: "",
      loadedMethods: {},
      pixData: null,
      pixQrCode: null,
      pixExpiration: null,
      isWaitingPayment: false,
      paymentCheckInterval: null
    };
  },
  mounted() {
    this.loadPaymentMethods();
  },
  computed: {
    subtotal() {
      const total = parseFloat(this.total) || 0;
      return total.toFixed(2);
    },
    tax() {
      return 0 .toFixed(2);
    }
  },
  methods: {
    setSelectedTicket(ticket) {
      console.log("Ticket selecionado no MercadoPagoCheckout:", ticket);
      this.selectedTicket = ticket;
    },
    loadPaymentMethods() {
      var _a, _b;
      console.log("=== CARREGANDO MÉTODOS DE PAGAMENTO ===");
      console.log("Event ID:", (_a = this.event) == null ? void 0 : _a.id);
      if (!((_b = this.event) == null ? void 0 : _b.id)) {
        console.error("Event ID não encontrado");
        return;
      }
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const url = `/api/mercadopago/payment-methods/event/${this.event.id}?t=${timestamp}`;
      console.log("Chamando API:", url);
      axios.get(url, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }).then((response) => {
        console.log("Resposta da API:", response.data);
        if (response.data.status && response.data.data) {
          const methods = response.data.data;
          console.log("Métodos carregados:", methods.length, methods);
          this.loadedMethods = {};
          methods.forEach((method) => {
            this.loadedMethods[method.type] = true;
          });
          console.log("Métodos processados:", this.loadedMethods);
          const firstMethod = methods[0];
          if (firstMethod) {
            this.selectedMethod = firstMethod.type;
          }
        } else {
          console.error("Erro na resposta:", response.data.message);
          this.errorMessage = response.data.message || "Erro ao carregar métodos de pagamento";
        }
      }).catch((error) => {
        console.error("Erro ao carregar métodos:", error);
        this.errorMessage = "Erro ao carregar métodos de pagamento: " + error.message;
      });
    },
    formatCardNumber() {
      var _a;
      let value = this.cardData.number.replace(/\s/g, "");
      let formatted = ((_a = value.match(/.{1,4}/g)) == null ? void 0 : _a.join(" ")) || value;
      this.cardData.number = formatted;
    },
    formatCardExpiry() {
      let value = this.cardData.expiry.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      this.cardData.expiry = value;
    },
    validateCardholderName() {
      if (this.cardData.holderName.length < 3) {
        this.errors.cardholderName = "Nome deve ter pelo menos 3 caracteres";
      } else {
        this.errors.cardholderName = "";
      }
    },
    validateCVV() {
      if (this.cardData.cvv.length < 3 || this.cardData.cvv.length > 4) {
        this.errors.cardCvv = "CVV deve ter 3 ou 4 dígitos";
      } else {
        this.errors.cardCvv = "";
      }
    },
    validateForm() {
      let isValid = true;
      if (this.selectedMethod === "credit_card" || this.selectedMethod === "debit_card") {
        if (this.cardData.holderName.length < 3) {
          this.errors.cardholderName = "Nome inválido";
          isValid = false;
        }
        if (this.cardData.number.replace(/\s/g, "").length !== 16) {
          this.errors.cardNumber = "Número do cartão inválido";
          isValid = false;
        }
        if (!this.cardData.expiry.match(/^\d{2}\/\d{2}$/)) {
          this.errors.cardExpiry = "Validade inválida (MM/YY)";
          isValid = false;
        }
        if (this.cardData.cvv.length < 3 || this.cardData.cvv.length > 4) {
          this.errors.cardCvv = "CVV inválido";
          isValid = false;
        }
      }
      return isValid;
    },
    async processPayment() {
      var _a, _b;
      console.log("=== PROCESS PAYMENT INICIADO ===");
      console.log("selectedMethod:", this.selectedMethod);
      console.log("selectedTicket:", this.selectedTicket);
      if (!this.validateForm()) {
        this.$emit("error", "Por favor, preencha todos os campos corretamente");
        return;
      }
      this.errorMessage = "";
      try {
        const ticketToUse = this.selectedTicket || (this.tickets && this.tickets.length > 0 ? this.tickets[0] : null);
        console.log("Ticket a ser usado:", ticketToUse);
        const paymentData = {
          event_id: this.event.id,
          booking_date: this.bookingData.booking_date,
          booking_end_date: this.bookingData.booking_end_date,
          start_time: this.bookingData.start_time,
          end_time: this.bookingData.end_time,
          payment_method: "mercadopago",
          selected_method: this.selectedMethod,
          total: this.total,
          ticket_id: ticketToUse ? ticketToUse.id : null,
          ticket_title: ticketToUse ? ticketToUse.title : null
        };
        if (["credit_card", "debit_card"].includes(this.selectedMethod)) {
          const cardToken = await this.generateCardToken();
          if (!cardToken) {
            this.errorMessage = "Erro ao gerar token do cartão. Verifique os dados e tente novamente.";
            return;
          }
          paymentData.card_token = cardToken;
          paymentData.installments = this.cardData.installments || 1;
        }
        const apiUrl = "/bookings/api/mercadopago/process";
        console.log("Enviando dados para:", apiUrl);
        console.log("Dados:", paymentData);
        const response = await axios.post(apiUrl, paymentData);
        console.log("Resposta recebida:", response.data);
        console.log("Response data completo:", response.data);
        console.log("selectedMethod:", this.selectedMethod);
        console.log("pix_data presente?", !!response.data.pix_data);
        if (response.data.status) {
          if (this.selectedMethod === "pix") {
            console.log("PIX selecionado - verificando dados");
            if (response.data.pix_data) {
              console.log("PIX data encontrado:", response.data.pix_data);
              this.pixData = response.data.pix_data;
              this.pixQrCode = response.data.pix_qr_code;
              this.pixExpiration = new Date(response.data.pix_expiration);
              this.isWaitingPayment = true;
              console.log("Estado atualizado:", {
                pixData: this.pixData,
                pixQrCode: this.pixQrCode,
                isWaitingPayment: this.isWaitingPayment
              });
              this.startPaymentCheck(response.data.transaction_id);
            } else {
              console.warn("PIX selecionado mas pix_data não retornou");
              console.log("Resposta completa:", response.data);
              this.errorMessage = "Falha ao gerar PIX. Tente novamente.";
            }
          } else {
            this.successMessage = response.data.message || "Pagamento processado com sucesso!";
            console.log("Pagamento confirmado com sucesso!");
            setTimeout(() => {
              window.location.href = "/mybookings";
            }, 3e3);
          }
        } else {
          this.$emit("error", response.data.message || "Erro ao processar pagamento");
        }
      } catch (error) {
        console.error("Payment error:", error);
        console.error("Resposta de erro:", error.response);
        const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Erro ao processar pagamento. Tente novamente.";
        this.errorMessage = errorMessage;
        console.error("Mensagem de erro:", errorMessage);
      }
    },
    startPaymentCheck(transactionId) {
      console.log("Iniciando verificação de pagamento PIX para:", transactionId);
      this.paymentCheckInterval = setInterval(async () => {
        try {
          const response = await axios.get(`/bookings/api/mercadopago/check-payment/${transactionId}`);
          if (response.data.status === "approved") {
            console.log("Pagamento aprovado!");
            clearInterval(this.paymentCheckInterval);
            this.successMessage = "Pagamento confirmado com sucesso!";
            this.isWaitingPayment = false;
            setTimeout(() => {
              window.location.href = "/mybookings";
            }, 2e3);
          }
        } catch (error) {
          console.error("Erro ao verificar pagamento:", error);
        }
      }, 5e3);
    },
    copyToClipboard() {
      const pixCode = document.getElementById("pixCode");
      if (pixCode) {
        pixCode.select();
        document.execCommand("copy");
        alert("Código PIX copiado para a área de transferência!");
      }
    },
    formatTimeRemaining(expirationTime) {
      const now = /* @__PURE__ */ new Date();
      const diff = expirationTime - now;
      if (diff <= 0) {
        return "Expirado";
      }
      const minutes = Math.floor(diff / 6e4);
      const seconds = Math.floor(diff % 6e4 / 1e3);
      return `${minutes}m ${seconds}s`;
    },
    async generateCardToken() {
      var _a, _b;
      try {
        if (!window.MercadoPago) {
          console.error("Mercado Pago SDK não carregado");
          return null;
        }
        const publicKeyResponse = await axios.get("/api/mercadopago/public-key");
        const publicKey = publicKeyResponse.data.public_key;
        if (!publicKey) {
          console.error("Public key não configurada");
          return null;
        }
        const mp = new window.MercadoPago(publicKey);
        const cardNumber = this.cardData.number.replace(/\D/g, "");
        console.log("DEBUG - Card data antes de gerar token:", {
          cardData_number_raw: this.cardData.number,
          cardNumber_cleaned: cardNumber,
          cardNumber_length: cardNumber.length,
          holderName: this.cardData.holderName,
          expiry: this.cardData.expiry,
          cvv: this.cardData.cvv
        });
        const cardData = {
          cardNumber,
          cardholderName: this.cardData.holderName,
          cardExpirationMonth: this.cardData.expiry.split("/")[0],
          cardExpirationYear: "20" + this.cardData.expiry.split("/")[1],
          securityCode: this.cardData.cvv
        };
        console.log("Gerando token com dados:", {
          cardNumber,
          cardNumberLength: cardNumber.length,
          cardNumberPreview: cardNumber.substring(0, 6) + "****" + cardNumber.slice(-4),
          cardholderName: cardData.cardholderName,
          cardExpirationMonth: cardData.cardExpirationMonth,
          cardExpirationYear: cardData.cardExpirationYear
        });
        const token = await mp.createCardToken(cardData);
        if (token && token.id) {
          console.log("Token gerado com sucesso:", token.id);
          return token.id;
        } else {
          console.error("Erro ao gerar token:", token);
          this.errorMessage = ((_b = (_a = token == null ? void 0 : token.cause) == null ? void 0 : _a[0]) == null ? void 0 : _b.description) || "Erro ao gerar token do cartão";
          return null;
        }
      } catch (error) {
        console.error("Exceção ao gerar token:", error);
        this.errorMessage = "Erro ao processar cartão: " + error.message;
        return null;
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mercadopago-checkout-container mt-4 p-4 border rounded bg-light" }, [_c("div", { staticClass: "mb-4" }, [_c("h5", { staticClass: "mb-3" }, [_c("i", { staticClass: "fas fa-credit-card me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.payment_details") || "Detalhes do Pagamento") + " ")]), _c("hr")]), _c("div", { staticClass: "row mb-4" }, [_c("div", { staticClass: "col-md-6" }, [_c("div", { staticClass: "card" }, [_c("div", { staticClass: "card-body" }, [_c("h6", { staticClass: "card-title mb-3" }, [_vm._v(_vm._s(_vm.trans("em.order_summary") || "Resumo do Pedido"))]), _c("div", { staticClass: "d-flex justify-content-between mb-2" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.subtotal") || "Subtotal") + ":")]), _c("strong", [_vm._v(_vm._s(_vm.subtotal) + " " + _vm._s(_vm.currency))])]), _c("div", { staticClass: "d-flex justify-content-between mb-2" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.tax") || "Taxa") + ":")]), _c("strong", [_vm._v(_vm._s(_vm.tax) + " " + _vm._s(_vm.currency))])]), _c("hr"), _c("div", { staticClass: "d-flex justify-content-between" }, [_c("span", { staticClass: "h6" }, [_vm._v(_vm._s(_vm.trans("em.total") || "Total") + ":")]), _c("strong", { staticClass: "h6" }, [_vm._v(_vm._s(_vm.total) + " " + _vm._s(_vm.currency))])])])])]), _c("div", { staticClass: "col-md-6" }, [_c("div", { staticClass: "card" }, [_c("div", { staticClass: "card-body" }, [_c("h6", { staticClass: "card-title mb-3" }, [_vm._v(_vm._s(_vm.trans("em.payment_method") || "Método de Pagamento"))]), _vm.loadedMethods.credit_card ? _c("div", { staticClass: "form-check mb-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedMethod, expression: "selectedMethod" }], staticClass: "form-check-input", attrs: { "type": "radio", "id": "method_credit_card", "value": "credit_card" }, domProps: { "checked": _vm._q(_vm.selectedMethod, "credit_card") }, on: { "change": function($event) {
    _vm.selectedMethod = "credit_card";
  } } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "method_credit_card" } }, [_c("i", { staticClass: "fas fa-credit-card me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.credit_card") || "Cartão de Crédito") + " ")])]) : _vm._e(), _vm.loadedMethods.debit_card ? _c("div", { staticClass: "form-check mb-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedMethod, expression: "selectedMethod" }], staticClass: "form-check-input", attrs: { "type": "radio", "id": "method_debit_card", "value": "debit_card" }, domProps: { "checked": _vm._q(_vm.selectedMethod, "debit_card") }, on: { "change": function($event) {
    _vm.selectedMethod = "debit_card";
  } } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "method_debit_card" } }, [_c("i", { staticClass: "fas fa-credit-card me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.debit_card") || "Cartão de Débito") + " ")])]) : _vm._e(), _vm.loadedMethods.boleto ? _c("div", { staticClass: "form-check mb-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedMethod, expression: "selectedMethod" }], staticClass: "form-check-input", attrs: { "type": "radio", "id": "method_boleto", "value": "boleto" }, domProps: { "checked": _vm._q(_vm.selectedMethod, "boleto") }, on: { "change": function($event) {
    _vm.selectedMethod = "boleto";
  } } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "method_boleto" } }, [_c("i", { staticClass: "fas fa-barcode me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.boleto") || "Boleto Bancário") + " ")])]) : _vm._e(), _vm.loadedMethods.pix ? _c("div", { staticClass: "form-check mb-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedMethod, expression: "selectedMethod" }], staticClass: "form-check-input", attrs: { "type": "radio", "id": "method_pix", "value": "pix" }, domProps: { "checked": _vm._q(_vm.selectedMethod, "pix") }, on: { "change": function($event) {
    _vm.selectedMethod = "pix";
  } } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "method_pix" } }, [_c("i", { staticClass: "fas fa-mobile-alt me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.pix") || "PIX") + " ")])]) : _vm._e(), _vm.loadedMethods.mercadopago_wallet ? _c("div", { staticClass: "form-check" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedMethod, expression: "selectedMethod" }], staticClass: "form-check-input", attrs: { "type": "radio", "id": "method_wallet", "value": "mercadopago_wallet" }, domProps: { "checked": _vm._q(_vm.selectedMethod, "mercadopago_wallet") }, on: { "change": function($event) {
    _vm.selectedMethod = "mercadopago_wallet";
  } } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "method_wallet" } }, [_c("i", { staticClass: "fas fa-wallet me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.wallet") || "Carteira Mercado Pago") + " ")])]) : _vm._e()])])])]), ["credit_card", "debit_card"].includes(_vm.selectedMethod) ? _c("div", { staticClass: "row mb-4" }, [_c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "card" }, [_c("div", { staticClass: "card-body" }, [_c("h6", { staticClass: "card-title mb-3" }, [_vm._v(_vm._s(_vm.trans("em.card_details") || "Dados do Cartão"))]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "cardholderName" } }, [_vm._v(_vm._s(_vm.trans("em.cardholder_name") || "Nome do Titular"))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.cardData.holderName, expression: "cardData.holderName" }], staticClass: "form-control", attrs: { "type": "text", "id": "cardholderName", "placeholder": "João Silva" }, domProps: { "value": _vm.cardData.holderName }, on: { "input": [function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.cardData, "holderName", $event.target.value);
  }, _vm.validateCardholderName] } }), _vm.errors.cardholderName ? _c("small", { staticClass: "text-danger" }, [_vm._v(_vm._s(_vm.errors.cardholderName))]) : _vm._e()]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "cardNumber" } }, [_vm._v(_vm._s(_vm.trans("em.card_number") || "Número do Cartão"))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.cardData.number, expression: "cardData.number" }], staticClass: "form-control", attrs: { "type": "text", "id": "cardNumber", "placeholder": "1234 5678 9012 3456", "maxlength": "19" }, domProps: { "value": _vm.cardData.number }, on: { "input": [function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.cardData, "number", $event.target.value);
  }, _vm.formatCardNumber] } }), _vm.errors.cardNumber ? _c("small", { staticClass: "text-danger" }, [_vm._v(_vm._s(_vm.errors.cardNumber))]) : _vm._e()]), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-6 mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "cardExpiry" } }, [_vm._v(_vm._s(_vm.trans("em.expiry_date") || "Validade"))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.cardData.expiry, expression: "cardData.expiry" }], staticClass: "form-control", attrs: { "type": "text", "id": "cardExpiry", "placeholder": "MM/YY", "maxlength": "5" }, domProps: { "value": _vm.cardData.expiry }, on: { "input": [function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.cardData, "expiry", $event.target.value);
  }, _vm.formatCardExpiry] } }), _vm.errors.cardExpiry ? _c("small", { staticClass: "text-danger" }, [_vm._v(_vm._s(_vm.errors.cardExpiry))]) : _vm._e()]), _c("div", { staticClass: "col-md-6 mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "cardCvv" } }, [_vm._v(_vm._s(_vm.trans("em.cvv") || "CVV"))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.cardData.cvv, expression: "cardData.cvv" }], staticClass: "form-control", attrs: { "type": "text", "id": "cardCvv", "placeholder": "123", "maxlength": "4" }, domProps: { "value": _vm.cardData.cvv }, on: { "input": [function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.cardData, "cvv", $event.target.value);
  }, _vm.validateCVV] } }), _vm.errors.cardCvv ? _c("small", { staticClass: "text-danger" }, [_vm._v(_vm._s(_vm.errors.cardCvv))]) : _vm._e()])]), ["credit_card", "wallet"].includes(_vm.selectedMethod) && _vm.installmentOptions.length > 0 ? _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "installments" } }, [_vm._v(_vm._s(_vm.trans("em.installments") || "Parcelamento"))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.cardData.installments, expression: "cardData.installments" }], staticClass: "form-select", attrs: { "id": "installments" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.$set(_vm.cardData, "installments", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
  } } }, _vm._l(_vm.installmentOptions, function(option) {
    return _c("option", { key: option.value, domProps: { "value": option.value } }, [_vm._v(" " + _vm._s(option.label) + " ")]);
  }), 0)]) : _vm._e()])])])]) : _vm._e(), _vm.isWaitingPayment && _vm.selectedMethod === "pix" ? _c("div", { staticClass: "row mb-4" }, [_c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "card border-success" }, [_c("div", { staticClass: "card-body text-center" }, [_c("h6", { staticClass: "card-title mb-4" }, [_c("i", { staticClass: "fas fa-mobile-alt me-2 text-success" }), _vm._v(" " + _vm._s(_vm.trans("em.waiting_pix_payment") || "Aguardando Pagamento PIX") + " ")]), _vm.pixQrCode ? _c("div", { staticClass: "mb-4" }, [_c("img", { staticClass: "img-fluid", staticStyle: { "max-width": "300px" }, attrs: { "src": _vm.pixQrCode, "alt": "PIX QR Code" } })]) : _vm._e(), _vm.pixData ? _c("div", { staticClass: "mb-4" }, [_c("p", { staticClass: "text-muted mb-2" }, [_vm._v(_vm._s(_vm.trans("em.or_copy_code") || "Ou copie o código:"))]), _c("div", { staticClass: "input-group" }, [_c("input", { staticClass: "form-control", attrs: { "type": "text", "readonly": "", "id": "pixCode" }, domProps: { "value": _vm.pixData } }), _c("button", { staticClass: "btn btn-outline-primary", attrs: { "type": "button" }, on: { "click": _vm.copyToClipboard } }, [_c("i", { staticClass: "fas fa-copy me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.copy") || "Copiar") + " ")])])]) : _vm._e(), _vm.pixExpiration ? _c("div", { staticClass: "alert alert-info" }, [_c("i", { staticClass: "fas fa-clock me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.pix_expires_in") || "PIX expira em") + ": "), _c("strong", [_vm._v(_vm._s(_vm.formatTimeRemaining(_vm.pixExpiration)))])]) : _vm._e(), _c("div", { staticClass: "alert alert-warning" }, [_c("i", { staticClass: "fas fa-hourglass-half me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.waiting_payment_confirmation") || "Aguardando confirmação do pagamento...") + " ")])])])])]) : _vm._e(), _vm.errorMessage ? _c("div", { staticClass: "alert alert-danger alert-dismissible fade show", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-exclamation-circle me-2" }), _vm._v(" " + _vm._s(_vm.errorMessage) + " "), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "aria-label": "Close" }, on: { "click": function($event) {
    _vm.errorMessage = "";
  } } })]) : _vm._e(), _vm.successMessage ? _c("div", { staticClass: "alert alert-success alert-dismissible fade show", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-check-circle me-2" }), _vm._v(" " + _vm._s(_vm.successMessage) + " "), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "aria-label": "Close" }, on: { "click": function($event) {
    _vm.successMessage = "";
  } } })]) : _vm._e(), _c("div", { staticClass: "mt-4 text-center" }, [_c("small", { staticClass: "text-muted" }, [_c("i", { staticClass: "fas fa-shield-alt me-1" }), _vm._v(" " + _vm._s(_vm.trans("em.secure_payment") || "Pagamento seguro com Mercado Pago") + " ")])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "35e2060a"
);
const MercadoPagoCheckout = __component__.exports;
export {
  MercadoPagoCheckout as default
};
//# sourceMappingURL=MercadoPagoCheckout-n_RU_9I7.js.map
