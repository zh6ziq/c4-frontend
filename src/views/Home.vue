<template>
  <q-page>
    <q-card>
      <q-card-section class="text-h2 flex flex-center">
        <q-item-label>Welcome to Meow Meow</q-item-label>
      </q-card-section>
    </q-card>
    
    <carousel />

    <q-card flat class="row justify-evenly">
      <q-card-section class="col-3">
        <expand-card title="Doctors" :desc="desc" text="List of doctors" />
      </q-card-section>

      <q-card-section class="col-3">
        <expand-card title="View Our Cats" :desc="desc" text="View of cats" />
      </q-card-section>

      <q-card-section class="col-3">
        <expand-card title="Our Facalities" :desc="desc" text="List of facalities" />
      </q-card-section>
    </q-card>

    <q-card flat class="row justify-evenly">
      <q-card-section class="column">
        <q-item>Need an Appointment?</q-item>
        <q-btn flat no-caps label="Contact Us" to="/contact" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel.vue';
import ExpandCard from '../components/ExpandCard.vue';

export default {
  name: "Home",
  components: {
    Carousel,
    ExpandCard
  },

  data () {
    return {
      expanded: false,
      text: 'Hello',
      subtitle: 'Card Subtitle',
      title: 'Card Title',
      desc: 'Card Description'
    }
  }
}
</script>
