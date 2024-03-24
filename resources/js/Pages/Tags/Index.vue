

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
import useTags from '@/composables/tags/useTags';

defineProps({
    tags:Object,
    errors:Object,
})

const {
    form,
    visibleCreateTag,
    visibleEditTag,
    isEditMode,
    filters,
    saveTag,
    openEditModal,
    updateTag,
    deleteTag,
    resetEditForm,
    resetCreateForm
} = useTags();

</script>
<template>
   
    <AuthenticatedLayout>
        <Toast/>
        <ConfirmDialog/>

        <div class="text-white relative overflow-x-auto">
            <div class="flex justify-end mt-5 mx-5">
                <Button severity="contrast" outlined @click="visibleCreateTag = true" class="mx-5" label=" Create  Tag"/>
            </div>        
        <!-- Add dialog -->
            <Dialog class="bg-white"  v-model:visible="visibleCreateTag" header="Create a Tag" :style="{ width: '25rem' }">

                <form @submit.prevent="saveTag" enctype="multipart/form-data">
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
            <Dialog class="bg-white"  v-model:visible="visibleEditTag" header="Edit Tag" :style="{ width: '25rem' }">

                <form @submit.prevent="updateTag" enctype="multipart/form-data">
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
             :value="tags.data"  
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
            <template #empty> No tags found. </template>

            <Column field="id"  sortable header="ID">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.id }}</span>
                    </div>
                </template>
            </Column>
            <Column field="name" sortable header="Tag">
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
                        
                        <i @click="deleteTag({'id':slotProps.data.id})" class="pi mx-2 pi-trash text-xl text-red-500" ></i>

                        
                    </div>
                </template>
            </Column>
        </DataTable> 
        
         </div>

        </div>

        <Pagination :links="tags.links"/>
   
    </AuthenticatedLayout>
</template>
<style>

</style>