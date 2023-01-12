import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { Store } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import { signOut, useSession } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'

export default function Layout({ children, title }) {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const { status, data: session } = useSession()
    useEffect(() => {
        return () => {
            setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
        };
    }, [cart.cartItems])
    const logoutClickHnadler = () => {
        Cookies.remove('cart')
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' })
    }
    return (
        <>
            <Head>
                <title>{title ? title + 'Ecom Ninjas' : 'Start here'}</title>
                <meta name="description" content="Ecommerce Website generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position='bitton-center' limit={1} />
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
                            {status === 'loading' ? (
                                'Loading'
                            ) : session?.user ? (
                                <Menu as="div" className="relative, inline-block">
                                    <Menu.Button className="text-blue-600">
                                        {session.user.name}
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link hover:bg-gray-300" href='/profile'>
                                                Profile
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link hover:bg-gray-300" href='/order-history'>
                                                My orders
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link hover:bg-gray-300" href='#' onClick={logoutClickHnadler}>
                                                Logout
                                            </DropdownLink>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link legacyBehavior href="/login">
                                    <a className='p-2'>Login</a></Link>)}

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