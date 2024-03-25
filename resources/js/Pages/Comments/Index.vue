
<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import Table from '@/Components/blog/components/Table.vue';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';
import InputError from '@/Components/InputError.vue';
import useComments from '@/composables/comments/useComments';
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';
defineProps ({
    comments: Object,
    posts:Object,
    errors:Object
})

const {
    form,
    visibleCreateComment,
    visibleEditComment,
    isEditMode,
    saveComment,
    deleteComment,
    openEditModal,
    updateComment,
    resetEditForm,
    resetCreateForm
} = useComments();
const selectedPost = ref();
</script>

<template>
   <AuthenticatedLayout>
    <div class=" text-white p-5 rounded-sm shadow-sm card m-12" >
        
        <Toast/>

        <ConfirmDialog/>
        
            <div class="flex justify-end my-2">
                <Button severity="contrast" outlined @click="visibleCreateComment = true" label="Create Post"/>
            </div> 
            <!-- Add dialog -->
             <Dialog class="bg-white"  v-model:visible="visibleCreateComment" header="Create a Post" :style="{ width: '30rem' }">

                <form @submit.prevent="saveComment" enctype="multipart/form-data">
                        

                    <div class="mb-3">
                            <label for="content">Content</label>
                            <Textarea type="text" v-model="form.content" class="w-full" rows="5" cols="30" />
                            <InputError class="text-red-400 my-4" :message="errors.content"/>

                    </div>
                    <div class="mb-3">
                            <label for="Post">Post</label>
                            <Dropdown  variant="filled"   v-model="form.post" optionValue="id" :options="posts" optionLabel="title" placeholder="Select a Post" class="w-full md:w-14rem" />                            
                            <InputError class="text-red-400 my-4" :message="errors.post"/>
                    </div>
                   

                    
                    <div class="flex justify-content-end gap-2 mt-2">

                        <Button type="submit" severity="success"  label="Save" />
                        <Button type="button" outlined severity="secondary"   label="Cancel" @click="resetCreateForm"/>
                    </div>
                </form>
            </Dialog>
            <!-- Add dialog--->

            <!-- Edit dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleEditComment" header="Edit  Post" :style="{ width: '30rem' }">

                <form @submit.prevent="updateComment" enctype="multipart/form-data">
                       

                    <div class="mb-3">
                            <label for="content">content</label>
                            <Textarea type="text" v-model="form.content" class="w-full" rows="5" cols="30" />
                            
                            <InputError class="text-red-400 my-4" :message="errors.content"/>

                    </div>
                    <div class="mb-3">
                            <label for="Post">Post</label>
                            <Dropdown  
                             v-model="form.post " 
                             variant="filled" 
                             optionValue="id" 
                             :options="posts" 
                             optionLabel="title"
                             :placeholder="form.post.title"
                             
                             class="w-full md:w-14rem" />                            
 

                            
                            <InputError class="text-red-400 my-4" :message="errors.post"/>

                    </div>
                   

                    
                    <div class="flex justify-content-end gap-2 mt-2">

                        <Button type="submit" severity="success"  label="Save" />
                        <Button type="button" outlined severity="secondary"   label="Cancel" @click="resetEditForm"/>
                    </div>
                </form>
            </Dialog>
             <!-- Edit dialog -->

           
          

       
       
        <div class="relative overflow-x-auto">
        
            <Table :headers='["ID","CONTENT","POST","ACTION"]'>
                    
                <tr v-for="comment in comments.data" :key="comment.id" >
                        <td class="px-6 py-4">
                            {{ comment.id }}
                        </td>
                        <td class="px-6 py-4">
                            {{ comment.content }}
                        </td>
                        
                        <td class="px-6 py-4">
                            {{ comment.post.title }}
                        </td>
                        <td class="px-6 py-4">
                            
                            <div class="flex justify-center">
                    
                                <i  @click="openEditModal(comment)"  class="pi mx-2 pi-pencil text-xl text-indigo-500" ></i>
                            
                                <i @click=  "deleteComment(comment)"  class="pi mx-2 pi-trash text-xl text-red-500" ></i>
                            </div>    
                        </td>                   
                </tr>

            </Table>
        </div>

        <Pagination :links="comments.links"/>
      
    </div>
  
   </AuthenticatedLayout>
</template>


<style>

</style>