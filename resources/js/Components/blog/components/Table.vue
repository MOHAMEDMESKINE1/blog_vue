


<template>
    <div>
        
      <table class="w-full rounded-md overflow-hidden shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               
                <tr>
                    <th v-for="(header, index) in headers" :key="index" class="px-6 py-3">
                        {{ header }}
                    </th>
                </tr>  
            </thead>
            <tbody  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <slot/>
            </tbody>
       </table>
    </div>
    </template>
<script setup>
    defineProps({
        headers:Array,
        fields:Array
    })
</script>