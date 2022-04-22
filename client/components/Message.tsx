type MessageProps = { value: string, color_: string }

export const Message = ({ value, color_ }: MessageProps) => {
    const style = {
        color: color_,
        marginTop: '2vh',
    }
    return (
        <>
            <div style={style}>{value}</div>
        </>
    )
}
