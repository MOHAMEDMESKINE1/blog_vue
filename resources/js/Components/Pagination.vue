<template>
    <div v-if="links.length > 3">
      <div class="flex flex-wrap -mb-1 my-5 text-gray-50  justify-center">
        <template v-for="(link, k) in links" :key="k">
          <div v-if="link.url === null"  class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-50 border rounded" v-html="link.label" />
          <Link v-else class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500" :class="{ 'bg-blue-700 text-white': link.active }" :href="link.url" v-html="link.label" />
        </template>
      </div>
    </div>
  </template>
    
  <script>
  import {Link} from "@inertiajs/vue3";
  export default {
    props: {
      links: Array,
    },
    components : {
    Link
  }
  }
  </script> 