import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NavBar() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="nav-bar">
                    <img className="nav-img" src="https://res.cloudinary.com/df5etts2d/image/upload/v1663618941/Untitled-1_pmjsvt.png"></img>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
