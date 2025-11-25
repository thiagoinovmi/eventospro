{{-- Campos de Endereço com Busca de CEP --}}
<div class="form-group col-md-6">
    <label class="control-label">CEP</label>
    <div class="input-group">
        <input type="text" class="form-control" name="address_zip_code" id="address_zip_code" 
            value="{{ $dataTypeContent->address_zip_code ?? '' }}" 
            placeholder="00000-000" maxlength="9"
            @change="searchCEP">
        <span class="input-group-btn">
            <button class="btn btn-info" type="button" @click="searchCEP" :disabled="!addressZipCode">
                <i class="fa fa-search"></i> Buscar
            </button>
        </span>
    </div>
</div>

<div class="form-group col-md-12">
    <label class="control-label">Logradouro</label>
    <input type="text" class="form-control" name="address_street" id="address_street"
        value="{{ $dataTypeContent->address_street ?? '' }}"
        placeholder="Rua, Avenida, etc">
</div>

<div class="form-group col-md-3">
    <label class="control-label">Número</label>
    <input type="text" class="form-control" name="address_number" id="address_number"
        value="{{ $dataTypeContent->address_number ?? '' }}"
        placeholder="123">
</div>

<div class="form-group col-md-9">
    <label class="control-label">Complemento</label>
    <input type="text" class="form-control" name="address_complement" id="address_complement"
        value="{{ $dataTypeContent->address_complement ?? '' }}"
        placeholder="Apto, Sala, etc">
</div>

<div class="form-group col-md-12">
    <label class="control-label">Bairro</label>
    <input type="text" class="form-control" name="address_neighborhood" id="address_neighborhood"
        value="{{ $dataTypeContent->address_neighborhood ?? '' }}"
        placeholder="Bairro">
</div>

<div class="form-group col-md-6">
    <label class="control-label">Cidade</label>
    <input type="text" class="form-control" name="address_city" id="address_city"
        value="{{ $dataTypeContent->address_city ?? '' }}"
        placeholder="Cidade">
</div>

<div class="form-group col-md-2">
    <label class="control-label">Estado</label>
    <input type="text" class="form-control" name="address_state" id="address_state"
        value="{{ $dataTypeContent->address_state ?? '' }}"
        placeholder="SP" maxlength="2">
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('address_zip_code');
    const searchBtn = document.querySelector('[type="button"][class*="btn-info"]');
    
    if (cepInput && searchBtn) {
        // Buscar ao sair do campo
        cepInput.addEventListener('blur', searchCEP);
        
        // Buscar ao clicar no botão
        searchBtn.addEventListener('click', searchCEP);
    }
});

function searchCEP() {
    const cep = document.getElementById('address_zip_code').value;
    
    if (!cep) {
        alert('Digite um CEP');
        return;
    }
    
    // Remover caracteres especiais
    const cepClean = cep.replace(/\D/g, '');
    
    if (cepClean.length !== 8) {
        alert('CEP deve ter 8 dígitos');
        return;
    }
    
    // Buscar via ViaCEP
    fetch(`https://viacep.com.br/ws/${cepClean}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado');
                return;
            }
            
            // Preencher campos automaticamente
            document.getElementById('address_street').value = data.logradouro || '';
            document.getElementById('address_neighborhood').value = data.bairro || '';
            document.getElementById('address_city').value = data.localidade || '';
            document.getElementById('address_state').value = data.uf || '';
            
            console.log('✅ CEP preenchido com sucesso');
        })
        .catch(error => {
            console.error('❌ Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Tente novamente.');
        });
}
</script>
