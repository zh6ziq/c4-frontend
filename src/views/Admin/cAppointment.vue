<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <q-card flat>
          <q-card-section>
            <q-item-label class="text-h6">List of Appointments</q-item-label>
          </q-card-section>
          <q-card-section class="q-gutter-y-sm">
            <q-item class="row">
              <q-markup-table class="col-8">
                <thead>
                  <tr>
                    <th colspan="8">
                      <div class="row no-wrap justify-end">
                        <q-input dense v-model="form.phone" placeholder="Enter phone number">
                          <template v-slot:append>
                            <q-icon name="search" class="cursor-pointer" @click="onClickSearch" />
                          </template>
                        </q-input>
                        <q-space />
                        <q-card-actions>
                          <q-btn
                            flat
                            round
                            icon="refresh"
                            color="positive"
                            @click="getUsers"
                          />
                          <q-btn
                            icon="add"
                            label="Add Appointment"
                            color="primary"
                            no-caps
                            @click="dialog.appt.show = true"
                          />
                        </q-card-actions>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Appointment Date</th>
                    <th>Service</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody v-for="(appt, index) in appointments" :key="index" class="text-center">
                  <td>{{ appt.name }}</td>
                  <td>{{ appt.phone }}</td>
                  <td>{{ date.formatDate(appt.date, 'DD MMM YYYY') }}</td>
                  <td>{{ appt.service }}</td>
                  <td>{{ appt.remarks }}</td>
                  <td>
                    <q-card-actions align="center">
                      <q-btn
                        flat
                        round
                        icon="edit"
                        color="info"
                        @click="onHandleClickEdit(appt)"
                      />
                      <q-btn
                        flat
                        round
                        icon="delete"
                        color="negative"
                        @click="onHandleClickDelete(appt)"
                      />
                    </q-card-actions>
                  </td>
                </tbody>
              </q-markup-table>
            </q-item>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <c-user-dialog
      :show.sync="dialog.appt.show"
      @update:show="dialog.appt.show = false"
      :appointment.sync="dialog.appt.selectedAppt"
      @get="getUsers"
    />
  </q-page>
</template>

<script>
import cUserDialog from './../../components/cUserDialog'
import { date } from 'quasar'

export default {
  components: { cUserDialog },
  data() {
    return {
      date: date,
      appointments: [],
      form: {
        phone: ''
      },
      dialog: {
        appt: {
          show: false,
          selectedAppt: {}
        }
      }
    }
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    getUsers() {
      this.$http.get('users')
        .then(res => {
          this.appointments = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    onClickSearch() {
      let phone = this.form.phone

      if(!phone) {
        this.$q.notify({
          type: 'warning',
          message: 'Please enter phone number',
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
            this.form = {
              phone: ''
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onHandleClickEdit(appt) {
      let dt = {}
      dt.id = appt.id

      this.$http.get(`users/${dt.id}`)
        .then(res => {
          this.dialog.appt.selectedAppt = res.data[0]
          this.dialog.appt.show = true
        })
        .catch(err => {
          console.log(err)
        })
    },

    onHandleClickDelete(appt) {
      let dt = {}
      dt.id = appt.id

      this.$http.delete(`users/${dt.id}`)
        .then(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Deleted',
            position: 'top',
            timeout: 2000
          })
          this.getUsers()
        })
        .catch(err => {
          console.log(err)
        })

    }
  }
}
</script>
