import React from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckputWizard';
import { useForm } from 'react-hook-form';

export default function ShippingScreen() {
    const { handleSubmit, register,
        formState: { errors },
        setValue,
        getValues } = useForm()
    const submitHandler = () => {

    }
    return (
        <Layout title="shpping Address">
            <CheckoutWizard activeStep={1} />
            <form className='mx-auto max-w-screen-md'
                onSubmit={handleSubmit(submitHandler)}>
                <h1 className='mb-4 text-xl'>Shipping Address</h1>
                <div className='mb-4'>
                    <label htmlFor="fullName">Full Name</label>
                    <input className='w-full border-cyan-300 rounded-lg' id='fullNmae' autoFocus {...register('fullName', {
                        required: 'Please Enter Your Full Name'
                    })} />
                    {errors.fullName && (
                        <div className='text-red-500'>{errors.fullName.message}</div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="address">Address</label>
                    <input className='w-full border-cyan-300 rounded-lg' id="address" {...register('address', {
                        required: 'Please enter your address',
                        minLength: { value: 2, message: 'Address is 2 or more characters' }
                    })} />
                    {errors.address && (
                        <div className='text-red-500'>{errors.address.message}</div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="Town">Town</label>
                    <input className='w-full border-cyan-300 rounded-lg' id='town' {...register('town',
                        { required: 'Please enter your town' })} />
                    {errors.town && (
                        <div className='text-red-500'>{errors.town.message}</div>
                    )}
                </div>
                <div className='mb-4 flex justify-between'>
                    <button className='primary-button'>Next</button>
                </div>

            </form>
        </Layout>
    );
}
