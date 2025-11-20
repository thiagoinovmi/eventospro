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

                            <div class="form-group row mt-3">
                                <label class="col-md-3 form-label">{{
                                trans("em.address")
                                }}</label>
                                <div class="col-md-9">
                                    <input class="form-control" name="address" type="text" v-model="address" />
                                    <span v-show="errors.has('address')" class="help text-danger">{{
                                    errors.first("address") }}</span>
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
            address: null,
            phone: null,
            document_type: null,
            document: null,
            pix_type: null,
            pix_key: null,
            avatar : null,
            is_organiser : is_organiser,
            avatarUrl : null,

        };
    },

    methods: {
        // ...mapMutations(["add"]),

        editProfile() {
            this.name = this.user.name,
            this.username = this.user.username,
            this.email = this.user.email,
            this.address = this.user.address,
            this.phone = this.user.phone,
            this.document_type = this.user.document_type,
            this.document = this.user.document,
            this.pix_type = this.user.pix_type,
            this.pix_key = this.user.pix_key;
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
