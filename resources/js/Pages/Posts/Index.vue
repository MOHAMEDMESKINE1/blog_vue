
<script setup>
import { Link } from '@inertiajs/inertia-vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import Table from '@/Components/blog/components/Table.vue';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';
import InputError from '@/Components/InputError.vue';
import usePosts from '@/composables/posts/usePosts';


defineProps ({
    posts: Object,
    errors:Object
})

const {
    form,
    visibleCreatePost,
    visibleEditPost,
    visibleDetailPost,
    isEditMode,
    isDetailMode,
    urlPreview,
    getDetailPost,
    savePost,
    previewImage,
    deletePost,
    openEditModal,
    updatePost,
    resetEditForm,
    resetCreateForm
} = usePosts();

</script>

<template>
   <AuthenticatedLayout>
    <div class=" text-white p-5 rounded-sm shadow-sm card m-12" >
        
        <Toast/>

        <ConfirmDialog/>
        
            <!-- <CreatePost/> -->
            <div class="flex justify-end my-2">
                <Button severity="contrast" outlined @click="visibleCreatePost = true" label="Create Post"/>
            </div> 
            <!-- Add dialog -->
             <Dialog class="bg-white"  v-model:visible="visibleCreatePost" header="Create a Post" :style="{ width: '30rem' }">

                <form @submit.prevent="savePost" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="title">Title</label>
                            <InputText type="text" id="title" class="w-full" v-model="form.title" />
                            <InputError class="text-red-400 my-4" :message="errors.title"/>

                    </div>

                    <div class="mb-3">
                            <label for="description">Description</label>
                            <Textarea type="text" v-model="form.description" class="w-full" rows="5" cols="30" />
                            
                            <InputError class="text-red-400 my-4" :message="errors.description"/>

                    </div>
                    <div class="mb-3">
                            <label for="file">Image</label>
                            <FileUpload mode="basic" class="w-full"  @input="previewImage"  accept='image/*' :maxFileSize="1000000" />
                            <InputError class="text-red-400 my-4" :message="errors.image"/>
                                <div v-if="urlPreview">
                                    <img :src="urlPreview" class="h-32  object-cover rounded-sm my-2 w-full" alt="">

                                </div>
                            
                    </div>

                    
                    <div class="flex justify-content-end gap-2 mt-2">

                        <Button type="submit" severity="success"  label="Save" />
                        <Button type="button" outlined severity="secondary"   label="Cancel" @click="resetCreateForm"/>
                    </div>
                </form>
            </Dialog>
            <!-- Add dialog--->

            <!-- Edit dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleEditPost" header="Edit  Post" :style="{ width: '30rem' }">

                <form @submit.prevent="updatePost " enctype="multipart/form-data">
                    <div class="mb-3">
                            <label for="title">Title</label>
                            <InputText type="text" id="title" class="w-full" v-model="form.title" />
                        
                            <InputError class="text-red-400 my-4" :message="errors.title"/>

                    </div>

                    <div class="mb-3">
                            <label for="description">Description</label>
                            <Textarea type="text" v-model="form.description" class="w-full" rows="5" cols="30" />
                            
                            <InputError class="text-red-400 my-4" :message="errors.description"/>

                    </div>
                    <div class="mb-3">
                            <label for="file">Image</label>
                            <FileUpload mode="basic" class="w-full"  @input="previewImage"   />

                            <div v-if="form.image">
                                <img :src="'storage/posts/' + form.image" class="h-32 object-cover rounded-sm my-2 w-full" alt="">
                            </div>
                            <div v-else>

                                <img :src="urlPreview" class="h-32 object-cover rounded-sm my-2 w-full" alt="">

                            </div>
                          
                        </div>

                    
                        <div class="flex justify-content-end gap-2 mt-2">

                            <Button type="submit" :disabled="form.processing" severity="success"  label="Save" />
                            <Button type="button" outlined severity="secondary"   label="Cancel" @click="resetEditForm"/>
                        </div>
                </form>
            </Dialog>
             <!-- Edit dialog -->

            <!-- Detail Post -->
            <Dialog v-model:visible="visibleDetailPost" modal :header="form.title" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <div class="flex justify-center">
                    <img class="h-auto max-w-full rounded-lg" :src="'storage/posts/'+form.image" :alt="form.title"/>

                </div>
                <p class="mt-5">
                    {{ form.description }}
                </p>
                               
            </Dialog>
            <!-- Detail Post -->

       
       
        <div class="relative overflow-x-auto">
        
            <Table :headers='["ID","POST","POSTED BY","IMAGE","ACTION"]'>
                    
                <tr v-for="post in posts.data" :key="post.id" >
                        <td class="px-6 py-4">
                            {{ post.id }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.title }}
                        </td>
                        <td class="px-6 py-4">
                            <div v-if="post.image">
                                 <img class="rounded-sm h-16 w-16" :src="'storage/posts/'+post.image" :alt="post.title"/>
                            </div>
                            <div v-else>
                                <span>-</span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            {{ post.user.name }}
                        </td>
                        <td class="px-6 py-4">
                            
                            <div class="flex justify-center">

                                <i   @click="getDetailPost(post)" class="pi mx-2 pi-eye text-xl text-green-500" ></i>

                    
                                <i  @click="openEditModal(post)"  class="pi mx-2 pi-pencil text-xl text-indigo-500" ></i>
                            
                                <i @click=  "deletePost(post)"  class="pi mx-2 pi-trash text-xl text-red-500" ></i>

                            

                            </div>    
                        </td>                   
                </tr>

            </Table>
         
            
           

        </div>

        <Pagination :links="posts.links"/>
      
    </div>
  
   </AuthenticatedLayout>
</template>


<style>

</style>