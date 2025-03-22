import { useFirebaseStorage } from "vuefire"
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { uid } from "uid"
import { ref, computed } from "vue"

export default function useImage() {

    const storage = useFirebaseStorage()
    const url = ref(null)

    const onFileChange = (e) => {
        const file = e.target.files[0]
        const filename = uid() + '.jpg'
        const sRef = storageRef(storage, `products/${filename}`)

        // Subir archivo
        const uploadTask = uploadBytesResumable(sRef, file)

        uploadTask.on('state_changed', 
        (snapshot) => {},
        (error) => console.error(error),
        () => {
            // La imagen se subió correctamente
            getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    url.value = downloadURL
            })
        })
    }

    const isImageUploaded = computed(() => url.value ?? null)

    return {
        url,
        onFileChange,
        isImageUploaded
    }
}