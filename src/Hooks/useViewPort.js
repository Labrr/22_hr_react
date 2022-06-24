import { useEffect, useRef, useState } from "react"

const useViewPort = () => {
  const ref = useRef (null)

  const [viewport, setViewport] = useState ({
    "maxHeight": "100vh",
    "maxWidth": "100vw"
  })

  const updateViewport = () => {
    setViewport ({
      "maxHeight": window.visualViewport.height,
      "maxWidth": window.visualViewport.width
    })
    window.scrollTo (0, ref.current.offsetTop)
  }

  useEffect (() => {
    if (
      typeof window !== "undefined"
        && typeof window.visualViewport !== "undefined"
    ) {
      updateViewport ()

      window.visualViewport.addEventListener ("resize", updateViewport)

      return () =>
        window.visualViewport.removeEventListener ("resize", updateViewport)
    }
  }, [])

  return [viewport]
}

export default useViewPort