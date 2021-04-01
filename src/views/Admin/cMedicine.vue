<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <q-card flat>
          <q-card-section>
            <q-item-label class="text-h6">List of Drugs</q-item-label>
          </q-card-section>
          <q-card-section class="q-gutter-y-sm">
            <q-item class="row">
              <q-markup-table class="col-10">
                <thead>
                  <tr>
                    <th colspan="8">
                      <div class="row no-wrap justify-end">
                        <q-input dense v-model="form.name" placeholder="Enter drug name">
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
                            @click="getDrugs"
                          />
                          <q-btn
                            icon="add"
                            label="Add Drug"
                            color="primary"
                            no-caps
                            @click="dialog.drug.show = true"
                          />
                        </q-card-actions>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <th>Usage</th>
                    <th>Volume/Mass Intake</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Expiry Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody v-for="(drug, index) in drugs" :key="index" class="text-center">
                  <td>{{ drug.name }}</td>
                  <td>{{ drug.usage }}</td>
                  <td>{{ drug.volume }}</td>
                  <td>{{ drug.category }}</td>
                  <td>{{ drug.status }}</td>
                  <td>{{ date.formatDate(drug.expDate, 'DD MMM YYYY') }}</td>
                  <td>
                    <q-card-actions align="center">
                      <q-btn
                        flat
                        round
                        icon="edit"
                        color="info"
                        @click="onHandleClickEdit(drug)"
                      />
                      <q-btn
                        flat
                        round
                        icon="delete"
                        color="negative"
                        @click="onHandleClickDelete(drug)"
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

    <c-medicine-dialog
      :show.sync="dialog.drug.show"
      @update:show="dialog.drug.show = false"
      :medicine.sync="dialog.drug.selectedDrug"
      @get="getDrugs"
    />
  </q-page>
</template>

<script>
import cMedicineDialog from './../../components/cMedicineDialog'
import { date } from 'quasar'

export default {
  components: { cMedicineDialog },
  data() {
    return {
      date: date,
      drugs: [],
      form: {
        name: ''
      },
      dialog: {
        drug: {
          show: false,
          selectedDrug: {}
        }
      }
    }
  },

  mounted() {
    this.getDrugs()
  },

  methods: {
    getDrugs() {
      this.$http.get('medicines')
        .then(res => {
          this.drugs = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    onClickSearch() {
      let name = this.form.name

      if(!name) {
        this.$q.notify({
          type: 'warning',
          message: 'Please enter drug name',
          position: 'top',
          timeout: 2000
        })
        return
      }

      this.$http.get(`medicines/search/${name}`)
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
            this.drugs = res.data
            this.form = {
              name: ''
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onHandleClickEdit(drug) {
      let dt = {}
      dt.id = drug.id
      console.log(dt.id)

      this.$http.get(`medicines/${dt.id}`)
        .then(res => {
          this.dialog.drug.selectedDrug = res.data[0]
          this.dialog.drug.show = true
        })
        .catch(err => {
          console.log(err)
        })
    },

    onHandleClickDelete(drug) {
      let dt = {}
      dt.id = drug.id

      this.$http.delete(`medicines/${dt.id}`)
        .then(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Deleted',
            position: 'top',
            timeout: 2000
          })
          this.getDrugs()
        })
        .catch(err => {
          console.log(err)
        })

    }
  }
}
</script>
