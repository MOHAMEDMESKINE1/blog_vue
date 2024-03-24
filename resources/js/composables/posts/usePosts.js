import { useToast } from 'primevue/usetoast'
import { useForm } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';

const   usePosts = () => {

   
    // instanicate form
    const form = useForm({
        id:null,
        title:'',
        description:'',
        image:null
    });

    // declarable variables
    const toast = useToast();
    const confirm = useConfirm();

    const visibleCreatePost = ref(false);
    const visibleEditPost = ref(false);
    const visibleDetailPost = ref(false);

    const isEditMode = ref(false);
    const isDetailMode = ref(false);

    const urlPreview= ref(null);

    // save a Post
    const savePost = () => {

        try {
           
              router.post(route('posts.store'), form)

              if (form.title && form.description && form.image) {
                toast.add({severity:'success', summary: 'Post Added Successfully', life: 3000});
                form.reset();
    
            } else {
                toast.add({severity:'warn', summary: 'All fields are required', life: 3000});
            }
            
        } catch (error) {
            console.log(error);
            toast.add({severity:'error', summary: 'An error occurred while saving the post', life: 3000});
        }
    
   
    }
   
    // get Post details
    const  getDetailPost = (post) => {
        form.id=post.id
        form.title = post.title;
        form.description = post.description;
        form.image=post.image
        // Set edit mode to true
        isDetailMode.value = true;

        // Open the modal
        visibleDetailPost.value = true;
       
    }
    // get data to edit modal
    const  openEditModal = (post) => {
        form.id=post.id
        form.title = post.title;
        form.description = post.description;
        form.image=post.image
        // Set edit mode to true
        isEditMode.value = true;

        // Open the modal
        visibleEditPost.value = true;
       
    }
    // update Post
    const updatePost = () => {

            const formData = new FormData();
            
            formData.append('title', form.title);
            formData.append('description', form.description);
    
            if (form.image) {
                formData.append('image', form.image);
            }

            formData.append('_method', 'put');
        
            router.post(route('posts.update',form.id), formData);
    
            if(form.title && form.description){
                toast.add({severity:'success', summary: 'Post Updated Successfully', life: 3000});
            }
    
    
    }

    // delete Post 
    const deletePost = (post) => {
     
        confirm.require({
            message: 'Do you want to delete Post?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',

            rejectClass: 'p-button-info p-button-outlined',

            acceptClass: 'p-button-warn',
            accept: () => {
                router.delete(route('posts.destroy',post.id))

                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Post deleted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'Post Canceled', life: 3000 });
            }
           
        });
    }


    // reset edit form
    const resetEditForm = () =>{
       
        visibleEditPost.value = false
        form.reset()
    }
    // reset create form
    const resetCreateForm = () =>{

        visibleCreatePost.value =false
        urlPreview.value='';
        form.reset()
    }
    // get Image 
    const  previewImage = (e)=> {
        const file = e.target.files[0];    
       
        
        form.image= file
     
        urlPreview.value=URL.createObjectURL(file);

        
    }






    return {
        form,
        visibleCreatePost,
        visibleEditPost,
        visibleDetailPost,
        isEditMode,
        isDetailMode,
        urlPreview,

        savePost,
        getDetailPost,
        previewImage,
        openEditModal,
        updatePost,
        deletePost,
        resetEditForm,
        resetCreateForm
      

    }
}

export default usePosts;