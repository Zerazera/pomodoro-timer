import ControlButton from "./ControlButton"
import { useRef, useEffect, type ReactNode } from "react"

export default function MouseDownButton({ onClick, isDisabled, children, id }: {onClick: () => void, isDisabled: boolean, children: ReactNode, id: string}) {
    const documentRef = useRef(document)
    const timeoutRef = useRef(0)
    const intervalRef = useRef(0)

    const handleMouseDown = () => timeoutRef.current = setTimeout(() => intervalRef.current = setInterval(onClick, 100), 500)
    const handleMouseUp = () => {
        clearTimeout(timeoutRef.current)
        clearInterval(intervalRef.current)
    }

    useEffect(() => {
        documentRef.current.addEventListener('mouseup', handleMouseUp)

        return () => documentRef.current.removeEventListener('mouseup', handleMouseUp)
    }, [])

    return (
        <ControlButton id={id} onClick={onClick} onMouseDown={handleMouseDown} disabled={isDisabled}>{children}</ControlButton>
    )
}