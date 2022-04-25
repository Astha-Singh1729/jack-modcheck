type DateProps = { date: string }

export const Date = ({ date }: DateProps) => {
    return (
        <>
            <div style={{ color: 'white', textAlign: 'center' }}>{date}</div>
        </>
    )
}