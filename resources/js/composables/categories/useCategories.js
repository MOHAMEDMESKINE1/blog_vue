import { useToast } from 'primevue/usetoast'
import { useForm } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const   useCategorys = () => {

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

    const visibleCreateCatgeory = ref(false);
    const visibleEditCategory = ref(false);

    const isEditMode = ref(false);

    // save a category
    const saveCategory = () => {

        try {
           
              router.post(route('categories.store'), form)

              if (form.name) {
                
                toast.add({severity:'success', summary: 'category Added Successfully', life: 3000});
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

    const  openEditModal = (category) => {
        console.log(category);
        form.id=category.id
        form.name =category.name;
        // Set edit mode to true
        isEditMode.value = true;

        // Open the modal
        visibleEditCategory.value = true;
       
    }
    // update category
    const updateCategory = () => {
      
        form.put(route('categories.update',form.id),form);

        if(form.name ){
            toast.add({severity:'success', summary: 'category Updated Successfully', life: 3000});
        }
    
    
    }

    // delete category 
    const deleteCategory = (category) => {
     
        confirm.require({
            message: 'Do you want to delete category?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',

            rejectClass: 'p-button-info p-button-outlined',

            acceptClass: 'p-button-warn',
            accept: () => {
                form.delete(route('categories.destroy',category.id))

                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'category deleted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'category Canceled', life: 3000 });
            }
           
        });
    }


    // reset edit form
    const resetEditForm = () =>{
       
        visibleEditCategory.value = false
        form.reset()
    }
    // reset create form
    const resetCreateForm = () =>{

        visibleCreateCatgeory.value =false
        form.reset()
    }


    return {
        form,
        filters,
        visibleCreateCatgeory,
        visibleEditCategory,
        isEditMode,
        saveCategory,
        openEditModal,
        updateCategory,
        deleteCategory,
        resetEditForm,
        resetCreateForm
      

    }
}

export default useCategorys;