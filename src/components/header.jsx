export default function Header(props) {
    return (
        <div className="text-left mb-8">
            <span className="block font-bold text-neutral-50 text-xl leading-relaxed">{props.title}</span>
            <span className="block text-sm text-neutral-400">
                {props.children}
            </span>
        </div>
    )
}