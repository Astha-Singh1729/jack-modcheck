import { CSSProperties } from "react"

type MessageProps = { value: string, color_: string }

export const Message = ({ value, color_ }: MessageProps) => {
    const style: CSSProperties = {
        color: color_,
        marginTop: '2vh',
        whiteSpace: 'pre-line'
    }
    return (
        <>
            <div style={style}>{value}</div>
        </>
    )
}
