import React from 'react'
import IMAGES from '../../../assets/images'

const Card = ({active, onpress}) => {
    return (
        <div onClick={onpress} className='px-10 flex py-16 custom-shadow rounded-md bg-white cursor-pointer'>
            <div className='flex'>
                <div className='flex flex-col gap-2 justify-center items-center text-maroon'>
                    <img alt='img' src={IMAGES.child} className={`w-20 h-20 rounded-full ${active? "border-4 border-maroon":""}`} />
                    <p className='font-bold'>Rida e Noor Gilani</p>
                    <p className='text-sm'>FA20-IGBASICS-89</p>
                </div>
            </div>
        </div>
    )
}

export default Card
