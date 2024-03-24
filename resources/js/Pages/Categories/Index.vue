

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import Table from '@/Components/blog/components/Table.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';  
import useCategories from '@/composables/categories/useCategories';
import InputError from '@/Components/InputError.vue';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';
import { ref } from 'vue';

defineProps({
    categories:Object,
    errors:Object,
})

const {
    form,
    visibleCreateCatgeory,
    visibleEditCategory,
    isEditMode,
    filters,
    saveCategory,
    openEditModal,
    updateCategory,
    deleteCategory,
    resetEditForm,
    resetCreateForm
} = useCategories();

// const filters = ref({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     'tag.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   
// });
</script>
<template>
   
    <AuthenticatedLayout>
        <Toast/>
        <ConfirmDialog/>

        <div class="text-white relative overflow-x-auto">
            <div class="flex justify-end mt-5 mx-5">
                <Button severity="contrast" outlined @click="visibleCreateCatgeory = true" class="mx-5" label="Create Category"/>
            </div>
        <!-- <Table :headers='["ID","Name","CREATED_AT","ACTION"]'>
                
            <tr v-for="category in categories.data" :key="category.id" >
                    <td class="px-6 py-4">
                        {{ category.id }}
                    </td>
                    <td class="px-6 py-4">
                        {{ category.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ category.created_at }}
                    </td>

                    <td class="px-6 py-4">
                        
                        <div class="flex justify-center">

                            <i   class="pi mx-2 pi-pencil text-xl text-indigo-500" ></i>
                        
                            <i  class="pi mx-2 pi-trash text-xl text-red-500" ></i>

                        

                        </div>    
                    </td>                   
            </tr>

            </Table> -->
        
        <!-- Add dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleCreateCatgeory" header="Create a Category" :style="{ width: '25rem' }">

                <form @submit.prevent="saveCategory" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="name">Name</label>
                            <InputText type="text" id="name" class="w-full" v-model="form.name" />
                            <InputError class="text-red-400 my-4"  :message="errors.name "/>

                    </div>
                    
                    <div class="flex justify-content-end gap-2 mt-2">

                        <Button type="submit" severity="success"  label="Save" />
                        <Button type="button" outlined severity="secondary"   label="Cancel" @click="resetCreateForm"/>
                    </div>
                </form>
            </Dialog>
        <!-- Add dialog -->

        <!-- Edit dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleEditCategory" header="Edit Category" :style="{ width: '25rem' }">

                <form @submit.prevent="updateCategory" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="name">Name</label>
                            {{ 
                            console.log(form)
                            }}
                            <InputText type="text" id="name" class="w-full" v-model="form.name" />
                            <InputError class="text-red-400 my-4"  :message="errors.name "/>

                    </div>
                    
                    <div class="flex justify-content-end gap-2 mt-2">

                        <Button type="submit" severity="success"  label="Save" />
                        <Button type="button" outlined severity="secondary"   label="Cancel" @click="resetEditForm"/>
                    </div>
                </form>
            </Dialog>
        <!-- Edit dialog -->

         <div class="container m-5 mx-auto">
            <DataTable  
             v-model:filters="filters"
             :value="categories.data"  
             tableStyle="min-width: 50rem"
             :globalFilterFields="[ 'tag.name',name]"
             dataKey="id"
             >
             <template #header>
                <div class="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['name'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No categories found. </template>

            <Column field="id"  sortable header="ID">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.id }}</span>
                    </div>
                </template>
            </Column>
            <Column field="name" sortable header="CATEGORY">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="created_at" sortable header="CREATED AT ">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.created_at }}</span>
                    </div>
                </template>
            </Column>
           
            <Column  header="Action">
                <template  #body="slotProps">
                    <div>

                        <i @click="openEditModal({'id':slotProps.data.id ,'name':slotProps.data.name })"  class="pi mx-2 pi-pencil text-xl text-indigo-500" ></i>
                        
                        <i @click="deleteCategory({'id':slotProps.data.id})" class="pi mx-2 pi-trash text-xl text-red-500" ></i>

                        
                    </div>
                </template>
            </Column>
        </DataTable> 
        
         </div>

        </div>

        <Pagination :links="categories.links"/>
   
    </AuthenticatedLayout>
</template>
<style>

</style>