'use client'
import React from 'react'
import {motion,useAnimate,useInView} from 'framer-motion'
import {useEffect} from 'react'
import { easeIn } from 'framer-motion/dom'
export default function Frammer({children}:{children:React.ReactNode}) {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

  useEffect(() => {
    
    if(isInView){
        // animate(scope.current, { opacity: 0 ,y:16}, { duration: 0.5 })
        animate(scope.current, { opacity: 1,y:0 }, { duration: 1,ease:easeIn })
    }
  },[isInView])
  return (
    <motion.div ref={scope}
    initial={{opacity:0,y:20}}
    // animate={{opacity:1,y:0}}
    // transition={{delay:0.7,ease:easeIn}}
    >
      {children}
    </motion.div>
  )
}
