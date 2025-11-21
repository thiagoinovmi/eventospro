<template>
    <div class="kit-manager">
        <!-- Abas de navegação -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
                <a href="#kit-info" aria-controls="kit-info" role="tab" data-toggle="tab">
                    <i class="voyager-settings"></i> Informações do Kit
                </a>
            </li>
            <li role="presentation">
                <a href="#kit-items" aria-controls="kit-items" role="tab" data-toggle="tab">
                    <i class="voyager-list"></i> Itens do Kit ({{ items.length }})
                </a>
            </li>
        </ul>

        <!-- Conteúdo das abas -->
        <div class="tab-content">
            <!-- Aba 1: Informações do Kit -->
            <div role="tabpanel" class="tab-pane active" id="kit-info">
                <div class="panel-body">
                    <p class="text-muted">
                        <i class="voyager-info"></i> 
                        Preencha as informações básicas do kit aqui. Os itens do kit podem ser gerenciados na aba "Itens do Kit".
                    </p>
                </div>
            </div>

            <!-- Aba 2: Gerenciar Itens -->
            <div role="tabpanel" class="tab-pane" id="kit-items">
                <div class="panel-body">
                    <!-- Formulário para adicionar item -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <i class="voyager-plus"></i> 
                                {{ editingIndex !== null ? 'Editar Item' : 'Adicionar Novo Item' }}
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Nome do Item *</label>
                                        <input 
                                            v-model="newItem.name" 
                                            type="text" 
                                            class="form-control"
                                            placeholder="Ex: Camiseta"
                                        >
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Ordem</label>
                                        <input 
                                            v-model.number="newItem.order" 
                                            type="number" 
                                            class="form-control"
                                            placeholder="0"
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Descrição</label>
                                <textarea 
                                    v-model="newItem.description" 
                                    class="form-control"
                                    rows="3"
                                    placeholder="Descrição do item"
                                ></textarea>
                            </div>

                            <div class="form-group">
                                <label>Imagem</label>
                                <input 
                                    @change="handleImageUpload" 
                                    type="file" 
                                    class="form-control"
                                    accept="image/*"
                                >
                                <small class="form-text text-muted">Formatos: JPG, PNG, GIF (máx 5MB)</small>
                                <div v-if="newItem.image" class="mt-2">
                                    <img :src="newItem.image" class="img-thumbnail" style="max-width: 150px">
                                </div>
                            </div>

                            <div class="form-group">
                                <button 
                                    @click="addItem" 
                                    type="button" 
                                    class="btn btn-success btn-sm"
                                    :disabled="!newItem.name"
                                >
                                    <i class="voyager-plus"></i> 
                                    {{ editingIndex !== null ? 'Atualizar Item' : 'Adicionar Item' }}
                                </button>
                                <button 
                                    v-if="editingIndex !== null"
                                    @click="cancelEdit" 
                                    type="button" 
                                    class="btn btn-default btn-sm"
                                >
                                    <i class="voyager-x"></i> Cancelar
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Lista de itens -->
                    <div v-if="items.length > 0" class="panel panel-default mt-3">
                        <div class="panel-heading">
                            <h4 class="panel-title">Itens Adicionados ({{ items.length }})</h4>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th class="col-md-3 col-sm-4">Nome</th>
                                        <th class="col-md-2 col-sm-3">Ordem</th>
                                        <th class="col-md-2 col-sm-3">Imagem</th>
                                        <th class="col-md-3 col-sm-2">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in items" :key="index">
                                        <td class="col-md-3 col-sm-4">
                                            <strong>{{ item.name }}</strong>
                                            <p v-if="item.description" class="text-muted small">{{ item.description }}</p>
                                        </td>
                                        <td class="col-md-2 col-sm-3">{{ item.order }}</td>
                                        <td class="col-md-2 col-sm-3">
                                            <img v-if="item.image" :src="item.image" class="img-thumbnail" style="max-width: 60px">
                                            <span v-else class="text-muted">Sem imagem</span>
                                        </td>
                                        <td class="col-md-3 col-sm-2">
                                            <button 
                                                @click="editItem(index)" 
                                                class="btn btn-warning btn-xs"
                                                title="Editar"
                                            >
                                                <i class="voyager-edit"></i>
                                            </button>
                                            <button 
                                                @click="removeItem(index)" 
                                                class="btn btn-danger btn-xs"
                                                title="Remover"
                                            >
                                                <i class="voyager-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Mensagem quando não há itens -->
                    <div v-else class="alert alert-info mt-3">
                        <i class="voyager-info"></i> Nenhum item adicionado ainda
                    </div>

                    <!-- Botão para listar itens no admin -->
                    <div class="mt-3">
                        <a href="/admin/kit-items" class="btn btn-info btn-sm" target="_blank">
                            <i class="voyager-list"></i> Ver Todos os Itens no Admin
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KitManager',
    data() {
        return {
            items: [],
            newItem: {
                name: '',
                description: '',
                image: null,
                order: 0
            },
            editingIndex: null
        }
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newItem.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        addItem() {
            if (!this.newItem.name.trim()) {
                alert('Nome do item é obrigatório');
                return;
            }

            if (this.editingIndex !== null) {
                // Editar item existente
                this.$set(this.items, this.editingIndex, { ...this.newItem });
                this.editingIndex = null;
            } else {
                // Adicionar novo item
                this.items.push({ ...this.newItem });
            }

            // Limpar formulário
            this.resetForm();
        },
        editItem(index) {
            this.newItem = { ...this.items[index] };
            this.editingIndex = index;
            // Scroll para o formulário
            document.querySelector('#kit-items').scrollIntoView({ behavior: 'smooth' });
        },
        removeItem(index) {
            if (confirm('Tem certeza que deseja remover este item?')) {
                this.items.splice(index, 1);
            }
        },
        cancelEdit() {
            this.editingIndex = null;
            this.resetForm();
        },
        resetForm() {
            this.newItem = {
                name: '',
                description: '',
                image: null,
                order: 0
            };
        },
        getItems() {
            return this.items;
        }
    }
}
</script>

<style scoped>
.kit-manager {
    margin: 20px 0;
}

.nav-tabs {
    border-bottom: 2px solid #ddd;
    margin-bottom: 15px;
}

.nav-tabs > li > a {
    border: none;
    border-bottom: 3px solid transparent;
    color: #666;
    transition: all 0.3s;
}

.nav-tabs > li > a:hover {
    border-bottom-color: #3498db;
    color: #3498db;
}

.nav-tabs > li.active > a {
    border-bottom-color: #3498db;
    color: #3498db;
    background: none;
}

.tab-content {
    border: 1px solid #ddd;
    border-top: none;
    padding: 15px;
}

.panel {
    margin-bottom: 15px;
}

.table-responsive {
    overflow-x: auto;
}

.btn-xs {
    padding: 3px 6px;
    font-size: 12px;
    margin-right: 3px;
}

.img-thumbnail {
    padding: 2px;
}

@media (max-width: 768px) {
    .table {
        font-size: 12px;
    }
    
    .btn-xs {
        padding: 2px 4px;
        font-size: 10px;
    }

    .nav-tabs > li > a {
        padding: 8px 10px;
        font-size: 12px;
    }
}
</style>
