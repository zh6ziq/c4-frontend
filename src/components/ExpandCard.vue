<template>
  <q-card flat bordered>
    <q-img
      src="http://placekitten.com/400/500"
    />

    <q-card-section>
      <div class="text-h6 q-mt-sm q-mb-xs">{{ title }}</div>
      <div class="text-caption text-grey">
        {{ desc }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ text }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      expanded: false
    }
  },
}
</script>