<template>
  <q-dialog v-model="show" persistent>
    <q-card class=" q-gutter-y-sm" style="width: 500px; max-width: 80vw;">
      <q-card-section class="row q-py-none">
        <q-item class="items-center">
          <q-item-label class="text-body1 text-weight-medium">Patient Information</q-item-label>
        </q-item>
        <q-space />
        <q-btn icon="close" round flat @click="onClickClose" />
      </q-card-section>

      <q-card-section>
        <q-item class="column">
          <q-input
            v-model="form.name"
            outlined
            label="Name"
            dense
          />
        </q-item>
        
        <q-item class="column">
          <q-input
            v-model="form.phone"
            outlined
            label="Phone No"
            dense
          />
        </q-item>

        <q-item class="column">
          <q-input
            v-model="form.date"
            outlined
            label="Appointment Date"
            dense
          >
            <template v-slot:append>
              <q-icon name="event">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.date" mask="DD MMM YYYY">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat  v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item>

        <q-item class="column">
          <q-select
            v-model="form.service"
            outlined label="Services"
            dense
            :options="servicesOpts"
          />
        </q-item>

        <q-item class="column">
          <q-input
            v-model="form.remarks"
            outlined
            label="Additional Information"
            dense
            type="textarea"
            placeholder="Any symptoms.."
          />
        </q-item>
      </q-card-section>

      <q-card-actions align="center" class="q-ma-md">
        <q-btn label="Submit" no-caps class="col-3" color="primary" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    appointment: {
      type: Object,
      require: false
    }
  },

  data () {
    return {
      servicesOpts: [
        'Consultation',
        'Cosmetic Dental Treatment',
        'Crown & Brigdes / Dentures',
        'Dental X-Rays',
        'General dental treatment (Scaling / Fillings)',
        'Implants',
        'Orthodontics / Braces',
        'Preventive dental treatment',
        'Wisdom Teeth Removal'
      ],
      form: {
        name: '',
        phone: '',
        date: '',
        service: '',
        remarks: ''
      },
      isEdit: false
    }
  },

  watch: {
    appointment(value) {
      if(value.id) {
        const { id, name, phone, date, service, remarks } = { ...value }
        this.form = { id, name, phone, date, service, remarks }
        this.isEdit = true
      } else {
        this.form = {
          name: '',
          phone: '',
          date: '',
          service: '',
          remarks: ''
        }
        this.isEdit = false
      }
    }
  },

  methods: {
    onClickClose() {
      this.resetform()
      this.$emit('update:show', false)
    },
    submit() {
      if(!this.form.name || !this.form.phone || !this.form.date || !this.form.service) {
        this.$q.notify({
          type: 'warning',
          message: 'Please fill in all the fields',
          position: 'top',
          timeout: 2000
        })
        return
      }

      if(!this.isEdit) {
        this.$http.post('users', this.form)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Submitted',
            position: 'top',
            timeout: 2000
          })
          this.resetform()
          this.$emit('get')
          this.$emit('update:show', false)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        let id = this.form.id

        this.$http.patch(`users/${id}`, this.form)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Updated',
            position: 'top',
            timeout: 2000
          })
          this.resetform()
          this.$emit('get')
          this.$emit('update:show', false)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },

    resetform() {
      this.form = {
        name: '',
        phone: '',
        date: '',
        service: '',
        remarks: ''
      }
    }
  }
}
</script>
