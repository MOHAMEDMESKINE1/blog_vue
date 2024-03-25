import { useToast } from 'primevue/usetoast'
import { useForm } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const   useComments = () => {

    // instanicate form
    const form = useForm({
        id:null,
        post:null,
        content:''
       
    });
   

    // declarable variables
    const toast = useToast();
    const confirm = useConfirm();

    const visibleCreateComment = ref(false);
    const visibleEditComment = ref(false);

    const isEditMode = ref(false);

    // save a comment
    const saveComment = () => {

        try {
           
              router.post(route('comments.store'), form)

              if (form.content && form.post) {
                
                toast.add({severity:'success', summary: 'Comment Added Successfully', life: 3000});
                form.reset();
    
            } else {
                toast.add({severity:'warn', summary: 'All fields are required', life: 3000});
            }
            
        } catch (error) {
            console.log(error);
            toast.add({severity:'error', summary: 'An error occurred while saving the comment', life: 3000});
        }
    
   
    }
   
    // get data to edit modal

    const  openEditModal = (comment) => {
        console.log(comment);
        form.id=comment.id
        form.post =comment.post;
        form.content =comment.content;
        // Set edit mode to true
        isEditMode.value = true;

        // Open the modal
        visibleEditComment.value = true;
       
    }
    // update comment
    const updateComment = () => {
      
        form.put(route('comments.update',{comment:form.id}),form);

        if(form.name ){
            toast.add({severity:'success', summary: 'Comment Updated Successfully', life: 3000});
        }
    
    
    }

    // delete category 
    const deleteComment = (comment) => {
     
        confirm.require({
            message: 'Do you want to delete comment?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',

            rejectClass: 'p-button-info p-button-outlined',

            acceptClass: 'p-button-warn',
            accept: () => {
                form.delete(route('comments.destroy',comment.id))

                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'comment deleted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'comment Canceled', life: 3000 });
            }
           
        });
    }


    // reset edit form
    const resetEditForm = () =>{
       
        visibleEditComment.value = false
        form.reset()
    }
    // reset create form
    const resetCreateForm = () =>{

        visibleCreateComment.value =false
        form.reset()
    }


    return {
        form,
        // filters,
        visibleCreateComment,
        visibleEditComment,
        isEditMode,
        saveComment,
        openEditModal,
        updateComment,
        deleteComment,
        resetEditForm,
        resetCreateForm
      

    }
}

export default useComments;