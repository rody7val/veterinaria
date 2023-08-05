<template>
  <div>
    <div class="col-12 q-px-md bg-grey-3">
      <q-toggle
        v-model="$store.state.toggle"
        :icon="$store.state.toggle ? 'watch_later' : 'calendar_month'"
        :label="$store.state.toggle ? 'Solo pendientes' : 'Todo'"
        color="accent"
        size="lg"
      />
      <!--search date-->
      <q-input
        ref="date"
        style="max-width: 450px;"
        v-model="getDate"
        color="accent"
        label="Fecha"
        filled
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer" color="accent">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date
                color="accent"
                v-model="$store.state.date"
                :locale="$store.state.localeEsp"
                mask="DD/MM/YYYY" 
                range
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="ok"
                    color="pink"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-if="!$store.state.toggle" v-slot:after>
          <q-chip dense>
            <q-avatar
              size="sm"
              :color="`${getEventosByRangeDate.filter(item=>!item.task).length > 0
                ? 'teal'
                : 'pink'
              }`"
              text-color="white"
            >{{`${getEventosByRangeDate.filter(item=>!item.task).length > 0
              ? getEventosByRangeDate.filter(item=>!item.task).length
              : 0
            }`}}</q-avatar>
            Turnos
          </q-chip>

          <q-chip dense>
            <q-avatar
              size="sm"
              :color="`${getEventosByRangeDate.filter(item=>item.task).length > 0
                ? 'teal'
                : 'pink'
              }`"
              text-color="white"
            >{{`${getEventosByRangeDate.filter(item=>item.task).length > 0
              ? getEventosByRangeDate.filter(item=>item.task).length
              : 0
            }`}}</q-avatar>
            Tareas
          </q-chip>          
        </template>

        <template v-else v-slot:after>
          <q-chip dense>
            <q-avatar
              size="sm"
              :color="`${getEventosByRangeDateOnlyPending.filter(item=>!item.task).length > 0
                ? 'teal'
                : 'pink'
              }`"
              text-color="white"
            >{{`${getEventosByRangeDateOnlyPending.filter(item=>!item.task).length > 0
              ? getEventosByRangeDateOnlyPending.filter(item=>!item.task).length
              : 0
            }`}}</q-avatar>
            Turnos
          </q-chip>

          <q-chip dense>
            <q-avatar
              size="sm"
              :color="`${getEventosByRangeDateOnlyPending.filter(item=>item.task).length > 0
                ? 'teal'
                : 'pink'
              }`"
              text-color="white"
            >{{`${getEventosByRangeDateOnlyPending.filter(item=>item.task).length > 0
              ? getEventosByRangeDateOnlyPending.filter(item=>item.task).length 
              : 0
            }`}}</q-avatar>
            Tareas
          </q-chip>
        </template>
      </q-input>
    </div>
    <!-- fullCalendar -->
    <div class="col-12 q-pa-md bg-grey-2" v-if="eventos >= 0">
      <FullCalendar
        v-if="getEventosByRangeDate.length >= 0"
        ref="fullCalendar"
        class='demo-app-calendar'
        :options='config'
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <div v-else class="text-center q-mt-lg">Sin datos</div>

      <!-- modals form -->
      <q-dialog v-model="$store.state.modalEvents">
        <newEvento
          v-if="$store.state.formEvents === 'newEvento'"
          :fullCalendar="$refs.fullCalendar"
          title="Nuevo Evento"
        />
      </q-dialog>

      <!-- modals confirm -->
      <q-dialog v-model="$store.state.modal">
        <deleteEvento
          v-if="$store.state.form === 'deleteEvento'"
          :fullCalendar="$refs.fullCalendar"
          title="Eliminar Evento"
        />
      </q-dialog>
    </div>
    <div v-else-if="eventos"></div>
    <div v-else class="text-center q-my-lg">
      <q-spinner
        color="accent"
        size="2em"
      />
      cargando...
    </div>
  </div>
</template>

<style lang="css">
.fc-button-primary{
  background: #9c27b0 !important;
  border-color: #9c27b0 !important;
}
.fc-button-active{
  background: #7b1fa2 !important;
  border-color: #7b1fa2 !important;
}
.fc-view{
  background: white
}
/*
.fc-h-event, .fc-v-event, .fc-list-event-dot {
  border-color: #9c27b0!important;
  background-color: #9c27b0!important;
}*/
.fc-header-toolbar{
  margin-bottom: 12px!important;
}
.fc .fc-toolbar-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
  color: var(--q-color-accent) !important;
  text-transform: uppercase;
}
@media (max-width: 670px) {
  /*
  */
  .fc .fc-toolbar.fc-header-toolbar {
    display: block;
    text-align: center;
  }
  .fc .fc-button {
    padding: 4px !important;
  }
}
</style>

<script>
import { /*mapState, mapActions,*/ mapGetters } from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
//forms eventos
import newEvento from 'components/forms/newEvento'
//import viewEvento from 'components/forms/viewEvento'
//import editEvento from 'components/forms/editEvento'
import deleteEvento from 'components/forms/deleteEvento'

export default {
  components: {
    newEvento,
    deleteEvento,
    FullCalendar,
  },

  computed: {
    ...mapGetters([
    	'eventos',
    	'getEventosByRangeDate',
    	'getEventosByRangeDateOnlyPending',
    ]),

    config() {
      return {
        ...this.configOptions,
        ...this.eventHandlers
      }
    },

    configOptions () {
      return {
        locale: esLocale,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          listPlugin
        ],
        headerToolbar: {
          left: 'title',
          center: 'prev,next today',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
        },
        slotDuration: '00:15:00',
        slotLabelFormat:{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        events: this.$store.state.toggle ? this.getEventosByRangeDateOnlyPending : this.getEventosByRangeDate,
        eventColor: '#26a69a',
        //initialeventos: this.eventos,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        initialView: 'timeGridWeek',
      }
    },

    eventHandlers () {
      return {
        select: this.onDateSelect,
        eventClick: this.onEventClick,
        //dateClick: this.onDateClick,
        eventDrop: this.onEventDrop,
        eventResize: this.onEventDrop,
        //eventAdd: this.setEventFirestore,
        //eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventChange: 
        eventRemove:
        */
      }
    },

    getDate() {
      //goToDate()
      if (this.$store.state.date &&
        this.$store.state.date.from &&
        this.$store.state.date.from.length > 0
      ) {
        if (this.$refs.fullCalendar && this.$refs.fullCalendar.getApi) {
          this.$refs.fullCalendar.getApi().gotoDate(
            new Date( this.$store.state.date.from.split("/").reverse().join("/") )
          )
        }
        return `${this.$store.state.date.from} - ${this.$store.state.date.to}`
      }
      return "Selecciona un rango"
    },
  },

  methods: {
    //promise constructor
    setEvent(payload) {
      return new Promise((resolve, reject) => {
        if (!payload) reject(false)
        let date
        let timeStart = "00:00"
        let timeEnd = "00:00"
        if (payload.allDay) {
          date = payload.startStr.split("-").reverse().join("-") // DD-MM-AAAA
        } else {
          date = payload.startStr.replace(/T.*$/, '').split("-").reverse().join("-") // DD-MM-AAAA
          timeStart = payload.startStr.slice(11, 16) // HH:mm
          timeEnd = payload.endStr.slice(11, 16) // HH:mm
        }
        var event = {
          id: payload.id || String( Date.now() ),
          title: payload.title || '',
          task: payload.task || false,
          allDay: payload.allDay,
          start: typeof payload.start === 'object' ?
            new Date(payload.start).toISOString() :
            payload.start,            // ISO8601
          end: typeof payload.end === 'object' ?
            new Date(payload.end).toISOString() :
            payload.end,              // ISO8601
          startStr: payload.startStr, // AAAA-MM-DD[T]HH:mm:ss-HH:mm || AAAA-MM-DD
          endStr: payload.endStr,     // AAAA-MM-DD[T]HH:mm:ss-HH:mm || AAAA-MM-DD
          date: date,                 // DD-MM-AAAA
          timeStart: timeStart,       // HH-mm
          timeEnd: timeEnd,           // HH-mm
          sucursal: 'pigue',
          desc: payload.desc || '',
          timeText: payload.timeText || '',
        }
        resolve(event)
      })
    },
    // select
    onDateSelect (payload) {
      //this.newEvent = !this.newEvent
      this.$refs.fullCalendar.getApi().unselect()
      this.setEvent(payload).then((evento) => {
        if (!evento) return false
        this.$refs.fullCalendar.getApi().addEvent(evento)
        //view new event form
        this.$store.commit('setModalEvents', !this.$store.state.modalEvents)
        this.$store.commit('setFormEvents', 'newEvento')
        this.$store.commit('setEvento', evento)
      })
    },
    // click
    onEventClick(payload) {
      this.setEvent(this.$store.state.eventos.data[payload.event.id]).then((evento) => {
        if (!evento) return false
        //view/edit event form
        this.$store.commit('setEdit', true)
        this.$store.commit('setModalEvents', !this.$store.state.modalEvents)
        this.$store.commit('setFormEvents', 'newEvento')
        this.$store.commit('setEvento', evento)
      })
    },
    // drop
    onEventDrop(payload) {
      this.$store.dispatch('eventos/set', {
        id: payload.event.id,
        allDay: payload.event.allDay,
        start: new Date(payload.event.start).toISOString(),
        end: new Date(payload.event.end).toISOString(),
        startStr: payload.event.startStr,
        endStr: payload.event.endStr
      })
    },
  },
}
</script>