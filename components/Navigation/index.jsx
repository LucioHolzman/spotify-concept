import Link from 'next/link'

const Navigation = () => {
    return (
        <nav style={{"color":"white"}}>
            <ul>
                <li>
                    <Link href="/"><a>Home</a></Link>
                </li>
                <li>
                    <Link href="/about"><a>About</a></Link>
                </li>
                <li>
                    <Link href="/services"><a>Services</a></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
