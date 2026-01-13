import { assets } from "../assets/assets"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus assumenda voluptatibus ad molestiae eius tempora similique debitis eaque atque iusto labore, fugiat qui ab optio quos ea! Molestias, minus neque.
                    </p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/about'><li>About us</li></Link>
                        <Link to='/orders'><li>Delivery</li></Link>
                        <Link to='/about'><li>Privacy Policy</li></Link>
                        <Link to='/contact'><li>Contact</li></Link>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600" >
                        <li>+91 98521 54789</li>
                        <li>contact@foreveryou.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2025@ foreveryou.com - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer