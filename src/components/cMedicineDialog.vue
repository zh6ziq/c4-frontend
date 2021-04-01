<template>
  <q-dialog v-model="show" persistent>
    <q-card class=" q-gutter-y-sm" style="width: 500px; max-width: 80vw;">
      <q-card-section class="row q-py-none">
        <q-item class="items-center">
          <q-item-label class="text-body1 text-weight-medium">Drug Information</q-item-label>
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
            v-model="form.volume"
            outlined
            label="Volume/Mass"
            dense
          />
        </q-item>

        <q-item class="column">
          <q-input
            v-model="form.usage"
            outlined
            label="Usage"
            dense
          />
        </q-item>

        <q-item class="column">
          <q-select
            v-model="form.category"
            outlined label="Category"
            dense
            :options="categoryOpts"
          />
        </q-item>

        <q-item class="column">
          <q-select
            v-model="form.status"
            outlined label="Status"
            dense
            :options="statusOpts"
          />
        </q-item>

        <q-item class="column">
          <q-input
            v-model="form.expDate"
            outlined
            label="Expiry Date"
            dense
          >
            <template v-slot:append>
              <q-icon name="event">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.expDate" mask="DD MMM YYYY">
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
    medicine: {
      type: Object,
      require: false
    }
  },

  data () {
    return {
      categoryOpts: [
        'BIOLOGICAL',
        'HEALTH SUPPLEMENT',
        'NEW CHEMICAL ENTITY',
        'PRESCRIPTION',
        'SCHEDULE POISON',
        'VACCINES'
      ],
      statusOpts: [
        'NEW PRODUCT',
        'RENEWAL'
      ],
      form: {
        name: '',
        category: '',
        expDate: '',
        volume: '',
        status: '',
        usage: ''
      },
      isEdit: false
    }
  },

  watch: {
    medicine(value) {
      if(value.id) {
        const { id, name, usage, expDate, status, category, volume } = { ...value }
        this.form = { id, name, usage, expDate, status, category, volume }
        this.isEdit = true
      } else {
        this.form = {
          name: '',
          category: '',
          expDate: '',
          volume: '',
          status: '',
          usage: ''
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
      if(!this.form.name || !this.form.category || !this.form.expDate || !this.form.volume || !this.form.status || !this.form.usage) {
        this.$q.notify({
          type: 'warning',
          message: 'Please fill in all the fields',
          position: 'top',
          timeout: 2000
        })
        return
      }

      if(!this.isEdit) {
        this.$http.post('medicines', this.form)
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

        this.$http.patch(`medicines/${id}`, this.form)
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
        category: '',
        expDate: '',
        volume: '',
        status: '',
        usage: ''
      }
    }
  }
}
</script>
