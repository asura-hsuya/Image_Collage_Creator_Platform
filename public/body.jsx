import React from 'react'
import Machine from './Machine'

function body() {
    return (
        <>
        <div className=' rounded-4xl bg-[#303236] w-full min-h-[95vh] p-7'>
            <div className="writing text-white "><h1 className=' text-2xl font-medium'>Free Photo Collage Maker</h1>
                Experience the ease of making a collage masterpiece with Pixlr's free online collage maker Transform your photos into stunning collages effortlessly by utilizing our professionally designed templates.

                <div className=' py-5'>Start by adding photos that you want in your collage and we will suggest layouts to fill your photo collage.</div></div>
        <Machine />
        </div>
        </>
    )
}

export default body
