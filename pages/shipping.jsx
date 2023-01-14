import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckputWizard';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
    const { handleSubmit, register,
        formState: { errors },
        setValue } = useForm()
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress } = cart
    const router = useRouter()
    useEffect(() => {
        return () => {
            setValue('fullName', shippingAddress.fullName)
            setValue('address', shippingAddress.address)
            setValue('city', shippingAddress.city)
            setValue('postalCode', shippingAddress.postalCode)
            setValue('country', shippingAddress.country)
        };
    }, [setValue, shippingAddress])
    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: { fullName, address, city, postalCode, country }
        })
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalCode,
                    country,
                    location,
                }

            })
        )
        router.push('/payment')
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
                    <label htmlFor="postalCode">Postal Code</label>
                    <input className='w-full border-cyan-300 rounded-lg' id="address" {...register('postalCode', {
                        required: 'Please enter your Postal Code',
                        minLength: { value: 2, message: 'Address is 2 or more characters' }
                    })} />
                    {errors.postalCode && (
                        <div className='text-red-500'>{errors.postalCode.message}</div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="city">City</label>
                    <input className='w-full border-cyan-300 rounded-lg' id="city" {...register('city', {
                        required: 'Please enter your City',
                        minLength: { value: 2, message: 'Address is 2 or more characters' }
                    })} />
                    {errors.city && (
                        <div className='text-red-500'>{errors.city.message}</div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor="country">Country</label>
                    <input className='w-full border-cyan-300 rounded-lg' id='country' {...register('country',
                        { required: 'Please enter your country' })} />
                    {errors.country && (
                        <div className='text-red-500'>{errors.country.message}</div>
                    )}
                </div>
                <div className='mb-4 flex justify-between'>
                    <button className='primary-button'>Next</button>
                </div>

            </form>
        </Layout>
    );
}

ShippingScreen.auth = true
