<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <q-card flat>
          <q-card-section class="text-h6">
            <q-item-label>Contact Us</q-item-label>
          </q-card-section>

          <q-card-section class="q-gutter-y-sm">
            <q-item-label>Make a new appointment</q-item-label>
            <q-btn label="Book Now" no-caps @click="dialog.user = true" color="primary" />
          </q-card-section>


          <q-card-section class="q-gutter-y-sm">
            <q-item-label>Already made an appointment? Check your appoinment here.</q-item-label>
            <q-btn label="Check Appointment" no-caps @click="checkAppointment = true" color="positive" />
          </q-card-section>

          <q-card-section v-if="checkAppointment" class="q-gutter-y-sm">
            <q-item class="q-gutter-x-md">
              <q-input v-model="form.phone" outlined dense placeholder="Enter your phone number" class="col-3" />
              <q-btn label="Search" no-caps @click="onClickSearch" color="positive" />
            </q-item>
            
            <q-item class="row">
              <q-markup-table class="col-6">
                <thead>
                  <tr>
                    <th colspan="5">
                      <div class="row no-wrap items-center">
                        <div class="text-body1 q-ml-md">My Appointment(s)</div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Appointment Date</th>
                    <th>Service</th>
                  </tr>
                </thead>
                <tbody v-for="(appt, index) in appointments" :key="index" class="text-center">
                  <td>{{ appt.name }}</td>
                  <td>{{ appt.phone }}</td>
                  <td>{{ date.formatDate(appt.date, 'DD MMM YYYY') }}</td>
                  <td>{{ appt.service }}</td>
                </tbody>
              </q-markup-table>
            </q-item>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <c-user-dialog :show.sync="dialog.user" @update:show="dialog.user = false" />
  </q-page>
</template>

<script>
import cUserDialog from '../components/cUserDialog.vue'
import { date } from 'quasar'

export default {
  components: { cUserDialog },
  data() {
    return {
      date: date,
      dialog: {
        user: false
      },
      checkAppointment: false,
      form: {
        phone: ''
      },
      appointments: []
    }
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    getUsers() {
      this.$http.get('users')
        .catch(err => {
          console.log(err)
        })
    },
    onClickSearch() {
      let phone = this.form.phone
      console.log(phone)

      if(!phone) {
        this.$q.notify({
          type: 'warning',
          message: 'Please enter your phone number',
          position: 'top',
          timeout: 2000
        })
        return
      }

      this.$http.get(`users/search/${phone}`)
        .then(res => {
          if(!res.data.length) {
            this.$q.notify({
              type: 'negative',
              message: 'Phone number not found',
              position: 'top',
              timeout: 2000
            })
            return
          } else {
            this.appointments = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
