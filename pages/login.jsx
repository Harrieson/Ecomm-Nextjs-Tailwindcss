import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import getError from '../utils/error'
import { toast } from 'react-toastify'

export default function LoginScreen() {
    const { handleSubmit, register, formState: { errors },
    } = useForm()

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            if (result.error) {
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getError(err))
        }
    }
    return (
        <div>
            <Layout title="Login">
                <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                    <h1 className="mb-4 text-xl">Login</h1>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email'
                            {...register('email', {
                                required: 'Please enter email',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                    message: 'Please Enter a valid Email'
                                }
                            })}
                            autoFocus className="w-full focus:ring" />
                        {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' autoFocus className="w-full focus:ring"
                            {...register('password', {
                                required: 'Please Enter a Password',
                                minLength: { value: 8, message: 'Password must be more than 8 characters' }
                            })}
                        />
                        {errors.password && (
                            <div className="text-red-500">{errors.password.message}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <button className="primary-button">Login</button>
                    </div>
                    <div className="mb-4">
                        Dont&apos;t have an Acoount? &nbsp;
                        <Link href='/register'>Register</Link>
                    </div>
                </form>
            </Layout>
        </div>
    )
}
