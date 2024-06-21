'use client'
import React from 'react'
import Dropzone from 'react-dropzone'

function MyDropzone() {
  return (
    <div className="bg-white border">
      <Dropzone
        accept={{ 'image/jpeg': ['.png', '.webp', '.jpeg', '.jpg'] }}
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className="h-[34rem] hover:cursor-pointer">
              <input {...getInputProps()} />
              <p className="flex flex-col gap-10 text-muted-foreground items-center justify-center h-full dark:invert text-center text-wrap">
                Drag &apos;n&apos; drop some files here, <br />
                or click to select files
                <p className="text-xs">.png, .jpg, .webp</p>
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default MyDropzone
