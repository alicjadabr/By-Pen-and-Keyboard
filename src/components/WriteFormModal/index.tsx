import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { GlobalContext } from '~/contexts/GlobalContextProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '../Modal'
import { api } from "~/utils/api";
import { toast } from 'react-hot-toast'
import Loader from '../Loader'

type WriteFormType = {
  title: string,
  description: string,
  text: string 
}

export const writeFormSchema = z.object({
  title: z.string().min(20),
  description: z.string().min(60),
  text: z.string().min(150),
})


const WriteFormModal = () => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useContext(GlobalContext)

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<WriteFormType>({
    resolver: zodResolver(writeFormSchema)
  })

  const postRoute = api.useContext().post

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      toast.success('Post został dodany!')
      setIsWriteModalOpen(false)
      reset()
      postRoute.getAll.invalidate()
    },
    onError: (e) => {
      toast.error(e.message)
    }
  })

  const onSubmit = (data: WriteFormType) => {
    createPost.mutate(data)
  }

  return (
    <Modal 
    isOpen={isWriteModalOpen}
    onClose={() => setIsWriteModalOpen(false)}
  >
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col justify-center items-center space-y-2'
    > 
      <input 
        type='text' 
        id='title' 
        placeholder='Tytuł artykułu'
        {...register('title')}
        className='w-full h-full border border-gray-300 outline-none
        focus:border-gray-600 p-4 rounded-xl'
      />
      <p className='w-full text-left text-sm text-red-500 pb-5'>
        {errors.title ? 'Tytuł musi zawierać co najmniej 20 znaków' : null}
      </p>

      <input 
        type='text' 
        id='shortDescription' 
        placeholder='Krótki opis artykułu'
        {...register('description')}
        className='w-full h-full border border-gray-300 outline-none
        focus:border-gray-600 p-4 rounded-xl'
      />
      <p className='w-full text-left text-sm text-red-500 pb-5'>
        {errors.description ? 'Krótki opis musi zawierać co najmniej 60 znaków' : null}
      </p>

      <textarea 
        id='mainText' 
        cols={10} 
        rows={10}
        placeholder='Pełna treść artykułu'
        {...register('text')} 
        className='w-full h-full border border-gray-300 outline-none
        focus:border-gray-600 p-4 rounded-xl'
      />
      <p className='w-full text-left text-sm text-red-500 pb-5'>
        {errors.text ? 'Treść artykułu musi zawierać co najmniej 150 znaków' : null}
      </p>

      <div className='flex w-full justify-end'>
        <button 
          type='submit'
          className='flex items-center px-4 py-2 space-x-2 text-white
          border bg-green-600 rounded-xl transition
          hover:bg-green-700'
        >
          Opublikuj
        </button>
      </div>
    </form>
  </Modal>
  )
}

export default WriteFormModal