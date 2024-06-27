'use client'
import React from 'react'
import toast from 'react-hot-toast'

import { useGlobalStore } from '@/_store/globalStore'
import Loader from '@/components/blocks/loader'
import { Skeleton } from '@/components/ui/skeleton'

import ImageCard from './components/ImageCard'

function Page() {
  const [imageStudioAssets, status, fetchAndSetImageStudioAssetsToState, deleteImageStudioAsset] = useGlobalStore(
    (state) => [
      state.apiState.imageStudioAssets,
      state.apiState.status,
      state.apiActions.fetchAndSetImageStudioAssetsToState,
      state.apiActions.deleteImageStudioAsset
    ]
  )
  React.useEffect(() => {
    try {
      fetchAndSetImageStudioAssetsToState()
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch keys. Please try again.', { position: 'top-right' })
    }
  }, [])
  return (
    <div className="h-full dark:bg-[url(/assets/bgtexturedark.png)] bg-[url(/assets/bgtexturelight.png)] bg-cover">
      {status === 'IDLE' || status === 'PENDING' ? (
        <div className="flex gap-2 justify-between">
          <Skeleton className="h-[400px] w-[350px]" />
          <Skeleton className="h-[400px] w-[350px]" />
          <Skeleton className="h-[400px] w-[350px]" />
        </div>
      ) : (
        <>
          {imageStudioAssets.length === 0 && <div className="flex justify-center">No saved images</div>}
          <div className={`flex flex-wrap gap-2 h-fit ${imageStudioAssets.length > 3 ? ' justify-around' : ''}`}>
            {imageStudioAssets.map((asset) => {
              return (
                <ImageCard
                  key={asset.id}
                  imgStr={asset.img_str.toString()}
                  handleDelete={() => deleteImageStudioAsset(asset)}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Page
