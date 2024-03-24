import { useToast } from 'primevue/usetoast'
import { useForm } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';

const   usePosts = () => {

    const form = useForm({
        id:null,
        title:'',
        description:'',
        image:null
    });

    const toast = useToast();
    const confirm = useConfirm();
    const visibleEditPost = ref(false);
    const isEditMode = ref(false);
    const visibleCreatePost = ref(false);

    const savePost = () => {

        try {
            if (form.title && form.description && form.image) {
              router.post(route('posts.store'), form)
            
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


    const  previewImage = (e)=> {
        const file = e.target.files[0];
        form.image =file;
        
    }

    const  openEditModal = (post) => {
        form.id=post.id
        form.title = post.title;
        form.description = post.description;
        
        // Set edit mode to true
        isEditMode.value = true;
        // Open the modal
        visibleEditPost.value = true;
    }


    const updatePost = () => {
   
    

        const formData = new FormData();
            
            formData.append('title', form.title);
            formData.append('description', form.description);
    
            if (form.image) {
                formData.append('image', form.image);
            }
            formData.append('_method', 'put');
        
            router.post(route('posts.update',form.id), formData);
    
            
    
    
    }

    
    const deletePost = (post) => {
        
     
        confirm.require({
            message: 'Do you want to delete Post?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            acceptLabel: 'Delete',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: () => {
                router.delete(route('posts.destroy',post.id))
                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Post deleted', life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'Post Canceled', life: 3000 });
            }
        });
    }







    return {
        form,
        visibleCreatePost,
        visibleEditPost,
        isEditMode,
        savePost,
        previewImage,
        openEditModal,
        updatePost,
        deletePost,
    
      

    }
}

export default usePosts;