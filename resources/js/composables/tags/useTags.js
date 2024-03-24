import { useToast } from 'primevue/usetoast'
import { useForm } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const   useTags = () => {

    // instanicate form
    const form = useForm({
        id:null,
        name:''
    });
    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'tag.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
       
    });
    // declarable variables
    const toast = useToast();
    const confirm = useConfirm();

    const visibleCreateTag = ref(false);
    const visibleEditTag = ref(false);

    const isEditMode = ref(false);

    // save a tag
    const saveTag = () => {

        try {
           
              router.post(route('tags.store'), form)

              if (form.name) {
                
                toast.add({severity:'success', summary: 'Tag Added Successfully', life: 3000});
                form.reset();
    
            } else {
                toast.add({severity:'warn', summary: 'All fields are required', life: 3000});
            }
            
        } catch (error) {
            console.log(error);
            toast.add({severity:'error', summary: 'An error occurred while saving the category', life: 3000});
        }
    
   
    }
   
    // get data to edit modal

    const  openEditModal = (tag) => {
        form.id=tag.id
        form.name =tag.name;
        // Set edit mode to true
        isEditMode.value = true;

        // Open the modal
        visibleEditTag.value = true;
       
    }
    // update category
    const updateTag = () => {
      
        form.put(route('tags.update',form.id),form);

        if(form.name ){
            toast.add({severity:'success', summary: 'category Updated Successfully', life: 3000});
        }
    
    
    }

    // delete tag 
    const deleteTag = (tag) => {
     
        confirm.require({
            message: 'Do you want to delete tag?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',

            rejectClass: 'p-button-info p-button-outlined',

            acceptClass: 'p-button-warn',
            accept: () => {
                form.delete(route('tags.destroy',tag.id))

                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'tag deleted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'tag Canceled', life: 3000 });
            }
           
        });
    }


    // reset edit form
    const resetEditForm = () =>{
       
        visibleEditTag.value = false
        form.reset()
    }
    // reset create form
    const resetCreateForm = () =>{

        visibleCreateTag.value =false
        form.reset()
    }


    return {
        form,
        filters,
        visibleCreateTag,
        visibleEditTag,
        isEditMode,
        saveTag,
        openEditModal,
        updateTag,
        deleteTag,
        resetEditForm,
        resetCreateForm
      

    }
}

export default useTags;