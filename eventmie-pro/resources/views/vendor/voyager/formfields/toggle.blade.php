@if(isset($dataTypeContent->{$row->field}))
    <input type="checkbox" name="{{ $row->field }}" class="toggleswitch" data-toggle="toggle" 
        data-on="{{ __('voyager::generic.active') }}" 
        data-off="{{ __('voyager::generic.inactive') }}"
        @if($dataTypeContent->{$row->field}) checked @endif>
@else
    <input type="checkbox" name="{{ $row->field }}" class="toggleswitch" data-toggle="toggle" 
        data-on="{{ __('voyager::generic.active') }}" 
        data-off="{{ __('voyager::generic.inactive') }}">
@endif
