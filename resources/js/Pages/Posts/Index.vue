
<script setup>
import { Link } from '@inertiajs/inertia-vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import Table from '@/Components/blog/components/Table.vue';
import { onMounted, ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { Inertia } from '@inertiajs/inertia';

defineProps ({
    posts: Object
})
const toast = useToast();
const visibleCreatePost = ref(false);
const form = ref({
    title:'',
    description:''
});
 const addPost = () => {
    if(form.value.title.trim()!=="" && form.value.description.trim()!==""){
        
        toast.add({severity:'success', summary: 'Post Added Succesfully', life: 3000});

    }else{
        toast.add({severity:'error', summary: 'Field are required', life: 3000});

    }
}

</script>



<template>
   <AuthenticatedLayout>
    <div class=" text-white p-5 rounded-sm shadow-sm card m-12" >


        <div class="flex justify-end my-2">
            <Toast/>
            <Button severity="contrast" outlined @click="visibleCreatePost = true" label="Create Post"/>
            
       <!-- Add dialog -->
       <Dialog class="bg-white"  v-model:visible="visibleCreatePost" header="Create a Post" :style="{ width: '25rem' }">
           <div class="mb-3">
                <label for="title">Title</label>
                <InputText id="title" class="w-full" v-model="form.title" />
           </div>

           <div class="mb-3">
                <label for="username">Username</label>
                <Textarea v-model="form.description" class="w-full" rows="5" cols="30" />
           </div>
           <div class="mb-3">
                <label for="file">Image</label>
                <FileUpload mode="basic" class="w-full" name="demo[]"  accept="image/*" :maxFileSize="1000000" />
            </div>

           
            <div class="flex justify-content-end gap-2 mt-2">

                <Button type="button" severity="success"  label="Save" @click="addPost"/>
                <Button type="button" outlined severity="secondary"   label="Cancel" @click="visibleCreatePost = false"/>
            </div>
        </Dialog>


        </div>
        <div class="relative overflow-x-auto">
        
             <Table :headers='["ID","POST","POSTED BY","ACTION"]'>
                    
                <tr v-for="post in posts.data" :key="post.id" >
                        <td class="px-6 py-4">
                            {{ post.id }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.title }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.user.name }}
                        </td>
                        <td class="px-6 py-4">
                            
                            <Link class="  mx-2 " :href="route('posts.show',post.id)">
                                <i class="pi pi-eye text-xl text-green-500" ></i>
                               
                               
                            </Link>

                            <Link :href="route('posts.edit',post.id)">

                                <i class="pi pi-pencil text-xl text-indigo-500" ></i>
                               
                            </Link>
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
            </DataTable> -->
        </div>

        <Pagination :links="posts.links"/>
      
    </div>
  
   </AuthenticatedLayout>
</template>


<style>

</style>