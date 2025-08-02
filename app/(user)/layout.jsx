import React from 'react'
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';

const userLayout = ({children}) => {
  return (
    <div>
        {children}
        <Toaster 
          position="top-right" 
          expand={false}
          richColors
          closeButton
        />
    </div>
  )
}

export default userLayout