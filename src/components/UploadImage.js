import React, { useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useForm } from 'react-hook-form';

const MyEditor = () => {
  const { register, handleSubmit } = useForm();
  const editorRef = useRef();

  const onSubmit = async (data) => {
    const canvas = editorRef.current.getImage().toDataURL('image/jpeg', 0.5);
    const formData = new FormData();
    formData.append('cpf', data.cpf);
    formData.append('image', canvas);

    // Enviar formData para o backend em PHP usando fetch ou axios
    console.log("Arquivo enviado: ", formData)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AvatarEditor
        ref={editorRef}
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />
      <input type="file" {...register('image')} />
      <input type="text" {...register('cpf')} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MyEditor;
