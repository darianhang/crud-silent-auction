import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NavBar() {
    return (
        <AnimatePresence>
            <motion.div
                className="nav-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="nav-bar">
                    <div className="pseudo"></div>
                    <img className="nav-img" src="https://res.cloudinary.com/df5etts2d/image/upload/v1664317138/logo_fuhhkx.png"></img>
                    <a href="https://my-site-102728-103753.square.site/">
                        <button className="donate-button">Donate</button>
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
