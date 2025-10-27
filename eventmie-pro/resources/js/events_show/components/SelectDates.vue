<!-- Event schedules-->
<template>
    <div class="col-xs-12">
        <div  v-if="event.repetitive > 0">
            <div class="btn border-dark text-primary border-2 rounded-2 py-1 px-1 d-flex gap-1" style="width: fit-content;">
                <button @click="navigateMonth(-1)" class="arrow-btn" :disabled="tab_active_index <= 0"><i class="fa fa-chevron-left"></i></button>
                <select v-model="tab_active_index" @change="updateDates" class="form-control form-control-sm bg-transparent border-0 rounded-0 text-center fw-bold" style="width: fit-content;">
                    <option v-for="(item, index) in calculate_months" :key="index" :value="index"
                        v-if="schedules[index].from_time != null && schedules[index].to_time != null &&
                        (moment(moment(local_from_date[index], 'YYYY-MM-DD').format('MM YYYY'), 'MM YYYY').isAfter(moment(moment().format('MM YYYY'), 'MM YYYY')) || 
                        moment(moment(local_from_date[index], 'YYYY-MM-DD').format('MM YYYY'), 'MM YYYY').isSame(moment(moment().format('MM YYYY'), 'MM YYYY')))">
                        {{ moment(local_from_date[index], "YYYY-MM-DD").format('MMMM, YYYY') }}
                    </option>
                </select>
                <button @click="navigateMonth(1)" class="arrow-btn" :disabled="tab_active_index >= calculate_months.length - 1"><i class="fa fa-chevron-right"></i></button>
            </div>
           

            <!-- non-merge schedule | daily/weekly/monthly -->
            <div class="tab-content v-scroll mh-30 p-3" v-if="event.merge_schedule <= 0">
                <div v-for="(item, index) in calculate_months" 
                    :key="index"   class="tab-pane" :class="{'active' : index == tab_active_index}" 
                    
                    v-if="schedules[index].from_time != null
                    && schedules[index].to_time != null 
                    ">
                    
                    <div class="row d-flex gap-2" role="tablist" aria-multiselectable="true" v-if="parseInt(schedules[0].repetitive_type) != parseInt(2)">
                        <div class="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer"
                            @click="previousSlide(`${'slideTicketsDWM_'+index}`)"
                        >
                            <i class="fa fa-chevron-left"></i>
                        </div>

                        <a role="button" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne"
                            class="d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1" :id="`${'slideTicketsDWM_'+index}`">
                            <div class="d-flex justify-content-between flex-wrap lgx-single-schedule"
                                :class="{
                                    'expired-event': userTimezone1(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss'),
                                    'outofstock-event': !available_dates[index][index1],
                                    'schedule-active': booked_date_server === moment(item+'-'+selected_date).format('YYYY-MM-DD')
                                }"
                                v-for="(selected_date, index1) in selected_dates[index]" 
                                :key="index1" 
                            >
                                <div class="card p-3 py-2 border border-2 border-dark pointer rounded-1 schedule-info"
                                    @click="
                                        (!(userTimezone1(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && available_dates[index][index1])
                                        ? selectDates(userTimezone1(dateToFullDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date),'dddd LL').format('dddd LL'), false,
                                        changeTimeFormat(userTimezone1(moment(schedules[index].from_date).format('YYYY-MM')+'-'+selected_date+' '+schedules[index].from_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'))
                                        , changeTimeFormat(userTimezone1(moment(schedules[index].to_date).format('YYYY-MM')+'-'+selected_date+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')) ) 
                                        : null">
                                    <p class="m-0 text-dark text-xs">{{ userTimezone1(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date), date_format.vue_date_format).format('ddd') }}</p>
                                    <p class="m-0 text-dark lh-1 h5 text-bolder">{{ userTimezone1(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date), date_format.vue_date_format).format('DD') }}</p>
                                    
                                     <!-- expired -->
                                    <small class="text-danger font-size-p7" v-if="userTimezone1(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')"
                                    >
                                        <span>{{ trans('em.ended') }}</span>
                                    </small>

                                    <!-- out-of-stock -->
                                    <small class="text-danger font-size-p7" v-if="
                                        !(userTimezone1(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && !available_dates[index][index1]"
                                    >
                                        <span>{{ trans('em.sold') }}</span>
                                    </small>

                                </div>
                            </div>    
                        </a>

                        <div class="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer m-position"
                            @click="nextSlide(`${'slideTicketsDWM_'+index}`)"
                        >
                            <i class="fa fa-chevron-right"></i>
                        </div>
                               
                    </div>

                    <!-- for weekly -->
                    <div v-else class="row d-flex gap-2" role="tablist" aria-multiselectable="true">
                        <div class="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer"
                            @click="previousSlide(`${'slideTicketsWeekly_'+index}`)"
                        >
                            <i class="fa fa-chevron-left"></i>
                        </div>
                        <a role="button" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne"
                            class="d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1" :id="`${'slideTicketsWeekly_'+index}`">

                            <div class="" 
                                :class="{
                                    'expired-event': userTimezone(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss'),
                                        'outofstock-event': !available_dates[index][index1]
                                }"
                                v-for="(selected_date, index1) in selected_dates[index]" 
                                :key="index1" 
                            >
                                <div class="d-flex justify-content-between flex-wrap lgx-single-schedule" 
                                    @click="
                                        (!(userTimezone(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && available_dates[index][index1])
                                        ? selectDates(userTimezone(dateToFullDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date),'dddd LL').format('dddd LL'), false,
                                        changeTimeFormat(userTimezone(moment(schedules[index].from_date).format('YYYY-MM')+'-'+selected_date+' '+schedules[index].from_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'))
                                        , changeTimeFormat(userTimezone(moment(schedules[index].to_date).format('YYYY-MM')+'-'+selected_date+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')) ) 
                                        : null">
                                    <div class="card p-3 py-2 border border-2 border-dark pointer rounded-1 schedule-info">
                                        <p class="m-0 text-dark text-xs">{{ userTimezone(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date), date_format.vue_date_format).format('ddd') }}</p>
                                        <p class="m-0 text-dark lh-1 h5 text-bolder">{{ userTimezone(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date), date_format.vue_date_format).format('DD') }}</p>
                                        
                                        <!-- expired -->
                                        <small class="text-danger font-size-p7" v-if="userTimezone(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')"
                                        >
                                            <span>{{ trans('em.ended') }}</span>
                                        </small>

                                        <!-- out-of-stock -->
                                        <small class="text-danger font-size-p7" v-if="
                                            !(userTimezone(item+'-'+selected_date+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && !available_dates[index][index1]"
                                        >
                                            <span>{{ trans('em.sold') }}  </span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer m-position"
                            @click="nextSlide(`${'slideTicketsWeekly_'+index}`)"
                        >
                            <i class="fa fa-chevron-right"></i>
                        </div>

                    </div>

                </div>
                <!-- daily/weekly/monthly Block -->
                <div class="single-schedule mt-3 d-w-m" v-if="booked_date_server != null">
                    <div class="schedule-row d-inline-flex align-items-center bg-primary flex-wrap gap-2">
                        <div class="schedule-col schedule-date">
                            <div class="fw-bold text-light">
                            {{ moment(booked_date_server).format('DD MMM YYYY') || trans('em.select_a_date') }}
                            </div>
                        </div>
                        <div class="schedule-col schedule-status text-center">
                            <span></span>
                        </div>
                        <div class="schedule-col schedule-time text-end">
                            <div class="badge bg-light text-dark">
                            {{ start_time }} {{ end_time }} {{ showTimezone() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- merge schedule | monthly repetitive -->
            <div class="tab-content v-scroll mh-30 p-3 pb-4" v-if="event.merge_schedule > 0 && parseInt(schedules[0].repetitive_type) == parseInt(3)">
                <div v-for="(item, index) in calculate_months" :key="index" class="tab-pane" :class="{'active' : index == tab_active_index}" >
                    <div class="row is-relative" role="tablist" aria-multiselectable="true">
                        <a role="button" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne"
                            class="d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1">
                            <div class="d-flex justify-content-between flex-wrap shadow-sm mb-2 lgx-single-schedule ms-2" 
                                :class="{
                                    'expired-event': userTimezone1(item+'-'+selected_dates[index][selected_dates[index].length - 1]+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss'),
                                    'outofstock-event': !available_dates[index][0],
                                    'schedule-active': booked_date_server === moment(item+'-'+selected_dates[index][0]).format('YYYY-MM-DD')
                                }"
                                @click="
                                    (!(userTimezone1(item+'-'+selected_dates[index][selected_dates[index].length - 1]+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && available_dates[index][0])
                                    ? selectDates(
                                    userTimezone1(dateToFullDate(selected_dates[index][0]+' '+schedules[index].from_time,schedules[index].from_date),'dddd LL').format('dddd LL'),
                                    userTimezone1(dateToFullDate(selected_dates[index][selected_dates[index].length - 1]+' '+schedules[index].from_time, schedules[index].from_date),'dddd LL').format('dddd LL'),
                                    changeTimeFormat(userTimezone1(moment(schedules[index].from_date).format('YYYY-MM')+'-'+selected_dates[index][0]+' '+schedules[index].from_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')), 
                                    changeTimeFormat(userTimezone1(moment(schedules[index].to_date).format('YYYY-MM')+'-'+selected_dates[index][0]+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')) 
                                ) : null" 
                            >
                                <div class=" card p-3 py-2 border border-2 border-dark pointer rounded-1   card-body schedule-info">
                                    
                                    <!-- expired -->
                                    <small class="text-danger font-size-p7" v-if="userTimezone1(item+'-'+selected_dates[index][selected_dates[index].length - 1]+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')"
                                    >
                                        <span>{{ trans('em.ended') }}</span>
                                    </small>
                                    
                                    <!-- out-of-stock -->
                                    <small class="text-danger font-size-p7" v-if="
                                        !(userTimezone1(item+'-'+selected_dates[index][selected_dates[index].length - 1]+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && !available_dates[index][0]"
                                    >
                                        <span>{{ trans('em.sold') }}</span>
                                    </small>

                                    <div class="d-flex justify-content-start gap-2 align-self-center">
                                        <div 
                                            v-for="(selected_date, index2) in selected_dates[index]" :key="index2" 
                                        >
                                            <p class="m-0 text-dark text-xs">
                                                {{ userTimezone1(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date ), date_format.vue_date_format).format('ddd') }}
                                            </p>
                                            <p class="m-0 text-dark lh-1 h5 text-bolder">
                                                {{ userTimezone1(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date ), date_format.vue_date_format).format('DD') }}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </a>
                        <!-- monthly repetitive Block -->
                        <div class="monthly-timing" v-if="booked_date_server != null">
                            <div class="schedule-row d-inline-flex align-items-center justify-content-center">
                                <div>
                                    <div class="badge bg-dark text-light rounded-1">
                                        {{ trans('em.timings') }}&nbsp; {{ start_time }} - {{ end_time }} {{ showTimezone() }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- merge schedule | weekly repetitive -->
            <div class="tab-content v-scroll mh-30 p-3 pb-5" v-if="event.merge_schedule > 0 && parseInt(schedules[0].repetitive_type) == parseInt(2)">
                <div v-for="(item, index) in calculate_months" :key="index" class="tab-pane" :class="{'active' : index == tab_active_index}" 
                    v-if="schedules[index].from_time != null && schedules[index].to_time != null "
                >
                    <div class="row d-flex gap-2 is-relative" role="tablist" aria-multiselectable="true">
                        <div class="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer"
                            @click="previousSlide(`${'slideTicketsDWM_'+index}`)"
                        >
                            <i class="fa fa-chevron-left"></i>

                        </div>
                        <a role="button" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne"
                            class="d-flex gap-2 text-dark h-scroll col-xl-10 col-lg-10 col-md-10 col-12 px-0 py-1 p-lg-0 flex-grow-1" :id="`${'slideTicketsDWM_'+index}`">
                            <div class="card border-0 shadow-sm  mb-2 lgx-single-schedule"  
                                :class="{
                                        'expired-event': moment(moment(getWeekLastDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD')+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss'),
                                        'outofstock-event': !checkSeatAvailability(moment(getWeekFirstDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD')),
                                        'schedule-active': booked_date_server === moment(getWeekFirstDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD')
                                    }"
                                v-for="(item2, index2) in week_numbers[index]" 
                                :key="index2"
                                @click="
                                    (!(moment(moment(getWeekLastDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD')+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && 
                                        checkSeatAvailability(moment(getWeekFirstDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD'))) 
                                    ? selectDates(
                                    getWeekFirstDate(item2, selected_dates[index], schedules[index].from_date),
                                    getWeekLastDate(item2, selected_dates[index], schedules[index].from_date),
                                    changeTimeFormat(userTimezone(moment(schedules[index].from_date).format('YYYY-MM')+'-'+selected_dates[index]+' '+schedules[index].from_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')), 
                                    changeTimeFormat(userTimezone(moment(schedules[index].to_date).format('YYYY-MM')+'-'+selected_dates[index]+' '+schedules[index].to_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')))
                                    : null" 
                            >
                                <div class="card p-3 py-2 border border-2 border-dark pointer rounded-1 schedule-info">
                                    <div class="d-flex justify-content-start gap-1 align-self-center">
                                        <div 
                                            v-for="(selected_date, index3) in selected_dates[index]" 
                                            :key="index3"
                                            v-if="item2 == moment(userTimezone(dateToFullDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date),'dddd LL').format('dddd LL'),'dddd LL').isoWeek()"
                                        >
                                            <p class="m-0 text-dark text-xs">{{ userTimezone(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date ),date_format.vue_date_format).format('ddd') }}</p>
                                            <p class="m-0 text-dark lh-1 h5 text-bolder">{{ userTimezone(dateToShortDate(selected_date+' '+schedules[index].from_time, schedules[index].from_date ),date_format.vue_date_format).format('DD') }}</p>
                                        </div>
                                    </div>   

                                    <!-- expired -->
                                    <small class="text-danger font-size-p7">
                                        <span v-if="moment(moment(getWeekLastDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD')+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')">{{ trans('em.ended') }}</span>
                                        <span v-else>&nbsp;</span>
                                    </small>
                                    
                                    <!-- out-of-stock -->
                                    <small class="text-danger font-size-p7" v-if="
                                        !(moment(moment(getWeekLastDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD')+' '+schedules[index].to_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && 
                                        !checkSeatAvailability(moment(getWeekFirstDate(item2, selected_dates[index], schedules[index].from_date)).format('YYYY-MM-DD'))"
                                    >
                                        <span>{{ trans('em.sold') }}</span>
                                    </small>
                                     
                                </div>
                            </div>
                        </a>
                        <!-- weekly repetitive Block -->
                        <div class="ms-lg-3 weekly-timing" v-if="booked_date_server != null">
                            <div class="schedule-row d-inline-flex align-items-center justify-content-center">
                                <div>
                                    <div class="badge bg-dark text-light rounded-1">
                                        {{ trans('em.timings') }}&nbsp; {{ start_time }} - {{ end_time }} {{ showTimezone() }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-1 col-lg-1 col-md-1 col-12 align-self-center d-flex align-items-center justify-content-center text-center avatar-xs lg border border-2 border-dark rounded-circle pointer m-position"
                            @click="nextSlide(`${'slideTicketsDWM_'+index}`)"
                        >
                            <i class="fa fa-chevron-right"></i>
                        </div>

                    </div>
                </div>
            </div>

            <!-- weekly/monthly merge_schedule repetitive Block -->
            <div class="single-schedule w alert alert-primary bg-primary mt-lg-1" v-if="booked_date_server != null && event.merge_schedule > 0">
                <div class="fw-bold text-light"><i class="fas fa-check-circle"></i> {{ trans('em.seasonal_ticket_info') }}</div>
            </div>

        </div>

        <!-- Single day non-repetitive event -->
        <div v-if="event.repetitive <= 0" class="single-schedule">
            <div class="schedule-row d-inline-flex align-items-center bg-primary flex-wrap gap-2" id="buy_ticket_btn"
                @click="
                (!(moment(event.end_date+' '+event.end_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) &&
                checkSeatAvailability(moment(event.start_date,'YYYY-MM-DD' ).format('YYYY-MM-DD'))) ? singleEvent() : null"
        >
                <!-- DATE -->
                <div class="schedule-col schedule-date">
                    <div class="fw-bold text-light">
                        {{ convert_date_to_local_format(userTimezone(event.start_date+' '+event.start_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') ) }}
                    </div>
                </div>

                <!-- STATUS BADGE -->
                <div class="schedule-col schedule-status text-center">
                    <div v-if="moment(event.end_date +' '+event.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')" class="badge bg-danger">{{ trans('em.ended') }}</div>
                    <div v-else-if="
                        !(moment(event.end_date +' '+event.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) &&
                        !checkSeatAvailability(moment(event.start_date,'YYYY-MM-DD' ).format('YYYY-MM-DD'))" class="badge bg-danger">{{ trans('em.out_of_stock') }}</div>
                    <div v-else-if="
                        !(moment(event.end_date +' '+event.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) && positiveInteger(checkSeatAvailability(moment(event.start_date,'YYYY-MM-DD' ).format('YYYY-MM-DD')))" class="badge bg-warning text-dark">{{ trans('em.filling_fast') }}</div>
                </div>

                <!-- TIME -->
                <div class="schedule-col schedule-time text-end">
                    <div class="badge bg-light text-dark">
                        {{ userTimezone(event.start_date+' '+event.start_time, 'YYYY-MM-DD HH:mm:ss').format(date_format.vue_time_format) }} - {{ userTimezone(event.end_date+' '+event.end_time, 'YYYY-MM-DD HH:mm:ss').format(date_format.vue_time_format) }} {{ showTimezone()  }}
                    </div>
                </div>

            </div>
            
        </div>

        <ticket-component 
            v-if="booking_date && start_time && end_time" 
            :event="event" 
            :tickets="tickets" 
            :max_ticket_qty="max_ticket_qty" 
            :currency="currency"
            :login_user_id="login_user_id"
            :is_admin="is_admin"
            :is_organiser="is_organiser"
            :is_customer="is_customer"
            :is_paypal="is_paypal"
            :is_offline_payment_organizer="is_offline_payment_organizer"
            :is_offline_payment_customer="is_offline_payment_customer"
            :booked_tickets="booked_tickets"
        >
        </ticket-component>

        
    </div>
</template>


<script>
import moment from 'moment-timezone';

import { mapState, mapMutations} from 'vuex';
import mixinsFilters from '../../mixins.js';
import TicketComponent from './TicketList.vue';

export default {

    props: [
        'event', 'max_ticket_qty', 'login_user_id',
        'is_admin',
        'is_organiser',
        'is_customer',
        'is_paypal',
        'is_offline_payment_organizer',
        'is_offline_payment_customer',
        'tickets',
        'total_capacity',
        'booked_tickets',
        'currency',
        'date_format'
    ],

    mixins:[
        mixinsFilters
    ],

     components: {
        'ticket-component'  : TicketComponent
    },

    data() {
        return {
            schedules           : [],
            all_dates           : [],
            selected_dates      : [],
            available_dates     : [],

            moment              : moment,
            calculate_months    : [],
            
            // local_time       
            local_from_date    : [],
            local_to_date      : [],
            local_from_time    : [],
            local_to_time      : [],
            local_start_date   : null,
            local_end_date     : null,

            // tab active
            tab_active_index   : null,

            //weekly
            week_numbers       : [],

            //CUSTOM
            tab_active_index: 0, // Default index
            calculate_months: [], // Populated with your month data
            schedules: [], // Your schedule data
            local_from_date: [], // Your date data

            //CUSTOM

        }
    },

    computed: {
        // get global variables
        ...mapState( ['booking_date', 'start_time', 'end_time', 'booking_end_date', 'booked_date_server' ]),
        
    },

    methods: {

        // update global variables
        ...mapMutations(['add', 'update']),
    
        selectDates(booking_date, booking_end_date, start_time, end_time) {
            // Existing selectDates logic
            this.triggerMultiDay(booking_date, booking_end_date, start_time, end_time);

            this.add({
                booking_date: moment(booking_date).isValid() ? booking_date : null,
                booked_date_server: moment(booking_date).isValid()
                ? this.serverTimezone(
                    moment(booking_date).format("dddd LL") + " " + start_time,
                    "dddd LL hh:mm A"
                    ).format("YYYY-MM-DD")
                : null,
                booking_end_date: moment(booking_end_date).isValid()
                ? booking_end_date
                : null,
                start_time: moment(start_time, "hh:mm A").isValid() ? start_time : null,
                end_time: moment(end_time, "hh:mm A").isValid() ? end_time : null,
            });

            // Add data-selected attribute to the corresponding schedule-info
            this.$nextTick(() => {
                // Remove existing data-selected attributes
                document
                .querySelectorAll('.schedule-info[data-selected="true"]')
                .forEach((el) => {
                    el.removeAttribute("data-selected");
                });

                // Find the schedule-info that matches the booking_date
                const formattedBookingDate = moment(booking_date, "dddd LL").format(
                "YYYY-MM-DD"
                );
                const scheduleCards = document.querySelectorAll(".schedule-info");
                scheduleCards.forEach((card) => {
                const dateText = card.querySelector(".text-bolder")?.textContent.trim();
                const dateDay = card.querySelector(".text-xs")?.textContent.trim();
                if (dateText && dateDay) {
                    const fullDate = this.userTimezone1(
                    `${this.calculate_months[this.tab_active_index]}-${dateText} ${this.schedules[this.tab_active_index].from_time}`,
                    "YYYY-MM-DD HH:mm:ss"
                    )
                    .locale("en")
                    .format("YYYY-MM-DD");
                    if (fullDate === formattedBookingDate) {
                    card.setAttribute("data-selected", "true");
                    }
                }
                });
            });
        },
        // getSchedule
        getEventSchedule()
        {
            let post_url = route('eventmie.event_schedule') ;
            let post_data = {
                'event_id'         : this.event.id,
            };

            axios.post(post_url, post_data)
            .then(res => {

                var _this = this;

                this.schedules   = res.data.schedules;

                //server time convert into local timezone
                this.convert_to_local_tz();

                // count and calculate months after get schedule
                // this.calculate_months = this.countMonth(this.schedules[0].from_date, this.schedules[this.schedules.length - 1].from_date);
                this.calculate_months = [];
                this.schedules.forEach(function(value, key) {

                    _this.calculate_months[key] = moment(value['from_date'], 'YYYY-MM-DD').format('YYYY-MM');
                });

                // generate dates
                this.generateDates();

                var _this = this;

                this.schedules.every(function(schedule, index) {

                    if(schedule.from_time != null && schedule.to_time != null && (moment(moment(schedule.from_date, 'YYYY-MM-DD').format('MM  YYYY'), 'MM  YYYY').isAfter(moment(moment().format('MM  YYYY'), 'MM  YYYY')) || moment(moment(schedule.from_date, 'YYYY-MM-DD').format('MM  YYYY'), 'MM  YYYY').isSame(moment(moment().format('MM  YYYY'), 'MM  YYYY')))){
                        _this.tab_active_index = index;


                        return false;

                    }else{
                        return true;
                    }
                });
                this.$nextTick(() => {
                    // set default date
                    this.selectDefaultDate();
                });
                

            })
            .catch(error => {
                let serrors = Vue.helpers.axiosErrors(error);
                if (serrors.length) {
                    this.serverValidate(serrors);
                }
            });
        },
    
        // generates all dates
        generateDates() {

            this.calculate_months.forEach(function(value, key) {

                this.all_dates[key]   = [];
                // make months like 2019-3
                var  month            = moment(this.local_from_date[key], "YYYY-MM-DD").format("YYYY-MM");

                //count days in one month
                var  count_days       = moment(this.local_from_date[key], "YYYY-MM-DD").daysInMonth();

                var i=1;
                while( i <= count_days)
                {
                    // make dates object of moment according to months and year
                    this.all_dates[key].push(moment(month+'-'+i, "YYYY-MM-DD"));


                    i++;
                }
            }.bind(this));

            if(this.schedules[0].repetitive_type==1)
            {
                // generates ddates for daily event
                this.generateDaily();
            }
            else if(this.schedules[0].repetitive_type==2)
            {
                // generates selected dates for weekly event
                this.generateWeekly();
            }
            else if(this.schedules[0].repetitive_type==3)
            {

                this.generateMonthly();
            }
        },
    
        // generates selected dates for monthly event
        generateMonthly() {
            // generates selected dates
            var $this = this;
            this.all_dates.forEach(function(ad_value, ad_key) {

                var schedules_dates = [];


                if($this.schedules[ad_key].repetitive_dates == null)
                    return true;

                JSON.parse($this.schedules[ad_key].repetitive_dates.split(',')).forEach(function(v, k) {
                    schedules_dates[k] = v;
                });

                $this.selected_dates[ad_key]        = [];
                $this.available_dates[ad_key]       = [];
                ad_value.forEach(function(date, key) {

                    if(schedules_dates.includes(moment(date).locale('en').format('DD'))) {

                        if(ad_key == 0 && Object.keys($this.calculate_months).length != 1)
                        {

                            let previousDay = moment()
                            .locale('en')
                            .subtract(1, 'days')
                            .format('YYYY-MM-DD');

                            // selected date must be grather than start_date of event
                            if(moment($this.local_start_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') <= moment(date).locale('en').format('YYYY-MM-DD') || previousDay ==  moment(date).locale('en').format('YYYY-MM-DD'))
                            {
                                $this.selected_dates[ad_key].push(moment(date).format('DD'));
                                // live-seat availability check
                                $this.addAvailableDates(ad_key, moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'), $this, true);
                            }
                        }
                        else if(ad_key == ($this.all_dates.length -1) && Object.keys($this.calculate_months).length != 1)
                        {

                            // selected date must be less than end_date of event
                            if(moment($this.local_end_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') >= moment(date).locale('en').format('YYYY-MM-DD'))
                            {
                                $this.selected_dates[ad_key].push(moment(date).format('DD'));
                                // live-seat availability check
                                $this.addAvailableDates(ad_key, moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'), $this, true);
                            }
                        }

                        if(Object.keys($this.calculate_months).length == 1)
                        {

                                // selected date must be less than end date and grather than start date
                            if(moment($this.local_start_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') <= moment(date).locale('en').format('YYYY-MM-DD')
                                && moment($this.local_end_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') >= moment(date).locale('en').format('YYYY-MM-DD'))
                            {
                                $this.selected_dates[ad_key].push(moment(date).format('DD'));
                                // live-seat availability check
                                $this.addAvailableDates(ad_key, moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'), $this, true);
                            }
                        }
                        else if(Object.keys($this.calculate_months).length != 1 && ad_key != 0 && ad_key != ($this.all_dates.length -1))
                        {

                            $this.selected_dates[ad_key].push(moment(date).format('DD'));
                            // live-seat availability check
                            $this.addAvailableDates(ad_key, moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'), $this, true);
                        }
                    }
                });

            });


        },
    
        // generates selected dates for daily event
        generateDaily() {

            var $this = this;
            this.all_dates.forEach(function(ad_value, ad_key) {

                var schedules_dates = [];
                var tmp             = null;
                var month           = null;


                if($this.schedules[ad_key].repetitive_dates == null)
                    return true;

                JSON.parse($this.schedules[ad_key].repetitive_dates.split(',')).forEach(function(v, k) {

                    // make month like 2019-6 and it server side months
                    month               = moment($this.schedules[ad_key].from_date).format("YYYY-MM");

                    //meke date like 2019-12-3

                    tmp                 = moment(month +'-'+v).format("YY-MM-DD");

                    // convert tmp to number
                    schedules_dates[k]  = moment(tmp, "YY-MM-DD").format('DD');



                });


                //store all number of dates into all_dates_number variable
                var all_dates_number    = [];
                ad_value.forEach(function(v, k) {

                    if(ad_key == 0  && Object.keys($this.calculate_months).length != 1)
                    {

                            let previousDay = moment()
                            .locale('en')
                            .subtract(1, 'days')
                            .format('YYYY-MM-DD');
                        
                        // selected date must be grather than start_date of event
                        if(moment($this.local_start_date,"YYYY-MM-DD").locale('en').format('YYYY-MM-DD') <= moment(v).locale('en').format('YYYY-MM-DD') || previousDay == moment(v).locale('en').format('YYYY-MM-DD'))
                            all_dates_number[k] = moment(v).format('DD');
                    }
                    else if(ad_key == ($this.all_dates.length -1) &&  Object.keys($this.calculate_months).length != 1)
                    {
                        // selected date must be less than end_date of event
                        if(moment($this.local_end_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') >= moment(v).locale('en').format('YYYY-MM-DD'))
                            all_dates_number[k] = moment(v).format('DD');
                    }
                    else if(Object.keys($this.calculate_months).length == 1)
                    {
                        if(moment($this.local_start_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') <= moment(v).locale('en').format('YYYY-MM-DD')
                                && moment($this.local_end_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') >= moment(v).locale('en').format('YYYY-MM-DD'))
                        {
                            all_dates_number[k] = moment(v).format('DD');
                        }
                    }
                    else if(Object.keys($this.calculate_months).length != 1 &&
                                ad_key != 0 &&
                                ad_key != ($this.all_dates.length -1))
                    {
                        all_dates_number[k] = moment(v).format('DD');
                    }
                });


                // live-seat availability check
                $this.available_dates[ad_key]     = [];
                // get diffrence between all_dates_number and schedules_dates
                let difference                   = all_dates_number.filter(function(x) {
                    if(!schedules_dates.includes(x)) {

                        // live-seat availability check
                        $this.addAvailableDates(ad_key, x, $this);

                        return true;
                    }
                });

                $this.selected_dates[ad_key]     = [];
                $this.selected_dates[ad_key]     = difference;
            });
        },
    
             // generates selected dates for weekly event
        generateWeekly() {

            // generates selected dates
            var $this = this;

            this.all_dates.forEach(function(ad_value, ad_key) {

                var schedules_dates = [];

                if($this.schedules[ad_key].repetitive_days == null)
                    return true;

                $this.schedules[ad_key].repetitive_days.split(',').forEach(function(v, k) {

                    if(Number(v)==1)
                        schedules_dates[k] = "Sunday";
                    if(Number(v)==2)
                        schedules_dates[k] = "Monday";
                    if(Number(v)==3)
                        schedules_dates[k] = "Tuesday";
                    if(Number(v)==4)
                        schedules_dates[k] = "Wednesday";
                    if(Number(v)==5)
                        schedules_dates[k] = "Thursday";
                    if(Number(v)==6)
                        schedules_dates[k] = "Friday";
                    if(Number(v)==7)
                        schedules_dates[k] = "Saturday";
                });

                $this.selected_dates[ad_key]     = [];
                ad_value.forEach(function(date, key) {

                    if(schedules_dates.includes(String(date.locale('en').format('dddd')))) {

                        if(ad_key == 0 && Object.keys($this.calculate_months).length != 1)
                        {
                            let previousDay = moment()
                            .locale('en')
                            .subtract(1, 'days')
                            .format('YYYY-MM-DD');

                            let todayDate = moment()
                            .locale('en')
                            .format('YYYY-MM-DD');

                            console.log(date.format('YYYY-MM-DD'), 'date', moment($this.local_start_date,  "YYYY-MM-DD").locale('en').format('YYYY-MM-DD'), moment(date,  "YYYY-MM-DD").locale('en').format('YYYY-MM-DD'));
                            // selected date must be grather than start_date of event
                            if(moment($this.local_start_date,  "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') <= moment(date).locale('en').format('YYYY-MM-DD') || previousDay ==  moment(date).locale('en').format('YYYY-MM-DD') || todayDate ==  moment(date).locale('en').format('YYYY-MM-DD'))
                                $this.selected_dates[ad_key].push(date.format('DD'));

                        }
                        else if(ad_key == ($this.all_dates.length -1) && Object.keys($this.calculate_months).length != 1)
                        {
                            // selected date must be less than end_date of event
                            if(moment($this.local_end_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') >= moment(date).locale('en').format('YYYY-MM-DD'))
                                $this.selected_dates[ad_key].push(date.format('DD'));
                        }
                        else if(Object.keys($this.calculate_months).length == 1)
                        {
                            if(moment($this.local_start_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') <= moment(date).locale('en').format('YYYY-MM-DD')
                                    && moment($this.local_end_date, "YYYY-MM-DD").locale('en').format('YYYY-MM-DD') >= moment(date).locale('en').format('YYYY-MM-DD'))
                            {
                                $this.selected_dates[ad_key].push(date.format('DD'));
                            }
                        }
                        else if(Object.keys($this.calculate_months).length != 1 &&
                                ad_key != 0 &&
                                ad_key != ($this.all_dates.length -1))
                        {
                            $this.selected_dates[ad_key].push(date.format('DD'));
                        }

                        // live-seat availability check
                        $this.available_dates[ad_key]     = [];
                        $this.selected_dates[ad_key].forEach(function(ad_v, ad_k) {
                            $this.available_dates[ad_key].push($this.checkSeatAvailability(moment($this.userTimezone($this.dateToFullDate(ad_v+' '+$this.schedules[ad_key].from_time, $this.schedules[ad_key].from_date), 'dddd LL').format('dddd LL'),'dddd LL').format('YYYY-MM-DD'), $this));
                        });

                    }
                });
            });

            this.weekly();
        },
    
        // server time convert into local timezone
        convert_to_local_tz(){
            // convert all schedules to local timezone
            this.schedules.forEach(function(value, key) {

                // this.local_from_date    = [];
                // this.local_to_date      = [];
                // this.local_from_time[key]    = [];
                // this.local_to_time[key]      = [];

                this.local_from_date[key] = this.schedules[key].from_date;
                this.local_to_date[key]   = this.schedules[key].to_date;
                this.local_from_time[key] = moment(this.schedules[key].from_time, "HH:mm:ss").format(date_format.vue_time_format);
                this.local_to_time[key]   = moment(this.schedules[key].to_time, "HH:mm:ss").format(date_format.vue_time_format);


            }.bind(this));

            // convert all dates to local timezone
            this.local_start_date   = this.userTimezone(this.event.start_date+' '+this.event.start_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
            this.local_end_date     = this.userTimezone(this.event.end_date+' '+this.event.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
        },
    
            //single event
        singleEvent() {
            if (this.event.repetitive <= 0) {
                this.triggerSignleDay();
                this.add({
                booking_date: moment(this.event.start_date, "YYYY-MM-DD")
                    .locale("en")
                    .format("dddd LL"),
                booked_date_server: this.serverTimezone(
                    moment(this.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD") +
                    " " +
                    this.event.start_time,
                    "YYYY-MM-DD HH:mm:ss"
                ).format("YYYY-MM-DD"),
                start_time: this.userTimezone(
                    moment(this.event.start_date, "YYYY-MM-DD").format("YYYY-MM-DD") +
                    " " +
                    this.event.start_time,
                    "YYYY-MM-DD HH:mm:ss"
                )
                    .locale("en")
                    .format("HH:mm:ss"),
                end_time: this.userTimezone(
                    moment(this.event.end_date, "YYYY-MM-DD").format("YYYY-MM-DD") +
                    " " +
                    this.event.end_time,
                    "YYYY-MM-DD HH:mm:ss"
                )
                    .locale("en")
                    .format("HH:mm:ss"),
                });

                // Add data-selected attribute for single-day event
                this.$nextTick(() => {
                document
                    .querySelectorAll('.schedule-info[data-selected="true"]')
                    .forEach((el) => {
                    el.removeAttribute("data-selected");
                    });
                const singleSchedule = document.querySelector(
                    ".lgx-tab .schedule-info"
                );
                if (singleSchedule) {
                    singleSchedule.setAttribute("data-selected", "true");
                }
                });
            }
        },
    
            // week number group for merger_schedule weekly
        weekly(){
            var $this = this;

            this.selected_dates.forEach(function(value, key){
                var week_number = "week_number"
                $this.week_numbers[key] = [];
                value.forEach(function(val1, key1) {

                    if(!$this.week_numbers[key].includes($this.userTimezone(moment($this.dateToFullDate(val1+' '+$this.schedules[key].from_time, $this.schedules[key].from_date ),'dddd LL').locale('en'),'dddd LL').locale('en').isoWeek())) {
                        $this.week_numbers[key].push($this.userTimezone(moment($this.dateToFullDate(val1+' '+$this.schedules[key].from_time, $this.schedules[key].from_date ),'dddd LL').locale('en'),'dddd LL').locale('en').isoWeek());
                    }
                });
            });

        },
    
        //weekly  first date merger_schedule weekly
        getWeekFirstDate(item2, selected_dates, schedules){
            var $this = this;
            var tmp = [];
            selected_dates.forEach(function(selected_date, key){
                if(item2 == moment($this.dateToFullDate(selected_date, schedules), 'dddd LL').locale('en').isoWeek()) {
                    tmp.push(moment($this.dateToFullDate(selected_date, schedules), 'dddd LL').locale('en').format('dddd LL'));
                }
            });

            return tmp[0];
        },

        //weekly  last date merger_schedule weekly
        getWeekLastDate(item2, selected_dates, schedules){

            var $this = this;

            var tmp = [];
            selected_dates.forEach(function(selected_date, key){
                if(item2 == moment($this.dateToFullDate(selected_date, schedules), 'dddd LL').locale('en').isoWeek()) {
                    tmp.push(moment($this.dateToFullDate(selected_date, schedules), 'dddd LL').locale('en').format('dddd LL'));
                }
            });


            return tmp[tmp.length-1];
        },

        // live seat availability check
        checkSeatAvailability(schedule_date, $this) {
            if (typeof($this) == "undefined")
                $this = this;

            // don't check availability if event is expired
            if(moment(schedule_date, "YYYY-MM-DD").format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
                return true;
            }

            // this must be checked after proper mounting
            // for that, we can check for total_capacity
            // if total_capacity > 0 then it's a sign that mount success
            var total_capacity_temp = $this.total_capacity;
            // count total_booked for each date
            // and then calculate total_capacity - total_booked
            // if it's 0
            // then show schedule out-of-stock
            var total_booked        = 0;
            var return_val          = true;
            if(total_capacity_temp > 0) {
                for(var index in $this.tickets) {
                    var ticket_id = $this.tickets[index].id;
                    if (typeof($this.booked_tickets[ticket_id+'-'+schedule_date]) != "undefined") {
                        if($this.booked_tickets[ticket_id+'-'+schedule_date].total_booked > 0) {
                            total_booked += parseInt($this.booked_tickets[ticket_id+'-'+schedule_date].total_booked);
                        }
                    }
                }
            }

            // only return total_available in case of any booked ticket on a schedule.
            // calculate total_capacity - total_booked for each schedule
            if(total_booked > 0)
                return parseInt(total_capacity_temp) - parseInt(total_booked);

            // return true as default, or else it'll show filling fast on all dates.
            return return_val;
        },

        addAvailableDates(ad_key, ad_v, $this, is_full_date) {
            if(typeof(is_full_date) == "undefined")
                $this.available_dates[ad_key].push($this.checkSeatAvailability(moment($this.dateToFullDate(ad_v+' '+$this.schedules[ad_key].from_time, $this.schedules[ad_key].from_date),'dddd LL').format('YYYY-MM-DD'), $this));
            else
                $this.available_dates[ad_key].push($this.checkSeatAvailability(ad_v, $this));
        },

        //  multiday day event
        triggerMultiDay(booking_date, booking_end_date, start_time, end_time){
            return parent.location.hash = `${'/checkout?booking_date='+booking_date+'&booking_end_date='+booking_end_date+'&start_time='+start_time+'&end_time='+end_time}`;
        },

        //  Single day non-repetitive event
        triggerSignleDay() {
            const hash = location.hash;
            if (hash != '#/checkout') {
                parent.location.hash = "/checkout";
            }
        },

        triggerCheckout() {
            const hash = location.hash;
            if(hash){

                const [hash2, query] = hash.split('#')[1].split('?');
                const params = Object.fromEntries(new URLSearchParams(query));

                // hash checkout
                if (hash == '#/checkout')
                    document.getElementById('buy_ticket_btn').click();

                // Query string width date params
                if(hash2 == '/checkout' && Object.keys(params).length > 0)
                    this.selectDates(params.booking_date, params.booking_end_date, params.start_time, params.end_time);
            }
        },

        previousSlide(id){
            let container = document.getElementById(id);
            this.sideScroll(container, 'left', 25, 100, 10);
        },

            nextSlide(id){
            let container = document.getElementById(id);
            this.sideScroll(container, 'right', 25, 100, 10);
        },

        sideScroll(element, direction, speed, distance, step){
            let scrollAmount = 0;
            let slideTimer = setInterval(function(){
                if(direction == 'left'){
                    element.scrollLeft -= step;
                } else {
                    element.scrollLeft += step;
                }
                scrollAmount += step;
                if(scrollAmount >= distance){
                    window.clearInterval(slideTimer);
                }
            }, speed);
        },
        navigateMonth(direction) {
            const newIndex = this.tab_active_index + direction;
            // Ensure the new index is within bounds
            if (newIndex >= 0 && newIndex < this.calculate_months.length) {
                this.tab_active_index = newIndex;
                this.updateDates(); // Trigger date update after changing the index
            }
        },
        updateDates() {
            // Your existing logic to update dates based on tab_active_index
            console.log("Updating dates for index:", this.tab_active_index);
            // Example: Update local_from_date or other date-related logic here
            this.selectDefaultDate();
        },

        selectDefaultDate() {


            const index = this.tab_active_index;

            
            // Validate schedules and dates
            if (
                !this.schedules[index] ||
                !this.selected_dates[index] ||
                this.selected_dates[index].length === 0 ||
                !this.available_dates[index]
            ) {
                console.warn('No valid dates or schedules available for index:', index);
                return; // Exit if no valid data
            }
            
            const today = moment().format('YYYY-MM-DD');
            const previousDay = moment().subtract(1, 'days').format('YYYY-MM-DD');

            // Find the first valid date using find
            const validDateEntry = this.selected_dates[index].find((date, i) => {
                if (!date) {
                    return false; // Skip invalid dates
                }

                const fullDate = moment(this.calculate_months[index] + '-' + date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                const endDateTime = moment(
                    this.calculate_months[index] + '-' + date + ' ' + this.schedules[index].to_time,
                    'YYYY-MM-DD HH:mm:ss'
                ).format('YYYY-MM-DD');

                // Return true if date is valid: not expired, has seats, and end date is not in the past
                return (
                    (fullDate >= today || fullDate === previousDay) &&
                    this.available_dates[index][i] &&
                    endDateTime >= today
                );
            });

            

            // If no valid date is found, exit
            if (!validDateEntry) {
                console.warn('No valid date found for index:', index);
                return;
            }

            // Use the valid date
            const selectedDate = validDateEntry;
            const dateIndex = this.selected_dates[index].indexOf(selectedDate);

            // Select the date using existing selectDates method
            const formattedDate = this.userTimezone1(
                this.calculate_months[index] + '-' + selectedDate + ' ' + this.schedules[index].from_time,
                'YYYY-MM-DD HH:mm:ss'
            )
                .locale('en')
                .format('dddd LL');

            const startTime = this.changeTimeFormat(
                this.userTimezone1(
                    moment(this.schedules[index].from_date).format('YYYY-MM') +
                        '-' +
                        selectedDate +
                        ' ' +
                        this.schedules[index].from_time,
                    'YYYY-MM-DD HH:mm:ss'
                )
                    .locale('en')
                    .format('HH:mm:ss')
            );

            const endTime = this.changeTimeFormat(
                this.userTimezone1(
                    moment(this.schedules[index].to_date).format('YYYY-MM') +
                        '-' +
                        selectedDate +
                        ' ' +
                        this.schedules[index].to_time,
                    'YYYY-MM-DD HH:mm:ss'
                )
                    .locale('en')
                    .format('HH:mm:ss')
            );
            console.log(formattedDate, 'formattedDate');
            console.log(startTime, 'startTime');
            console.log(endTime, 'endTime');
            
            try {
                // If merge_schedule is enabled, also compute the last valid date
                if (this.event && this.event.merge_schedule == 1) {
                    
                    const lastValidIndex = [...this.selected_dates[index]]
                        .map((date, i) => ({ date, i }))
                        .reverse()
                        .find(({ date, i }) => {
                            if (!date) return false;

                            const fullDate = moment(this.calculate_months[index] + '-' + date, 'YYYY-MM-DD').format('YYYY-MM-DD');
                            const endDateTime = moment(
                                this.calculate_months[index] + '-' + date + ' ' + this.schedules[index].to_time,
                                'YYYY-MM-DD HH:mm:ss'
                            ).format('YYYY-MM-DD');

                            return (
                                (fullDate >= today || fullDate === previousDay) &&
                                this.available_dates[index][i] &&
                                endDateTime >= today
                            );
                        });

                    if (lastValidIndex) {
                        const selectedDate = lastValidIndex.date;

                        let formattedEndDate = this.userTimezone1(
                            this.calculate_months[index] + '-' + selectedDate + ' ' + this.schedules[index].from_time,
                            'YYYY-MM-DD HH:mm:ss'
                        ).locale('en').format('dddd LL');
                        
                        if(this.event.repititive_schedule.length > 0) {
                            
                            if(this.event.repititive_schedule[0].repetitive_type == 2) {
                                // Ensure Moment.js uses Sunday as the end of the week
                                moment.updateLocale('en', {
                                    week: {
                                    dow: 1, // Monday as the start of the week
                                    },
                                });
                                // For weekly events, get the last date of the week
                                formattedEndDate = moment(formattedDate+' '+endTime, 'dddd LL')
                                    .endOf('week')
                                    .locale('en')
                                    .format('dddd LL');
                                
                            }
                        
                        }

                
                        this.selectDates(formattedDate, formattedEndDate, startTime, endTime);

                        // Optional: store or use the values as needed
                        // this.lastValidDate = { formattedEndDate, startEndTime, endEndTime };
                    } else {
                        console.warn('No valid last date found for index:', index);
                    }
                } else {
                    // If merge_schedule is not enabled, just select the single date
                    this.selectDates(formattedDate, formattedDate, startTime, endTime);
                }
            } catch (error) {
                console.error('Error selecting date:', error);
                this.selectDates(formattedDate, formattedDate, startTime, endTime);
            }
            
        },

        singleDefaultDate() {

            const endDateTime = moment( this.event.end_date, 'YYYY-MM-DD').format('YYYY-MM-DD');
            const today = moment().format('YYYY-MM-DD');

            // Return true if date is valid: not expired, has seats, and end date is not in the past
            
            if(endDateTime < today)
                return ;

            this.singleEvent();
        }
    
    },
    mounted() {
        var local_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if(this.event.repetitive > 0)
            this.getEventSchedule();

        //CUSTOM
        // this.setSalePrice();
        //CUSTOM

        this.triggerCheckout();
        this.singleDefaultDate();        

    },
}
</script>
    
<style scoped>
    .custom-select {
        border: 1px solid #d1e7e7;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 16px;
        background-color: #f5fafa;
        text-align: center;
        width: 150px; /* Adjust width as needed */
        appearance: none; /* Remove default dropdown arrow */
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    
    .arrow-btn {
        background: none;
        border: none;
        font-size: 16px;
        padding: 5px 10px;
        cursor: pointer;
        color: #333;
    }
    
    
    .bg-dark.text-white {
        background-color: #000 !important; /* Bootstrap's bg-dark color */
        color: #ffffff !important;
    }
    
    .bg-dark.text-white .text-dark,
    .bg-dark.text-white .text-primary,
    .bg-dark.text-white .text-xs,
    .bg-dark.text-white .h5,
    .bg-dark.text-white .badge {
        color: #ffffff !important; /* Ensure all text is white */
    }
    
    .bg-dark.text-white .badge.bg-light {
        background-color: #6c757d !important; /* Adjust badge background for contrast */
        color: #ffffff !important;
    }
    /* Target the schedule-info card that matches the selected booking_date */
    .schedule-info[data-selected="true"] {
        background-color: #2276ff !important; /* Matches .bg-dark */
        color: #2276ff !important; /* Matches .text-white */
        border: 2px solid #2276FF !important;
    }

    .schedule-info[data-selected="true"] .text-dark,
    .schedule-info[data-selected="true"] .text-primary,
    .schedule-info[data-selected="true"] .text-xs,
    .schedule-info[data-selected="true"] .h5,
    .schedule-info[data-selected="true"] .badge {
        color: #ffffff !important; /* Ensure all text is white */
    }
    
    .schedule-info[data-selected="true"] .badge.bg-light {
        background-color: #6c757d !important; /* Adjust badge background for contrast */
        color: #ffffff !important;
    }
</style>