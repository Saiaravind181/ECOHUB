export const TextLink = ({ text, linkTo }) => {
    return <a href={linkTo} 
    className="text-sm underline m-2 text-secondary font-semibold">
        {text}
    </a>   
}