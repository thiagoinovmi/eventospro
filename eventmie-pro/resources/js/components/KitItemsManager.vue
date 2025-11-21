<template>
    <div class="kit-items-manager">
        <!-- Botão para listar itens existentes -->
        <div class="mb-3">
            <a href="/admin/kit-items" class="btn btn-info btn-sm" target="_blank">
                <i class="voyager-list"></i> Listar Itens
            </a>
        </div>

        <!-- Formulário para adicionar novo item -->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">Adicionar Item ao Kit</h4>
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
                </div>

                <button 
                    @click="addItem" 
                    type="button" 
                    class="btn btn-success btn-sm"
                    :disabled="!newItem.name"
                >
                    <i class="voyager-plus"></i> Adicionar Item
                </button>
            </div>
        </div>

        <!-- Lista de itens adicionados -->
        <div v-if="items.length > 0" class="panel panel-default mt-3">
            <div class="panel-heading">
                <h4 class="panel-title">Itens Adicionados ({{ items.length }})</h4>
            </div>
            <div class="panel-body">
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
        </div>

        <!-- Mensagem quando não há itens -->
        <div v-else class="alert alert-info mt-3">
            <i class="voyager-info"></i> Nenhum item adicionado ainda
        </div>
    </div>
</template>

<script>
export default {
    name: 'KitItemsManager',
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
            window.scrollTo(0, 0);
        },
        removeItem(index) {
            if (confirm('Tem certeza que deseja remover este item?')) {
                this.items.splice(index, 1);
            }
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
.kit-items-manager {
    margin: 20px 0;
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
}
</style>
