
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
    isEditMode,
    savePost,
    previewImage,
    deletePost,
    openEditModal,
    updatePost
} = usePosts();

</script>

<template>
   <AuthenticatedLayout>
    <div class=" text-white p-5 rounded-sm shadow-sm card m-12" >


        <div class="flex justify-end my-2">
            <Toast/>

            <ConfirmDialog></ConfirmDialog>

            <Button severity="contrast" outlined @click="visibleCreatePost = true" label="Create Post"/>

            <!-- Add dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleCreatePost" header="Create a Post" :style="{ width: '25rem' }">

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

                            <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                                    {{ form.progress.percentage }}%
                            </progress>
                    </div>

                    
                    <div class="flex justify-content-end gap-2 mt-2">

                        <Button type="submit" severity="success"  label="Save" />
                        <Button type="button" outlined severity="secondary"   label="Cancel" @click="visibleCreatePost = false"/>
                    </div>
                </form>
            </Dialog>
            <!-- Add dialog -->


            <!-- Edit dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleEditPost" header="Edit  Post" :style="{ width: '25rem' }">

                <form @submit.prevent="updatePost " enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="title">Title</label>
                            <InputText type="text" id="title" class="w-full" v-model="form.title" />
                        
                            <small class="text-red-400 my-4" v-if="errors.title">{{ errors.title }}</small>

                    </div>

                    <div class="mb-3">
                            <label for="description">Description</label>
                            <Textarea type="text" v-model="form.description" class="w-full" rows="5" cols="30" />
                            
                            <small class="text-red-400 my-4" v-if="errors.description">{{ errors.description }}</small>

                    </div>
                    <div class="mb-3">
                            <label for="file">Image</label>
                            <FileUpload mode="basic" class="w-full"  @input="previewImage"   />
                            <!-- <img class="rounded-full w-16" :src="url" /> -->

                        </div>

                    
                        <div class="flex justify-content-end gap-2 mt-2">

                            <Button type="submit" severity="success"  label="Save" />
                            <Button type="button" outlined severity="secondary"   label="Cancel" @click="visibleEditPost = false"/>
                        </div>
                </form>
            </Dialog>
             <!-- Edit dialog -->

        </div>

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
                                <Link  class="  mx-2 " :href="route('posts.show',post.id)">
                                <i class="pi mx-2 pi-eye text-xl text-green-500" ></i>
                               
                               
                            </Link>
                
                            <i  @click="openEditModal(post)"  class="pi mx-2 pi-pencil text-xl text-indigo-500" ></i>
                          
                            <i @click="deletePost(post)"  class="pi mx-2 pi-trash text-xl text-red-500" ></i>

                            

                            </div>    
                        </td>                   
                </tr>

            </Table>
         
            <!-- <DataTable :value="posts.data"  tableStyle="min-width: 50rem">
                <Column field="id"  sortable header="ID"></Column>
                <Column field="title" sortable header="POST"></Column>
                <Column field="description" sortable header="DESCRIPTION"></Column>
                <Column field="user.name" sortable header="POSTED BY"></Column>
                <Column  header="Action">
                    <template body>
                        <div>
                            <Link :href="route('posts.show',{id: 'id'})">SHOW</Link>
                           
                        </div>
                    </template>
                </Column>
            </DataTable> 
            -->

        </div>

        <Pagination :links="posts.links"/>
      
    </div>
  
   </AuthenticatedLayout>
</template>


<style>

</style>