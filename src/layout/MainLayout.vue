<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>Meow Meow</q-toolbar-title>

        <div>
          <q-tabs shrink>
            <q-route-tab name="tab1" label="Home" to="/" />
            <q-route-tab name="tab2" label="Contact" to="/contact" />
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />

      <q-footer>
        <q-card square class="bg-dark">
          <q-card-section class="flex flex-center">
            <q-item-label>This is footer Meow Meow</q-item-label>
          </q-card-section>
        </q-card>
      </q-footer>
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
