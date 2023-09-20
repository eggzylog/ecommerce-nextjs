import FormSubmitButton from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Add Product - Ecommerce',
};

const addProduct = async (formData: FormData) => {
  'use server';

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error('All fields are required');
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect('/');
};

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  return (
    <div>
      <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
      <form action={addProduct}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='mb-3 w-full input input-bordered'
          required
        />
        <textarea
          name='description'
          placeholder='Description'
          className='textarea textarea-bordered mb-3 w-full'
          required
        ></textarea>
        <input
          type='url'
          name='imageUrl'
          placeholder='Image URL'
          className='mb-3 w-full input input-bordered'
          required
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          className='mb-3 w-full input input-bordered'
          required
        />
        <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
