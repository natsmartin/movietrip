interface ButtonProps {
    onClick: () => void,
    label: string
}

export default function Button(props: ButtonProps) {
    return (
        <button type='button' className='text-white bg-gray-800 hover:bg-gray-900 m-2
        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:ml-2
        dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={props.onClick} >
            {props.label}
        </button>
    )
}
