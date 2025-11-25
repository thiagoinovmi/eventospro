import { n as normalizeComponent } from "./mixins-CO2EmGtw.js";
const _sfc_main = {
  props: {
    event: Object,
    tickets: Array,
    total: Number,
    currency: String,
    bookingData: Object,
    isRetry: {
      type: Boolean,
      default: false
    },
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
        installments: 1,
        paymentMethodId: "credit_card"
        // Will be updated based on card brand
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
      paymentCheckInterval: null,
      paymentConfirmed: false,
      timerCounter: 0,
      timerInterval: null,
      deviceId: null,
      // 🔐 Device ID para segurança Mercado Pago
      mp: null
      // 🔐 Instância do SDK Mercado Pago
    };
  },
  mounted() {
    this.loadPaymentMethods();
    this.initializeMercadoPagoSDK();
    this.loadUserData();
    this.timerInterval = setInterval(() => {
      this.timerCounter++;
    }, 1e3);
  },
  beforeDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.paymentCheckInterval) {
      clearInterval(this.paymentCheckInterval);
    }
  },
  computed: {
    timerTrigger() {
      return this.timerCounter;
    },
    subtotal() {
      const total = parseFloat(this.total) || 0;
      return total.toFixed(2);
    },
    tax() {
      return 0 .toFixed(2);
    },
    // 🔍 Verificar se CPF está preenchido
    userCPF() {
      return window.currentUser && window.currentUser.document;
    },
    // 🔍 Verificar se Telefone está preenchido
    userPhone() {
      return window.currentUser && window.currentUser.phone;
    },
    // 🔍 Verificar se Endereço está completo
    userAddressComplete() {
      if (!window.currentUser) return false;
      const user = window.currentUser;
      return user.address_zip_code && user.address_street && user.address_number && user.address_neighborhood && user.address_city && user.address_state;
    },
    // 🔍 Verificar se todos os dados estão completos
    userDataComplete() {
      return this.userCPF && this.userPhone && this.userAddressComplete;
    }
  },
  watch: {
    // 🔑 NOVO: Emitir evento quando isWaitingPayment muda
    isWaitingPayment(newValue) {
      this.$emit("waiting-payment-changed", newValue);
    },
    // 🔑 NOVO: Emitir evento quando paymentConfirmed muda
    paymentConfirmed(newValue) {
      this.$emit("payment-confirmed-changed", newValue);
    }
  },
  methods: {
    setSelectedTicket(ticket) {
      console.log("Ticket selecionado no MercadoPagoCheckout:", ticket);
      this.selectedTicket = ticket;
    },
    // 🔐 Inicializar SDK Mercado Pago V2 para obter Device ID
    initializeMercadoPagoSDK() {
      var _a;
      try {
        if (typeof MercadoPago === "undefined") {
          console.warn("SDK Mercado Pago não carregado. Carregando via CDN...");
          this.loadMercadoPagoSDK();
          return;
        }
        const publicKey = (_a = document.querySelector('meta[name="mercadopago-public-key"]')) == null ? void 0 : _a.content;
        if (!publicKey) {
          console.error("Chave pública Mercado Pago não encontrada");
          return;
        }
        this.mp = new MercadoPago(publicKey);
        this.mp.getIdentifier().then((identifier) => {
          this.deviceId = identifier;
          console.log("✅ Device ID obtido:", this.deviceId);
        }).catch((error) => {
          console.error("❌ Erro ao obter Device ID:", error);
        });
      } catch (error) {
        console.error("Erro ao inicializar SDK Mercado Pago:", error);
      }
    },
    // 🔐 Carregar SDK Mercado Pago via CDN se não estiver disponível
    loadMercadoPagoSDK() {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = () => {
        console.log("✅ SDK Mercado Pago V2 carregado");
        this.initializeMercadoPagoSDK();
      };
      script.onerror = () => {
        console.error("❌ Erro ao carregar SDK Mercado Pago");
      };
      document.head.appendChild(script);
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
      if (this.selectedMethod === "credit_card") {
        this.detectCardBrand(value);
      } else if (this.selectedMethod === "debit_card") {
        this.cardData.paymentMethodId = void 0;
        console.log("Débito selecionado - payment_method_id não será enviado");
      }
    },
    detectCardBrand(cardNumber) {
      const cleanNumber = cardNumber.replace(/\D/g, "");
      if (!cleanNumber) {
        this.cardData.paymentMethodId = "credit_card";
        return;
      }
      if (/^4/.test(cleanNumber)) {
        this.cardData.paymentMethodId = "visa";
      } else if (/^5[1-5]/.test(cleanNumber)) {
        this.cardData.paymentMethodId = "master";
      } else if (/^3[47]/.test(cleanNumber)) {
        this.cardData.paymentMethodId = "amex";
      } else if (/^636[3-9]/.test(cleanNumber)) {
        this.cardData.paymentMethodId = "elo";
      } else if (/^3[689]/.test(cleanNumber)) {
        this.cardData.paymentMethodId = "diners";
      } else if (/^6(?:011|5)/.test(cleanNumber)) {
        this.cardData.paymentMethodId = "discover";
      } else {
        this.cardData.paymentMethodId = "credit_card";
      }
      console.log("Card brand detected:", this.cardData.paymentMethodId);
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
      var _a, _b, _c;
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
          const tokenData = await this.generateCardToken();
          if (!tokenData) {
            this.errorMessage = "Erro ao gerar token do cartão. Verifique os dados e tente novamente.";
            return;
          }
          paymentData.card_token = tokenData.id;
          paymentData.installments = this.cardData.installments || 1;
          if (tokenData.issuer_id) {
            paymentData.issuer_id = tokenData.issuer_id;
          }
          if (this.deviceId) {
            paymentData.device_id = this.deviceId;
          }
          if (this.selectedMethod === "credit_card") {
            paymentData.payment_method_id = this.cardData.paymentMethodId;
          }
          console.log("Card payment data:", {
            card_token: tokenData.id,
            issuer_id: tokenData.issuer_id,
            installments: paymentData.installments,
            payment_method_id: paymentData.payment_method_id,
            device_id: paymentData.device_id,
            selected_method: this.selectedMethod,
            note: this.selectedMethod === "debit_card" ? "Débito - payment_method_id não enviado" : "Crédito - payment_method_id enviado"
          });
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
          console.log("✅ Pagamento processado com sucesso!");
          console.log("Método selecionado:", this.selectedMethod);
          console.log("Método retornado:", response.data.payment_method);
          console.log("Resposta completa:", JSON.stringify(response.data, null, 2));
          if (response.data.payment_method === "pix" || this.selectedMethod === "pix") {
            console.log("🔵 PIX selecionado - processando QR Code");
            console.log("qr_code presente?", !!response.data.qr_code);
            console.log("qr_code valor:", response.data.qr_code ? response.data.qr_code.substring(0, 50) + "..." : "VAZIO");
            if (response.data.qr_code) {
              console.log("✅ QR Code encontrado!");
              console.log("QR Code URL:", response.data.qr_code_url || "null (será gerado dinamicamente)");
              this.pixData = response.data.qr_code;
              this.pixQrCode = response.data.qr_code_url;
              this.pixExpiration = new Date(Date.now() + 30 * 60 * 1e3);
              this.isWaitingPayment = true;
              console.log("✅ Estado PIX atualizado:", {
                pixDataPresente: !!this.pixData,
                pixQrCodeUrl: this.pixQrCode,
                isWaitingPayment: this.isWaitingPayment
              });
              console.log("⏳ Aguardando webhook do Mercado Pago para confirmação...");
              this.waitForWebhookConfirmation(response.data.booking_id);
            } else {
              console.error("❌ PIX selecionado mas qr_code não retornou!");
              console.log("Resposta completa:", response.data);
              this.errorMessage = "Falha ao gerar QR Code PIX. Tente novamente.";
            }
          } else if (response.data.payment_method === "boleto" || this.selectedMethod === "boleto") {
            console.log("📋 Boleto selecionado - abrindo URL");
            if (response.data.barcode_url) {
              console.log("URL do boleto:", response.data.barcode_url);
              window.open(response.data.barcode_url, "_blank");
              console.log("⏳ Aguardando webhook do Mercado Pago para confirmação...");
              this.waitForWebhookConfirmation(response.data.booking_id);
            } else {
              console.warn("Boleto selecionado mas barcode_url não retornou");
              this.errorMessage = "Falha ao gerar Boleto. Tente novamente.";
            }
          } else if (response.data.payment_method === "wallet" || this.selectedMethod === "mercadopago_wallet") {
            console.log("💳 Carteira Mercado Pago selecionada");
            console.log("⏳ Aguardando webhook do Mercado Pago para confirmação...");
            this.waitForWebhookConfirmation(response.data.booking_id);
          } else if (response.data.payment_method === "credit_card" || response.data.payment_method === "debit_card") {
            console.log("✅ Cartão processado com sucesso");
            if (this.isRetry) {
              this.$emit("payment-success", {
                payment_method: response.data.payment_method,
                booking_id: response.data.booking_id,
                transaction_id: response.data.transaction_id
              });
              return;
            }
            this.paymentConfirmed = true;
            this.successMessage = "Pagamento realizado com sucesso!";
            setTimeout(() => {
              window.location.href = "/mybookings";
            }, 2e3);
          } else {
            console.log("Método de pagamento:", response.data.payment_method);
            this.successMessage = response.data.message || "Pagamento processado com sucesso!";
            setTimeout(() => {
              window.location.href = "/mybookings";
            }, 2e3);
          }
        } else {
          console.error("❌ Erro na resposta:", response.data);
          const errorMessage = response.data.message || "Erro ao processar pagamento";
          if (this.isRetry) {
            this.$emit("payment-error", {
              message: errorMessage,
              details: response.data
            });
            return;
          }
          this.errorMessage = errorMessage;
        }
      } catch (error) {
        console.error("❌ Payment error:", error);
        console.error("Resposta de erro:", error.response);
        const errorMessage = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Erro ao processar pagamento. Tente novamente.";
        if (this.isRetry) {
          this.$emit("payment-error", {
            message: errorMessage,
            details: (_c = error.response) == null ? void 0 : _c.data
          });
          return;
        }
        this.errorMessage = errorMessage;
      }
    },
    waitForWebhookConfirmation(bookingId) {
      console.log("🔄 Aguardando confirmação do webhook para booking:", bookingId);
      let attempts = 0;
      const maxAttempts = 300;
      const checkInterval = setInterval(async () => {
        var _a;
        attempts++;
        try {
          const response = await axios.get(`/mybookings/api/get_mybookings`);
          console.log("📊 Resposta da API:", response.data);
          let bookings = [];
          if (response.data.bookings) {
            bookings = Array.isArray(response.data.bookings.data) ? response.data.bookings.data : [];
          } else if (Array.isArray(response.data)) {
            bookings = response.data;
          }
          console.log("📋 Bookings encontrados:", bookings.length);
          const booking = bookings.find((b) => b.id === bookingId);
          if (booking) {
            console.log("🔍 Booking encontrado:", booking);
            console.log("💰 is_paid:", booking.is_paid, "Tipo:", typeof booking.is_paid);
          }
          if (booking && (booking.is_paid === 1 || booking.is_paid === "1" || booking.is_paid === true)) {
            console.log("✅ Pagamento confirmado via webhook!");
            clearInterval(checkInterval);
            this.paymentConfirmed = true;
            this.isWaitingPayment = false;
            this.pixData = "";
            this.pixQrCode = "";
            this.showSuccessToast("Pagamento recebido e confirmado com sucesso!");
            this.successMessage = "Pagamento realizado com sucesso! Redirecionando...";
            setTimeout(() => {
              window.location.href = "/mybookings";
            }, 2e3);
          } else if (attempts >= maxAttempts) {
            console.warn("⏱️ Parando verificação de webhook após 5 minutos");
            clearInterval(checkInterval);
          }
        } catch (error) {
          console.error("❌ Erro ao verificar confirmação:", error);
          console.error("Detalhes do erro:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
          if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
          }
        }
      }, 1e3);
    },
    // 🎉 NOVO: Mostrar toast de sucesso
    showSuccessToast(message) {
      if (typeof bootstrap !== "undefined" && bootstrap.Toast) {
        const toastHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
                        <div class="toast-header bg-success text-white">
                            <i class="fas fa-check-circle me-2"></i>
                            <strong class="me-auto">Sucesso</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body bg-light">
                            ${message}
                        </div>
                    </div>
                `;
        const toastContainer = document.createElement("div");
        toastContainer.innerHTML = toastHTML;
        document.body.appendChild(toastContainer);
        setTimeout(() => {
          toastContainer.remove();
        }, 5e3);
      } else {
        console.log("✅ " + message);
      }
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
          console.log("Issuer ID:", token.issuer_id);
          return {
            id: token.id,
            issuer_id: token.issuer_id
          };
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
    },
    // 👤 Carregar dados do usuário
    loadUserData() {
      try {
        if (window.currentUser && typeof window.currentUser === "object" && window.currentUser.id) {
          console.log("✅ Dados do usuário já disponíveis via Blade");
          localStorage.setItem("currentUser", JSON.stringify(window.currentUser));
          return;
        }
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.id) {
              window.currentUser = parsedUser;
              console.log("✅ Dados do usuário carregados do localStorage");
              return;
            }
          } catch (e) {
            console.warn("⚠️ Dados corrompidos no localStorage, removendo...");
            localStorage.removeItem("currentUser");
          }
        }
        console.log("🔄 Carregando dados do usuário da API...");
        axios.get("/api/user").then((response) => {
          console.log("📡 Resposta da API /api/user:", response.data);
          if (response.data && response.data.status && response.data.data) {
            window.currentUser = response.data.data;
            localStorage.setItem("currentUser", JSON.stringify(window.currentUser));
            console.log("✅ Dados do usuário carregados da API");
            this.$forceUpdate();
          } else {
            console.warn("⚠️ Resposta da API não contém dados válidos");
          }
        }).catch((error) => {
          console.warn("⚠️ Erro ao carregar dados do usuário da API:", error);
          if (error.response) {
            console.warn("Status:", error.response.status);
            console.warn("Data:", error.response.data);
            if (error.response.status === 401) {
              console.warn("❌ Usuário não autenticado");
              window.currentUser = null;
            }
          }
        });
      } catch (error) {
        console.error("❌ Erro ao processar dados do usuário:", error);
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mercadopago-checkout-container mt-4 p-4 border rounded bg-light" }, [_vm.paymentConfirmed ? _c("div", { staticClass: "text-center py-5" }, [_vm._m(0), _c("h3", { staticClass: "text-success mb-3" }, [_vm._v(" ✅ Pagamento Recebido e Confirmado! ")]), _c("p", { staticClass: "text-muted mb-4" }, [_vm._v(" Seu pagamento foi processado com sucesso. Você será redirecionado para a página de minhas reservas em breve. ")]), _vm._m(1), _vm._m(2)]) : [_c("div", { staticClass: "mb-4" }, [_c("h5", { staticClass: "mb-3" }, [_c("i", { staticClass: "fas fa-credit-card me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.payment_details") || "Detalhes do Pagamento") + " ")]), _c("hr")]), _vm.userDataComplete ? _c("div", { staticClass: "alert alert-success alert-dismissible fade show mb-4", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-check-circle me-2" }), _c("strong", [_vm._v("Perfeito!")]), _vm._v(" Todos os seus dados estão preenchidos corretamente no perfil. "), _vm._m(3), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "data-bs-dismiss": "alert", "aria-label": "Close" } })]) : _vm.window.currentUser ? _c("div", { staticClass: "alert alert-warning alert-dismissible fade show mb-4", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-exclamation-triangle me-2" }), _c("strong", [_vm._v("Atenção!")]), _vm._v(" Para garantir a aprovação do seu pagamento, é importante que seus dados estejam completos. "), _c("div", { staticClass: "mt-2 small" }, [!_vm.userCPF ? _c("div", { staticClass: "mb-1" }, [_c("i", { staticClass: "fas fa-times-circle text-danger me-1" }), _vm._v(" CPF/CNPJ não preenchido ")]) : _vm._e(), !_vm.userPhone ? _c("div", { staticClass: "mb-1" }, [_c("i", { staticClass: "fas fa-times-circle text-danger me-1" }), _vm._v(" Telefone não preenchido ")]) : _vm._e(), !_vm.userAddressComplete ? _c("div", { staticClass: "mb-1" }, [_c("i", { staticClass: "fas fa-times-circle text-danger me-1" }), _vm._v(" Endereço incompleto ")]) : _vm._e()]), _vm._m(4), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "data-bs-dismiss": "alert", "aria-label": "Close" } })]) : _vm._e(), _c("div", { staticClass: "row mb-4" }, [_c("div", { staticClass: "col-md-6" }, [_c("div", { staticClass: "card" }, [_c("div", { staticClass: "card-body" }, [_c("h6", { staticClass: "card-title mb-3" }, [_vm._v(_vm._s(_vm.trans("em.order_summary") || "Resumo do Pedido"))]), _c("div", { staticClass: "d-flex justify-content-between mb-2" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.subtotal") || "Subtotal") + ":")]), _c("strong", [_vm._v(_vm._s(_vm.subtotal) + " " + _vm._s(_vm.currency))])]), _c("div", { staticClass: "d-flex justify-content-between mb-2" }, [_c("span", [_vm._v(_vm._s(_vm.trans("em.tax") || "Taxa") + ":")]), _c("strong", [_vm._v(_vm._s(_vm.tax) + " " + _vm._s(_vm.currency))])]), _c("hr"), _c("div", { staticClass: "d-flex justify-content-between" }, [_c("span", { staticClass: "h6" }, [_vm._v(_vm._s(_vm.trans("em.total") || "Total") + ":")]), _c("strong", { staticClass: "h6" }, [_vm._v(_vm._s(_vm.total) + " " + _vm._s(_vm.currency))])])])])]), _c("div", { staticClass: "col-md-6" }, [_c("div", { staticClass: "card" }, [_c("div", { staticClass: "card-body" }, [_c("h6", { staticClass: "card-title mb-3" }, [_vm._v(_vm._s(_vm.trans("em.payment_method") || "Método de Pagamento"))]), _vm.loadedMethods.credit_card ? _c("div", { staticClass: "form-check mb-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedMethod, expression: "selectedMethod" }], staticClass: "form-check-input", attrs: { "type": "radio", "id": "method_credit_card", "value": "credit_card" }, domProps: { "checked": _vm._q(_vm.selectedMethod, "credit_card") }, on: { "change": function($event) {
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
  }), 0)]) : _vm._e()])])])]) : _vm._e(), _vm.isWaitingPayment && ["credit_card", "debit_card"].includes(_vm.selectedMethod) ? _c("div", { staticClass: "row mb-4" }, [_c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "card border-info" }, [_c("div", { staticClass: "card-body text-center" }, [_c("h6", { staticClass: "card-title mb-4" }, [_c("i", { staticClass: "fas fa-credit-card me-2 text-info" }), _vm._v(" " + _vm._s(_vm.selectedMethod === "credit_card" ? _vm.trans("em.credit_card") || "Cartão de Crédito" : _vm.trans("em.debit_card") || "Cartão de Débito") + " ")]), _vm._m(5), _c("div", { staticClass: "alert alert-info" }, [_c("i", { staticClass: "fas fa-hourglass-half me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.processing_payment") || "Processando seu pagamento...") + " ")]), _c("p", { staticClass: "text-muted mb-3" }, [_vm._v(" " + _vm._s(_vm.trans("em.payment_processing_info") || "Seu pagamento está sendo processado. Isso pode levar alguns segundos.") + " ")]), _c("div", { staticClass: "alert alert-warning" }, [_c("i", { staticClass: "fas fa-info-circle me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.waiting_payment_confirmation") || "Aguardando confirmação do pagamento...") + " ")])])])])]) : _vm._e(), _vm.isWaitingPayment && _vm.selectedMethod === "pix" ? _c("div", { staticClass: "row mb-4" }, [_c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "card border-success" }, [_c("div", { staticClass: "card-body text-center" }, [_c("h6", { staticClass: "card-title mb-4" }, [_c("i", { staticClass: "fas fa-mobile-alt me-2 text-success" }), _vm._v(" " + _vm._s(_vm.trans("em.waiting_pix_payment") || "Aguardando Pagamento PIX") + " ")]), _vm.pixQrCode ? _c("div", { staticClass: "mb-4" }, [_c("img", { staticClass: "img-fluid", staticStyle: { "max-width": "300px" }, attrs: { "src": _vm.pixQrCode, "alt": "PIX QR Code" } })]) : _vm._e(), _vm.pixData ? _c("div", { staticClass: "mb-4" }, [_c("p", { staticClass: "text-muted mb-2" }, [_vm._v(_vm._s(_vm.trans("em.or_copy_code") || "Ou copie o código:"))]), _c("div", { staticClass: "input-group" }, [_c("input", { staticClass: "form-control", attrs: { "type": "text", "readonly": "", "id": "pixCode" }, domProps: { "value": _vm.pixData } }), _c("button", { staticClass: "btn btn-outline-primary", attrs: { "type": "button" }, on: { "click": _vm.copyToClipboard } }, [_c("i", { staticClass: "fas fa-copy me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.copy") || "Copiar") + " ")])])]) : _vm._e(), _vm.pixExpiration ? _c("div", { staticClass: "alert alert-info" }, [_c("i", { staticClass: "fas fa-clock me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.pix_expires_in") || "PIX expira em") + ": "), _c("strong", { key: _vm.timerTrigger }, [_vm._v(_vm._s(_vm.formatTimeRemaining(_vm.pixExpiration)))])]) : _vm._e(), _c("div", { staticClass: "alert alert-warning" }, [_c("i", { staticClass: "fas fa-hourglass-half me-2" }), _vm._v(" " + _vm._s(_vm.trans("em.waiting_payment_confirmation") || "Aguardando confirmação do pagamento...") + " ")])])])])]) : _vm._e(), _vm.errorMessage ? _c("div", { staticClass: "alert alert-danger alert-dismissible fade show", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-exclamation-circle me-2" }), _vm._v(" " + _vm._s(_vm.errorMessage) + " "), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "aria-label": "Close" }, on: { "click": function($event) {
    _vm.errorMessage = "";
  } } })]) : _vm._e(), _vm.successMessage ? _c("div", { staticClass: "alert alert-success alert-dismissible fade show", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-check-circle me-2" }), _vm._v(" " + _vm._s(_vm.successMessage) + " "), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "aria-label": "Close" }, on: { "click": function($event) {
    _vm.successMessage = "";
  } } })]) : _vm._e(), _c("div", { staticClass: "mt-4 text-center" }, [_c("small", { staticClass: "text-muted" }, [_c("i", { staticClass: "fas fa-shield-alt me-1" }), _vm._v(" " + _vm._s(_vm.trans("em.secure_payment") || "Pagamento seguro com Mercado Pago") + " ")])])]], 2);
};
var _sfc_staticRenderFns = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mb-4" }, [_c("i", { staticClass: "fas fa-check-circle text-success", staticStyle: { "font-size": "4rem" } })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "alert alert-success", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-info-circle me-2" }), _c("strong", [_vm._v("Redirecionando...")]), _vm._v(" Aguarde alguns segundos. ")]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "spinner-border text-success mt-3", attrs: { "role": "status" } }, [_c("span", { staticClass: "visually-hidden" }, [_vm._v("Carregando...")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-2 small" }, [_c("div", { staticClass: "mb-1" }, [_c("i", { staticClass: "fas fa-check-circle text-success me-1" }), _vm._v(" CPF/CNPJ preenchido ")]), _c("div", { staticClass: "mb-1" }, [_c("i", { staticClass: "fas fa-check-circle text-success me-1" }), _vm._v(" Telefone preenchido ")]), _c("div", { staticClass: "mb-1" }, [_c("i", { staticClass: "fas fa-check-circle text-success me-1" }), _vm._v(" Endereço completo ")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3" }, [_c("a", { staticClass: "btn btn-sm btn-warning", attrs: { "href": "/profile", "target": "_blank" } }, [_c("i", { staticClass: "fas fa-edit me-1" }), _vm._v(" Atualizar Perfil ")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mb-4" }, [_c("div", { staticClass: "spinner-border text-info", attrs: { "role": "status" } }, [_c("span", { staticClass: "visually-hidden" }, [_vm._v("Processando...")])])]);
}];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "11dbafe9"
);
const MercadoPagoCheckout = __component__.exports;
export {
  MercadoPagoCheckout as default
};
//# sourceMappingURL=MercadoPagoCheckout-nDEZk1xj.js.map
