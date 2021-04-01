<template>
  <q-card flat>
    <q-card-section>
      <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      infinite
      :autoplay="true"
      height="500px"
      class="text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center" :img-src="img1">
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center" :img-src="img2">
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center" :img-src="img3">
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "HelloWorld",
  data () {
    return {
      slide: 1,
      lorem: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Itaque voluptatem totam, architecto cupiditate officia rerum,
        error dignissimos praesentium libero ab nemo.`,
      img1: 'http://placekitten.com/1400/400',
      img2: 'https://picsum.photos/id/10/1400/400',
      img3: 'https://picsum.photos/id/92/1400/400'
    }
  } 
};
</script>
