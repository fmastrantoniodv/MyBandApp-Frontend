import React, { useEffect } from 'react'
import { useModal } from './useModal'
import Modal from '../components/Modals/Modal'
import LottieAnimation from '../components/Register/LoadingAnimation'

export const useLoader = () => {
    const [isOpenLoadingModal, openLoadingModal, closeLoadingModal] = useModal(false)

    const showLoader = () => openLoadingModal()
    const hideLoader = () => closeLoadingModal()

    useEffect(() => {
        console.log(`[useLoader].[useEffect].isOpenLoadingModal=${isOpenLoadingModal}`)
    }, [])

    const LoaderModal = () => (
        <>
            <Modal isOpen={isOpenLoadingModal} closeModal={closeLoadingModal}>
                <LottieAnimation width={200} height={200}/>
            </Modal>
        </>
    )

    return { showLoader, hideLoader, LoaderModal }
}

