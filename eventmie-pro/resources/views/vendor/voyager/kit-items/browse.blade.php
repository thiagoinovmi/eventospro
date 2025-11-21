@extends('voyager::master')

@section('page_title', __('voyager::generic.viewing').' '.$dataType->getTranslatedAttribute('display_name_plural'))

@section('page_header')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="{{ $dataType->icon }}"></i> {{ trans('voyager::generic.' . strtolower($dataType->slug)) ?? $dataType->getTranslatedAttribute('display_name_plural') }}
        </h1>
        <a href="{{ route('voyager.'.$dataType->slug.'.create') }}" class="btn btn-success btn-add-new">
            <i class="voyager-plus"></i> <span>{{ __('voyager::generic.add_new') }}</span>
        </a>
        @include('voyager::multilingual.language-selector')
    </div>
@stop

@section('content')
    <div class="page-content browse container-fluid">
        @include('voyager::alerts')
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table id="dataTable" class="table table-hover">
                                <thead>
                                    <tr>
                                        @foreach($dataType->browseRows as $row)
                                        <th>
                                            {{ \App\Helpers\VoyagerTranslationHelper::translateFieldName($row->getTranslatedAttribute('display_name'), $row->field) }}
                                        </th>
                                        @endforeach
                                        
                                        <th class="actions text-right dt-not-orderable">{{ __('voyager::generic.actions') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($dataTypeContent as $key => $data)
                                    <tr>
                                        @foreach($dataType->browseRows as $row)
                                            @php
                                            if ($data->{$row->field.'_browse'}) {
                                                $data->{$row->field} = $data->{$row->field.'_browse'};
                                            }
                                            @endphp
                                            <td>
                                                @if (isset($row->details->view))
                                                    @include($row->details->view, ['row' => $row, 'dataType' => $dataType, 'dataTypeContent' => $dataTypeContent, 'content' => $data->{$row->field}, 'action' => 'browse', 'view' => 'browse', 'options' => $row->details])
                                                @elseif($row->type == 'image')
                                                    <img src="@if( !filter_var($data->{$row->field}, FILTER_VALIDATE_URL)){{ Voyager::image( $data->{$row->field} ) }}@else{{ $data->{$row->field} }}@endif" style="width:100px">
                                                @elseif($row->type == 'relationship')
                                                    @include('voyager::formfields.relationship', ['view' => 'browse','options' => $row->details])
                                                @elseif($row->type == 'text')
                                                    <div>{{ mb_strlen( $data->{$row->field} ) > 100 ? mb_substr($data->{$row->field}, 0, 100) . ' ...' : $data->{$row->field} }}</div>
                                                @elseif($row->type == 'text_area')
                                                    <div>{{ mb_strlen( $data->{$row->field} ) > 100 ? mb_substr($data->{$row->field}, 0, 100) . ' ...' : $data->{$row->field} }}</div>
                                                @elseif($row->type == 'number')
                                                    {{ $data->{$row->field} }}
                                                @else
                                                    <span>{{ $data->{$row->field} }}</span>
                                                @endif
                                            </td>
                                        @endforeach
                                        
                                        <td class="no-sort no-click bread-actions">
                                            @can('read', $data)
                                                <a href="{{ route('voyager.'.$dataType->slug.'.show', $data->getKey()) }}" class="btn btn-sm btn-warning pull-right view">
                                                    <i class="voyager-eye"></i> <span class="hidden-xs hidden-sm">{{ __('voyager::generic.view') }}</span>
                                                </a>
                                            @endcan
                                            @can('edit', $data)
                                                <a href="{{ route('voyager.'.$dataType->slug.'.edit', $data->getKey()) }}" class="btn btn-sm btn-primary pull-right edit">
                                                    <i class="voyager-edit"></i> <span class="hidden-xs hidden-sm">{{ __('voyager::generic.edit') }}</span>
                                                </a>
                                            @endcan
                                            @can('delete', $data)
                                                <a href="javascript:;" onclick="deleteHandler(this)" class="btn btn-sm btn-danger pull-right delete" data-id="{{ $data->getKey() }}" id="delete-{{ $dataType->slug }}-{{ $data->getKey() }}">
                                                    <i class="voyager-trash"></i> <span class="hidden-xs hidden-sm">{{ __('voyager::generic.delete') }}</span>
                                                </a>
                                            @endcan
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        @if ($isServerSide)
                            <div class="pull-left">
                                <div class="dataTables_info">
                                    {{ trans_choice('voyager::generic.showing_entries', $dataTypeContent->total(), ['from' => $dataTypeContent->firstItem(), 'to' => $dataTypeContent->lastItem(), 'total' => $dataTypeContent->total()]) }}
                                </div>
                            </div>
                            <div class="pull-right">
                                {{ $dataTypeContent->render() }}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade modal-danger in" id="delete_modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"><i class="voyager-trash"></i> {{ __('voyager::generic.delete_question') }}</h4>
                </div>
                <div class="modal-body">
                    <h4>{{ __('voyager::generic.are_you_sure') }}</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{ __('voyager::generic.cancel') }}</button>
                    <button type="button" class="btn btn-danger" id="delete_confirm">{{ __('voyager::generic.delete_confirm') }}</button>
                </div>
            </div>
        </div>
    </div>
@stop

@section('javascript')
    <script>
        var deleteHandler = function(e) {
            var form = $('<form>', {
                'method': 'POST',
                'action': '{{ route('voyager.' . $dataType->slug . '.destroy', '__id') }}'.replace('__id', $(e).data('id'))
            });
            var token = $('<input>').attr('type', 'hidden').attr('name', '_token').attr('value', '{{ csrf_token() }}');
            var delete_method = $('<input>').attr('type', 'hidden').attr('name', '_method').attr('value', 'DELETE');
            form.append(token);
            form.append(delete_method);
            $('body').append(form);
            $('#delete_confirm').off('click').on('click', function() {
                form.submit();
            });
            $('#delete_modal').modal('show');
        }
    </script>
@stop
