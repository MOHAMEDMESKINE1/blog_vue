<template>
  <AuthenticatedLayout>
    <div class="container mx-auto ">
      <Card class="bg-gray-50 text-gray-950 m-5  shadow-lg">
        <template #header>
            <img alt="user header" class="w-32 mx-auto mt-5" src="/storage/logo/vuelogo.svg" />

        </template>
        <template #title> {{ post.title }}</template> 
       
         <template #content>
               <p class="m-0">
                    {{ post.description }}
               </p>
         </template>
      </Card>
    </div>
</AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
defineProps({
  post:Object
})
</script>

<style>

</style>