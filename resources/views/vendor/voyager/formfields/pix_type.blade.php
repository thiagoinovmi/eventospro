@php
    $options = $options->options ?? [];
    if (!is_array($options)) {
        $options = json_decode($options, true);
    }
@endphp

<select class="form-control select2" name="{{ $row->field }}" @if($row->required) required @endif>
    <option value="" disabled @if(empty($dataTypeContent->{$row->field})) selected @endif>{{ trans('voyager::generic.select_pix_type') }}</option>
    <option value="email" @if($dataTypeContent->{$row->field} === 'email') selected @endif>{{ trans('voyager::generic.email') }}</option>
    <option value="cpf" @if($dataTypeContent->{$row->field} === 'cpf') selected @endif>{{ trans('voyager::generic.cpf') }}</option>
    <option value="cnpj" @if($dataTypeContent->{$row->field} === 'cnpj') selected @endif>{{ trans('voyager::generic.cnpj') }}</option>
    <option value="phone" @if($dataTypeContent->{$row->field} === 'phone') selected @endif>{{ trans('voyager::generic.phone') }}</option>
    <option value="random" @if($dataTypeContent->{$row->field} === 'random') selected @endif>{{ trans('voyager::generic.random') }}</option>
</select>
