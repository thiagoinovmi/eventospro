<template>
    <div>
        <div class="tab-pane">
            <div class="panel-group">
                <div class="panel panel-default lgx-panel">
                    <div class="panel-heading px-5">
                        <form id="form" class="form-horizontal" ref="form" :action="submitUrl()"
                            @submit.prevent="validateForm" method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="_token" id="csrf-token" :value="csrf_token" />
                            
                            <div class="col-md-12 mb-5 text-center">
                                <img id="preview-image-before-upload" :src="avatarUrl"
                                    alt="profile-pic" style="max-height: 128px;border-radius: 50%;">
                            </div>

                            <div class="form-group row mt-3 mt-5">
                                <label class="form-label col-md-3 form-label">{{ this.is_organiser == true ? trans('em.organisation_logo') : trans('em.avatar') }}</label>
                                <div class="col-md-9">
                                    <input @change="imagePreview" class="form-control" id="avatar" name="avatar" type="file"  >
                                    
                                    <span v-show="errors.has('avatar')" class="help text-danger">{{ errors.first("avatar")}}</span>
                                </div>
                            </div>
           

                            <div class="form-group row mt-3 mt-3">
                                <label class="col-md-3 form-label">{{
                                trans("em.name")
                                }}</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="name" type="text" v-model="name"
                                        v-validate="'required'" />
                                    <span v-show="errors.has('name')" class="help text-danger">{{ errors.first("name")
                                    }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">{{ trans("em.email") }}*</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="email" type="email" v-model="email"
                                        v-validate="'required'" />
                                    <span v-show="errors.has('email')" class="help text-danger">{{ errors.first("email")
                                    }}</span>
                                </div>
                            </div>

                            <!-- 🏠 ENDEREÇO COMPLETO - SEPARADO EM CAMPOS -->
                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">CEP</label>
                                <div class="col-md-6">
                                    <input class="form-control" name="address_zip_code" type="text" 
                                        v-model="address_zip_code" placeholder="00000-000" 
                                        @blur="searchCEP" maxlength="9" />
                                    <span v-show="errors.has('address_zip_code')" class="help text-danger">{{
                                    errors.first("address_zip_code") }}</span>
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-sm btn-info" @click="searchCEP" :disabled="!address_zip_code">
                                        <i class="fas fa-search"></i> Buscar
                                    </button>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Logradouro</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="address_street" type="text" 
                                        v-model="address_street" placeholder="Rua, Avenida, etc" />
                                    <span v-show="errors.has('address_street')" class="help text-danger">{{
                                    errors.first("address_street") }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Número</label>
                                <div class="col-md-3">
                                    <input class="form-control" name="address_number" type="text" 
                                        v-model="address_number" placeholder="123" />
                                    <span v-show="errors.has('address_number')" class="help text-danger">{{
                                    errors.first("address_number") }}</span>
                                </div>
                                <label class="col-md-3 form-label">Complemento</label>
                                <div class="col-md-3">
                                    <input class="form-control" name="address_complement" type="text" 
                                        v-model="address_complement" placeholder="Apto, Sala, etc" />
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Bairro</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="address_neighborhood" type="text" 
                                        v-model="address_neighborhood" placeholder="Bairro" />
                                    <span v-show="errors.has('address_neighborhood')" class="help text-danger">{{
                                    errors.first("address_neighborhood") }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Cidade</label>
                                <div class="col-md-6">
                                    <input class="form-control" name="address_city" type="text" 
                                        v-model="address_city" placeholder="Cidade" />
                                    <span v-show="errors.has('address_city')" class="help text-danger">{{
                                    errors.first("address_city") }}</span>
                                </div>
                                <label class="col-md-2 form-label">Estado</label>
                                <div class="col-md-1">
                                    <input class="form-control" name="address_state" type="text" 
                                        v-model="address_state" placeholder="SP" maxlength="2" />
                                    <span v-show="errors.has('address_state')" class="help text-danger">{{
                                    errors.first("address_state") }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">{{
                                trans("em.phone")
                                }}</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="phone" type="text" v-model="phone" />
                                    <span v-show="errors.has('phone')" class="help text-danger">{{ errors.first("phone")
                                    }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Tipo de Documento</label>
                                <div class="col-md-9">
                                    <select class="form-control" name="document_type" v-model="document_type" v-validate="''" data-vv-as="Tipo de Documento">
                                        <option value="">Selecione</option>
                                        <option value="cpf">CPF</option>
                                        <option value="cnpj">CNPJ</option>
                                    </select>
                                    <span v-show="errors.has('document_type')" class="help text-danger">{{ errors.first("document_type")
                                    }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">CPF/CNPJ</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="document" type="text" v-model="document" placeholder="Digite seu CPF ou CNPJ" v-validate="''" data-vv-as="CPF/CNPJ" />
                                    <span v-show="errors.has('document')" class="help text-danger">{{ errors.first("document")
                                    }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Tipo de Chave PIX</label>
                                <div class="col-md-9">
                                    <select class="form-control" name="pix_type" v-model="pix_type" v-validate="''" data-vv-as="Tipo de Chave PIX">
                                        <option value="" disabled>Selecione o tipo de chave</option>
                                        <option value="email">Email</option>
                                        <option value="cpf">CPF</option>
                                        <option value="cnpj">CNPJ</option>
                                        <option value="phone">Telefone</option>
                                        <option value="random">Aleatória</option>
                                    </select>
                                    <span v-show="errors.has('pix_type')" class="help text-danger">{{ errors.first("pix_type")
                                    }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">Chave PIX</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="pix_key" type="text" v-model="pix_key" placeholder="Digite sua chave PIX" v-validate="''" data-vv-as="Chave PIX" />
                                    <span v-show="errors.has('pix_key')" class="help text-danger">{{ errors.first("pix_key")
                                    }}</span>
                                </div>
                            </div>

                            <div class="form-group row mt-3">
                                <div class="col-md-9 offset-md-3">
                                    <button class="btn btn-primary" type="submit">
                                        <i class="fas fa-sd-card"></i>
                                        {{ trans("em.save") }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixinsFilters from "../../mixins.js";
export default {
    props: ["user", "csrf_token"],
    mixins: [mixinsFilters],
    data() {
        return {
            name: null,
            username: null,
            email: null,
            // 🏠 Endereço separado em campos
            address_zip_code: null,
            address_street: null,
            address_number: null,
            address_complement: null,
            address_neighborhood: null,
            address_city: null,
            address_state: null,
            // Telefone e Documento
            phone: null,
            document_type: null,
            document: null,
            // PIX
            pix_type: null,
            pix_key: null,
            // Avatar
            avatar : null,
            is_organiser : is_organiser,
            avatarUrl : null,
            // Estado de busca de CEP
            cepLoading: false,
            cepError: null,
        };
    },

    methods: {
        // ...mapMutations(["add"]),

        editProfile() {
            this.name = this.user.name;
            this.username = this.user.username;
            this.email = this.user.email;
            // 🏠 Carregar endereço separado
            this.address_zip_code = this.user.address_zip_code;
            this.address_street = this.user.address_street;
            this.address_number = this.user.address_number;
            this.address_complement = this.user.address_complement;
            this.address_neighborhood = this.user.address_neighborhood;
            this.address_city = this.user.address_city;
            this.address_state = this.user.address_state;
            // Telefone e Documento
            this.phone = this.user.phone;
            this.document_type = this.user.document_type;
            this.document = this.user.document;
            // PIX
            this.pix_type = this.user.pix_type;
            this.pix_key = this.user.pix_key;
        },

        // 🔍 Buscar CEP usando ViaCEP API
        async searchCEP() {
            if (!this.address_zip_code) {
                this.cepError = 'Digite um CEP';
                return;
            }

            // Remover caracteres especiais
            const cepClean = this.address_zip_code.replace(/\D/g, '');

            if (cepClean.length !== 8) {
                this.cepError = 'CEP deve ter 8 dígitos';
                return;
            }

            this.cepLoading = true;
            this.cepError = null;

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
                const data = await response.json();

                if (data.erro) {
                    this.cepError = 'CEP não encontrado';
                    this.cepLoading = false;
                    return;
                }

                // Preencher campos automaticamente
                this.address_street = data.logradouro;
                this.address_neighborhood = data.bairro;
                this.address_city = data.localidade;
                this.address_state = data.uf;
                this.cepError = null;

                console.log('✅ CEP preenchido com sucesso:', data);
            } catch (error) {
                console.error('❌ Erro ao buscar CEP:', error);
                this.cepError = 'Erro ao buscar CEP. Tente novamente.';
            } finally {
                this.cepLoading = false;
            }
        },

        // validate data on form submit
        validateForm(event) {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.formSubmit(event);
                }
            });
        },

        // show server validation errors
        serverValidate(serrors) {
            this.$validator.validateAll().then(result => {
                this.$validator.errors.add(serrors);
            });
        },

        // submit form
        async formSubmit(event) {
           
            this.$refs.form.submit();
        },

        submitUrl() {
            return route("eventmie.updateAuthUser");
        },

        imagePreview(e) {

            const file = e.target.files[0];
            let url = URL.createObjectURL(file);

            $('#preview-image-before-upload').attr('src', url); 
           
        },

        storageDisk(){
            this.avatarUrl = this.getImageUrl(this.user.avatar);
            
        }

    },
    mounted() {
        this.editProfile();
        this.storageDisk();
    }
};
</script>
