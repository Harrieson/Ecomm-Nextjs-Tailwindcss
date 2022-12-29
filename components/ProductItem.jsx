/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'


export default function ProductsItem({ product }) {
    return (
        <div className='card'>
            <Link href={`product/${product.slug}`} legacyBehavior>
                <a>
                    <img src={product.image}
                        alt={product.name}
                        className="rounded shadow" />
                </a>
            </Link>
            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <h2 className='text-lg'></h2>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p>${product.price}</p>
                <button className="primary-button hover:bg-amber-400 active:bg-amber-500" type='button'>
                    Buy Now
                </button>
            </div>
        </div>
    )
} 