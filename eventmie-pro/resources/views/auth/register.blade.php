@extends('eventmie::auth.authapp')

@section('title')
    @lang('eventmie-pro::em.register')
@endsection

@section('authcontent')

    <div class="card border-0 shadow">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>
                            <span class="" role="alert">
                                <strong>{{ $error }}</strong>
                            </span>
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="card-body p-5">


            <h3 class="mb-4">@lang('eventmie-pro::em.register')</h3>
            <!-- form -->
            <form method="POST" action="{{ route('eventmie.register') }}">
                @csrf
                @honeypot
                <div class="mb-3">
                    <label for="email" class="form-label">@lang('eventmie-pro::em.name')</label>
                    <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}"
                        name="name" value="{{ old('name') }}" required autofocus placeholder="@lang('eventmie-pro::em.name')">
                </div>

                {{-- CPF/CNPJ Tipo --}}
                <div class="mb-3">
                    <label for="document_type" class="form-label">Tipo de Documento</label>
                    <select id="document_type" name="document_type" class="form-control{{ $errors->has('document_type') ? ' is-invalid' : '' }}" required>
                        <option value="">Selecione</option>
                        <option value="cpf" {{ old('document_type') === 'cpf' ? 'selected' : '' }}>CPF</option>
                        <option value="cnpj" {{ old('document_type') === 'cnpj' ? 'selected' : '' }}>CNPJ</option>
                    </select>
                </div>

                {{-- CPF/CNPJ Número --}}
                <div class="mb-3">
                    <label for="document" class="form-label">CPF/CNPJ</label>
                    <input id="document" type="text" class="form-control{{ $errors->has('document') ? ' is-invalid' : '' }}" name="document" value="{{ old('document') }}" required placeholder="Digite seu CPF ou CNPJ">
                </div>

                <!-- email -->
                <div class="mb-3">
                    <label for="email" class="form-label">@lang('eventmie-pro::em.email_address')</label>
                    <input id="email" type="email"
                        class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email"
                        value="{{ old('email') }}" required placeholder="@lang('eventmie-pro::em.email')">

                </div>
                <!-- password -->
                <div class="mb-3">
                    <label for="password" class="form-label">@lang('eventmie-pro::em.password')</label>
                    <input id="password" type="password"
                        class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required
                        placeholder="@lang('eventmie-pro::em.password')">

                </div>


                {{-- Campos hidden para termos --}}
                <input type="hidden" name="privacy_policy_accepted" id="privacy_policy_accepted" value="0">
                <input type="hidden" name="terms_conditions_accepted" id="terms_conditions_accepted" value="0">
                <input type="hidden" name="privacy_policy_accepted_at" id="privacy_policy_accepted_at" value="">
                <input type="hidden" name="terms_conditions_accepted_at" id="terms_conditions_accepted_at" value="">

                <div class="mb-3">
                    <input class="form-check-input" type="checkbox" name="accept" id="accept" checked value="1"
                        hidden>
                    <button type="button" class="btn btn-info btn-block mb-3" data-terms-button>
                        <i class="fas fa-file-contract"></i>
                        Leia e Aceite a Política de Privacidade e Termos e Condições
                    </button>
                </div>

                <!-- Mensagem de aviso -->
                <div class="alert alert-danger mb-3" id="terms-warning" role="alert">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>Atenção!</strong> Você deve ler e aceitar a Política de Privacidade e Termos e Condições para prosseguir com o cadastro.
                </div>

                <!-- button -->
                <button type="submit" class="btn btn-primary btn-block" disabled><i class="fas fa-door-open"></i>
                    @lang('eventmie-pro::em.confirm_register')</button>

                <div class="d-flex justify-content-between mb-2 pb-2 mt-3 text-sm ">
                    <!-- form check -->
                    <div class="fw-bold">
                        <a href="{{ route('eventmie.password.request') }}" class="text-inherit">@lang('eventmie-pro::em.forgot_password')</a>
                    </div>
                    <!-- forgot password -->
                    <div class="fw-bold">
                        <a href="{{ route('eventmie.login') }}" class="text-inherit"> @lang('eventmie-pro::em.login')</a>
                    </div>
                </div>
                <div class="mt-3">
                    <hr style="border-top: 2px solid #eee;">
                    @if (!empty(config('services')['facebook']['client_id']) || !empty(config('services')['google']['client_id']))
                        <div class="d-flex justify-content-between mb-2 pb-2 mt-3 text-sm">
                            <div class="text-left">
                                <span>@lang('eventmie-pro::em.continue_with')</span>
                            </div>
                            <div class="text-right gap-1 d-flex flex-wrap justify-content-end ">
                                @if (!empty(config('services')['facebook']['client_id']))
                                    <a href="{{ route('eventmie.oauth_login', ['social' => 'facebook']) }}"
                                        class="btn btn-sm btn-primary btn-block"><i class="fab fa-facebook-f"></i>
                                        @lang('eventmie-pro::em.facebook')</a>
                                @endif

                                @if (!empty(config('services')['google']['client_id']))
                                    <a href="{{ route('eventmie.oauth_login', ['social' => 'google']) }}"
                                        class="btn btn-sm btn-primary btn-block"><i class="fab fa-google"></i>
                                        @lang('eventmie-pro::em.google')</a>
                                @endif
                            </div>
                        </div>
                    @endif
                </div>
            </form>



        </div>
    </div>

    <!-- Modal de Termos e Condições -->
    <div class="modal fade" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="termsModalLabel">Política de Privacidade e Termos e Condições</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="termsContent" style="max-height: 500px; overflow-y: auto;">
                    <p>Carregando...</p>
                </div>
                <div class="modal-footer">
                    <div class="form-check mr-auto">
                        <input type="checkbox" class="form-check-input" id="acceptTerms">
                        <label class="form-check-label" for="acceptTerms">
                            Aceito a Política de Privacidade e Termos e Condições
                        </label>
                    </div>
                    <button type="button" class="btn btn-primary" id="confirmTermsBtn" disabled>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('javascript')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Carregar conteúdo do modal
            fetch('/api/pages/2')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('termsContent').innerHTML = data.body || 'Conteúdo não disponível';
                })
                .catch(error => {
                    console.error('Erro ao carregar termos:', error);
                    document.getElementById('termsContent').innerHTML = 'Erro ao carregar conteúdo';
                });

            // Abrir modal ao clicar no botão
            const termsButton = document.querySelector('[data-terms-button]');
            if (termsButton) {
                termsButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (window.$ && window.$('#termsModal').length) {
                        window.$('#termsModal').modal('show');
                    }
                });
            }

            // Gerenciar checkbox de aceitação
            const acceptCheckbox = document.getElementById('acceptTerms');
            const confirmBtn = document.getElementById('confirmTermsBtn');
            
            if (acceptCheckbox && confirmBtn) {
                acceptCheckbox.addEventListener('change', function() {
                    confirmBtn.disabled = !this.checked;
                });

                // Confirmar aceitação
                confirmBtn.addEventListener('click', function() {
                    // Atualizar campos hidden
                    document.getElementById('privacy_policy_accepted').value = '1';
                    document.getElementById('terms_conditions_accepted').value = '1';
                    document.getElementById('privacy_policy_accepted_at').value = new Date().toISOString();
                    document.getElementById('terms_conditions_accepted_at').value = new Date().toISOString();
                    
                    // Habilitar o botão de submit
                    const submitButton = document.querySelector('button[type="submit"]');
                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                    
                    // Esconder mensagem de aviso
                    const warningMessage = document.getElementById('terms-warning');
                    if (warningMessage) {
                        warningMessage.style.display = 'none';
                    }
                    
                    // Fechar modal
                    if (window.$ && window.$('#termsModal').length) {
                        window.$('#termsModal').modal('hide');
                    }
                });
            }

            // Adicionar listeners para atualizar os campos hidden quando o formulário for submetido
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    const privacyAccepted = document.getElementById('privacy_policy_accepted');
                    const termsAccepted = document.getElementById('terms_conditions_accepted');
                    
                    // Verificar se os termos foram aceitos
                    if (privacyAccepted.value !== '1' || termsAccepted.value !== '1') {
                        e.preventDefault();
                        alert('Por favor, leia e aceite a Política de Privacidade e Termos e Condições');
                        return false;
                    }
                });
            }
        });
    </script>
@endsection
