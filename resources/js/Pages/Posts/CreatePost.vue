<script setup>
import Toast from 'primevue/toast'
import InputError from '@/Components/InputError.vue';
import usePosts from '@/composables/posts/usePosts';

 defineProps({
    errors:Object 
})

const {
    form,
    visibleCreatePost,
    urlPreview,
    savePost,
    previewImage, 
} = usePosts();


</script>

<template>
    <div class="flex justify-end my-2">
        <Button severity="contrast" outlined @click="visibleCreatePost = true" label="Create Post"/>
    </div>
     <!-- Add dialog -->
     <Dialog class="bg-white"  v-model:visible="visibleCreatePost" header="Create a Post" :style="{ width: '25rem' }">

        <form @submit.prevent="savePost" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="title">Title</label>
                    <InputText type="text" id="title" class="w-full" v-model="form.title" />
                    <InputError class="text-red-400 my-4"  :message="form.errors.title "/>

            </div>

            <div class="mb-3">
                    <label for="description">Description</label>
                    <Textarea type="text" v-model="form.description" class="w-full" rows="5" cols="30" />
                    
                    <InputError class="text-red-400 my-4"   :message="form.errors.description"/>

            </div>
            <div class="mb-3">
                    <label for="file">Image</label>
                    <FileUpload mode="basic" class="w-full"  @input="previewImage"  accept='image/*' :maxFileSize="1000000" />
                    <InputError class="text-red-400 my-4"   :message="form.errors.image"/>
                        <div v-if="urlPreview">
                            <img :src="urlPreview" class="h-32  object-cover rounded-sm my-2 w-full" alt="">

                        </div>
                    
            </div>

            
            <div class="flex justify-content-end gap-2 mt-2">

                <Button type="submit" severity="success"  label="Save" />
                <Button type="button" outlined severity="secondary"   label="Cancel" @click="visibleCreatePost = false"/>
            </div>
        </form>
</Dialog>
<!-- Add dialog -->
<Toast/>
</template>



<style>

</style>