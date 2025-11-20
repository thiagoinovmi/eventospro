@extends('voyager::master')

@section('page_title', __('voyager::generic.viewing').' '.$dataType->getTranslatedAttribute('display_name_plural'))

@section('page_header')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="{{ $dataType->icon }}"></i> {{ trans('voyager::generic.' . strtolower($dataType->slug)) ?? $dataType->getTranslatedAttribute('display_name_plural') }}
        </h1>
        @can('add', app($dataType->model_name))
            <a href="{{ route('voyager.'.$dataType->slug.'.create') }}" class="btn btn-success btn-add-new">
                <i class="voyager-plus"></i> <span>{{ __('voyager::generic.add_new') }}</span>
            </a>
        @endcan
        @can('delete', app($dataType->model_name))
            @include('voyager::partials.bulk-delete')
        @endcan
        @can('edit', app($dataType->model_name))
            @if(isset($dataType->order_column) && isset($dataType->order_display_column))
                <a href="{{ route('voyager.'.$dataType->slug.'.order') }}" class="btn btn-primary btn-add-new">
                    <i class="voyager-list"></i> <span>{{ __('voyager::bread.order') }}</span>
                </a>
            @endif
        @endcan
        @can('delete', app($dataType->model_name))
            @if($usesSoftDeletes)
                <input type="checkbox" @if ($showSoftDeleted) checked @endif id="show_soft_deletes" data-toggle="toggle" data-on="{{ __('voyager::bread.soft_deletes_off') }}" data-off="{{ __('voyager::bread.soft_deletes_on') }}">
            @endif
        @endcan
        @foreach($actions as $action)
            @if (method_exists($action, 'massAction'))
                @include('voyager::bread.partials.actions', ['action' => $action, 'data' => null])
            @endif
        @endforeach
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
                        @if ($isServerSide)
                            <form method="get" class="form-search mb-3">
                                <div class="row g-2">
                                    <div class="col-12 col-sm-4 col-md-3">
                                        <select id="search_key" name="key" class="form-control">
                                            <option value="">{{ __('voyager::generic.search_key') }}</option>
                                            @foreach($dataType->searchable_columns as $key => $value)
                                                <option value="{{ $value }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-12 col-sm-5 col-md-6">
                                        <input type="text" class="form-control" name="s" id="search_value"
                                               placeholder="{{ __('voyager::generic.search_value') }}">
                                    </div>
                                    <div class="col-12 col-sm-3 col-md-3">
                                        <button type="submit" class="btn btn-info w-100">{{ __('voyager::generic.search') }}</button>
                                    </div>
                                </div>
                            </form>
                        @endif
                        <div class="table-responsive">
                            <table id="dataTable" class="table table-hover">
                                <thead>
                                    <tr>
                                        @if($showCheckboxColumn)
                                            <th class="dt-not-orderable">
                                                <input type="checkbox" class="select_all">
                                            </th>
                                        @endif
                                        @foreach($dataType->browseRows as $row)
                                        <th>
                                            @if ($isServerSide && $row->type !== 'relationship')
                                                <a href="{{ $row->sortByUrl($orderBy, $sortOrder) }}">
                                            @endif
                                            {{ \App\Helpers\VoyagerTranslationHelper::translateFieldName($row->getTranslatedAttribute('display_name'), $row->field) }}
                                            @if ($isServerSide)
                                                @if ($row->isCurrentSortField($orderBy))
                                                    @if ($sortOrder == 'asc')
                                                        <i class="voyager-angle-up pull-right"></i>
                                                    @else
                                                        <i class="voyager-angle-down pull-right"></i>
                                                    @endif
                                                @endif
                                                </a>
                                            @endif
                                        </th>
                                        @endforeach
                                        
                                        <th class="actions text-right dt-not-orderable">{{ __('voyager::generic.actions') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($dataTypeContent as $key => $data)
                                    <tr>
                                        @if($showCheckboxColumn)
                                            <td>
                                                <input type="checkbox" name="row_id" id="checkbox_{{ $data->getKey() }}" value="{{ $data->getKey() }}">
                                            </td>
                                        @endif
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
                                                @elseif($row->type == 'select_dropdown')
                                                    @if(property_exists($row->details, 'options'))
                                                        @php
                                                            $fieldValue = $data->{$row->field};
                                                            $options = $row->details->options;
                                                            $displayValue = isset($options->{$fieldValue}) ? $options->{$fieldValue} : $fieldValue;
                                                        @endphp
                                                        {{ $displayValue }}
                                                    @else
                                                        {{ $data->{$row->field} }}
                                                    @endif
                                                @elseif($row->type == 'date' || $row->type == 'timestamp')
                                                    @php
                                                        $fieldValue = $data->{$row->field};
                                                        if (strtotime($fieldValue)) {
                                                            $formattedDate = \Carbon\Carbon::parse($fieldValue)->format(format_carbon_date(true));
                                                        } else {
                                                            $formattedDate = $fieldValue;
                                                        }
                                                    @endphp
                                                    {{ $formattedDate }}
                                                @elseif($row->type == 'checkbox')
                                                    @if($data->{$row->field})
                                                        <span class="label label-success">{{ __('voyager::generic.yes') }}</span>
                                                    @else
                                                        <span class="label label-danger">{{ __('voyager::generic.no') }}</span>
                                                    @endif
                                                @elseif($row->type == 'color')
                                                    <span class="badge badge-lg" style="background-color: {{ $data->{$row->field} }}">{{ $data->{$row->field} }}</span>
                                                @elseif($row->type == 'text')
                                                    @include('voyager::multilingual.input-hidden-bread-browse')
                                                    <div>{{ mb_strlen( $data->{$row->field} ) > 200 ? mb_substr($data->{$row->field}, 0, 200) . ' ...' : $data->{$row->field} }}</div>
                                                @elseif($row->type == 'text_area')
                                                    @include('voyager::multilingual.input-hidden-bread-browse')
                                                    <div>{{ mb_strlen( $data->{$row->field} ) > 200 ? mb_substr($data->{$row->field}, 0, 200) . ' ...' : $data->{$row->field} }}</div>
                                                @elseif($row->type == 'file' && !empty($data->{$row->field}) )
                                                    @include('voyager::multilingual.input-hidden-bread-browse')
                                                    @if(json_decode($data->{$row->field}) !== null)
                                                        @foreach(json_decode($data->{$row->field}) as $file)
                                                            <a href="{{ Storage::disk(config('voyager.storage.disk'))->url($file->download_link) ?: '' }}" target="_blank">
                                                                <i class="voyager-download"></i> {{ $file->original_name ?: $file->download_link }}
                                                            </a>
                                                            <br/>
                                                        @endforeach
                                                    @else
                                                        <a href="{{ Storage::disk(config('voyager.storage.disk'))->url($data->{$row->field}) ?: '' }}" target="_blank">
                                                            <i class="voyager-download"></i> Download
                                                        </a>
                                                    @endif
                                                @elseif($row->type == 'rich_text_box')
                                                    @include('voyager::multilingual.input-hidden-bread-browse')
                                                    <div>{{ mb_strlen( strip_tags($data->{$row->field}, '<b><i><u>') ) > 200 ? mb_substr(strip_tags($data->{$row->field}, '<b><i><u>'), 0, 200) . ' ...' : strip_tags($data->{$row->field}, '<b><i><u>') }}</div>
                                                @elseif($row->type == 'coordinates')
                                                    @include('voyager::partials.coordinates-static-image')
                                                @elseif($row->type == 'multiple_images')
                                                    @php $images = json_decode($data->{$row->field}); @endphp
                                                    @if($images)
                                                        @php $images = array_slice($images, 0, 3); @endphp
                                                        @foreach($images as $image)
                                                            <img src="@if( !filter_var($image, FILTER_VALIDATE_URL)){{ Voyager::image( $image ) }}@else{{ $image }}@endif" style="width:50px">
                                                        @endforeach
                                                    @endif
                                                @elseif($row->type == 'media_picker')
                                                    @php $images = json_decode($data->{$row->field}); @endphp
                                                    @if($images)
                                                        @php $images = array_slice($images, 0, 3); @endphp
                                                        @foreach($images as $image)
                                                            <img src="@if( !filter_var($image, FILTER_VALIDATE_URL)){{ Voyager::image( $image ) }}@else{{ $image }}@endif" style="width:50px">
                                                        @endforeach
                                                    @endif
                                                @else
                                                    <span>{{ $data->{$row->field} }}</span>
                                                @endif
                                            </td>
                                        @endforeach
                                        
                                        <td class="no-sort no-click bread-actions">
                                            <a href="{{ route('voyager.'.$dataType->slug.'.show', $data->getKey()) }}" class="btn btn-sm btn-warning pull-right view">
                                                <i class="voyager-eye"></i> <span class="hidden-xs hidden-sm">{{ __('voyager::generic.view') }}</span>
                                            </a>
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
                        @if($isServerSide)
                            <div class="pull-left">
                                <div class="pagination-info">
                                    {{ trans_choice('voyager::generic.showing_entries', $dataTypeContent->count(), ['from' => $dataTypeContent->count() ? $dataTypeContent->currentPage() * $dataTypeContent->perPage() - $dataTypeContent->perPage() + 1 : 0, 'to' => $dataTypeContent->currentPage() * $dataTypeContent->perPage(), 'all' => $dataTypeContent->total()]) }}
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

    {{-- Single delete modal --}}
    <div class="modal fade modal-danger in" id="delete_modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title"><i class="voyager-trash"></i> {{ __('voyager::generic.delete_question', ['table' => $dataType->getTranslatedAttribute('display_name')]) }}</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{ __('voyager::generic.cancel') }}</button>
                    <button type="button" class="btn btn-danger" id="delete_confirm">{{ __('voyager::generic.delete_confirm') }}</button>
                </div>
            </div>
        </div>
    </div>
    {{-- End delete modal --}}
@stop

@section('javascript')
    @if ($isServerSide)
        <script>
            $(document).ready(function () {
                $('#search_key').select2();
            });
        </script>
    @else
        <script>
            $(document).ready(function () {
                $('#dataTable').DataTable({
                    "order": [],
                    "columnDefs": [{
                        "targets": "dt-not-orderable",
                        "orderable": false
                    }]
                });
            });
        </script>
    @endif

    <script>
        var deleteFormAction;
        $('.delete').on('click', function (e) {
            var form = $('#delete_form')[0];

            if (!deleteFormAction) { // Save form action submit value
                deleteFormAction = form.action;
            }

            form.action = deleteFormAction.match(/\//) + '/' + $(this).data('id');
            $('#delete_modal').modal('show');
        });

        $('#delete_confirm').on('click', function (e) {
            $('#delete_form')[0].submit();
        });
    </script>
@stop
