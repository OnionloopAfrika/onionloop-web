import React from 'react'

const Header = (props: {heading: string, subHeading:string}) => {
    const {heading: heading, subHeading:subHeading} = props
  return (
    <div className='w-full flex items-center justify-between'>
        <div className='w-full flex flex-col item-start justify-start'>
            <h1 className='w-full text-base md:text-xl font-semibold'>{heading}</h1>
            <h2 className='w-full text-sm md:text-sm text-[#6C6C6C]'>{subHeading}</h2>
        </div>
    </div>
  )
}

export default Header