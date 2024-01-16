import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../App.css'

const useModal = () => {
    const [modalComponent, setModalComponent] = useState(null)
    const [open, setOpen] = useState(false)
    
    const modalContainerRef = useRef(document.getElementById("modal-container"))
    
    const createModal = () => {
        console.log('[useModal].createModal')
        modalContainerRef.openModal = (texto, arrayOptions) => openModal(texto, arrayOptions)
        modalContainerRef.closeModal = () => closeModal()
        console.log("modalContainerRef", modalContainerRef)
        modalContainerRef.current.style.display = 'none'

        setModalComponent(modalContainerRef)
    }

    const openModal = (texto, arrayOptions) => {
        console.log('[useModal].openModal')
        var optionsList = arrayOptions;
        console.log(arrayOptions)

        const mainText = document.createTextNode(texto)
        const mainTextElement = document.createElement("span").appendChild(mainText)

        const closeButton = document.createElement("button")
        closeButton.addEventListener("click", ()=>{
            modalContainerRef.closeModal()
        })

        const textButton = document.createTextNode('Cerrar')
        closeButton.appendChild(textButton)
        
        const msgCardContainer = document.createElement("div")
        msgCardContainer.id = 'msg-card-container'
        msgCardContainer.className = 'msg-card-container'
        msgCardContainer.appendChild(mainTextElement)
        msgCardContainer.appendChild(closeButton)
        modalContainerRef.current.appendChild(msgCardContainer)
        modalContainerRef.current.style.display = 'flex'
        modalContainerRef.current.style.justifyContent = 'center'
        modalContainerRef.current.style.alignItems = 'center'
        setOpen(true)
    }

    const closeModal = () => {
        console.log('[useModal].closeModal')
        console.log(modalComponent)
        //modalComponent.current.remove()
        modalContainerRef.current.style.display = 'none'
        const cardContainer = document.getElementById('msg-card-container')
        cardContainer.remove()
        setModalComponent(modalContainerRef)
        setOpen(false)
    }

    useEffect(() => {
        console.log(`[useModal].[useEffect]`)
        if (!modalContainerRef.current) return

        createModal()

        console.log("[useModal].[useEffect].open", open)
        
    }, [modalComponent]);
    
    return modalComponent
    
  }

  export default useModal;