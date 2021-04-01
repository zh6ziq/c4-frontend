<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-info">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>Admin</q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Klinik Meow</q-item-label>
        <q-item clickable tag="a" href="/admin">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="/patients">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Patient</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="/appointment">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Appointment</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="/medicine">
          <q-item-section avatar>
            <q-icon name="medication" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Medicine</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "LayoutDefault",

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style></style>
