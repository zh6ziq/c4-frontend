<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <q-card flat>
          <q-card-section>
            <q-item-label class="text-h6">List of Patients</q-item-label>
          </q-card-section>

          <q-card-section class="q-gutter-y-sm">
            <q-item class="row">
              <q-markup-table class="col-6">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody v-for="(user, index) in clinicUsers" :key="index" class="text-center">
                  <td>{{ user.name }}</td>
                  <td>{{ user.phone }}</td>
                </tbody>
              </q-markup-table>
            </q-item>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      clinicUsers: []
    }
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    getUsers() {
      this.$http.get('users')
        .then(res => {
          this.clinicUsers = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
