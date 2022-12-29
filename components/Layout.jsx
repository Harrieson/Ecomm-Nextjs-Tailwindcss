import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { Store } from '../utils/Store'

export default function Layout({ children, title }) {
    const { state } = useContext(Store)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        return () => {
            setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
        };
    }, [cart.cartItems])
    return (
        <>
            <Head>
                <title>{title ? title + 'Ecom Ninjas' : 'Start here'}</title>
                <meta name="description" content="Ecommerce Website generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 items-center p-4 justify-between shadow-md'>
                        <Link href='/' className='text-lg font-bold'>Ecomm Ninjas</Link>
                        <div>
                            <Link href='/cart' className='p-2'>Cart
                                {cartItemsCount > 0 && (
                                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                        {cartItemsCount}
                                    </span>
                                )}

                            </Link>
                            <Link href='/wishlist' className='p-2'>Wishlist</Link>
                            <Link href='/login' className='p-2'>Login</Link>
                        </div>
                    </nav>
                </header>
                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>
                <footer className='flex h-10 justify-center items-center shadow-inner'>
                    Footer Here
                </footer>
            </div>
        </>
    )
}