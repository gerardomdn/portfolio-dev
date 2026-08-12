"use client";
import React, {useEffect,useRef,useState,useCallback} from "react"

const DEFAULT_CLICKABLES = [
  'a',
  'input[type="text"]',
  'input[type="email"]',
  'input[type="number"]',
  'input[type="submit"]',
  'input[type="image"]',
  'label[for]',
  'select',
  'textarea',
  'button',
  '.link'
]

const IsDevice = (() => {
    if (typeof navigator == 'undefined') return
  
    let ua = navigator.userAgent
  
    return {
      info: ua,
  
      Android() {
        return ua.match(/Android/i)
      },
      BlackBerry() {
        return ua.match(/BlackBerry/i)
      },
      IEMobile() {
        return ua.match(/IEMobile/i)
      },
      iOS() {
        return ua.match(/iPhone|iPad|iPod/i)
      },
      iPad() {
        return (
          ua.match(/Mac/) &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2
        )
      },
      OperaMini() {
        return ua.match(/Opera Mini/i)
      },
  
      /**
       * Any Device
       */
      any() {
        return (
          IsDevice.Android() ||
          IsDevice.BlackBerry() ||
          IsDevice.iOS() ||
          IsDevice.iPad() ||
          IsDevice.OperaMini() ||
          IsDevice.IEMobile()
        )
      }
    }
  })()


function useEventListener(eventName, handler, element = document) {
    const savedHandler = useRef()
  
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])
  
    useEffect(() => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return
  
      const eventListener = (event) => savedHandler.current(event)
  
      element.addEventListener(eventName, eventListener)
  
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    }, [eventName, element])
  }
  
  /**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {string} color - rgb color value
 * @param {number} outerAlpha - level of alpha transparency for color
 * @param {number} innerSize - inner cursor size in px
 * @param {number} innerScale - inner cursor scale amount
 * @param {number} outerSize - outer cursor size in px
 * @param {number} outerScale - outer cursor scale amount
 * @param {object} outerStyle - style object for outer cursor
 * @param {object} innerStyle - style object for inner cursor
 * @param {array}  clickables - array of clickable selectors
 *
 */
function CursorCore({
    outerStyle,
    innerStyle,
    color = '220, 90, 90',
    outerAlpha = 0.3,
    innerSize = 8,
    outerSize = 8,
    outerScale = 6,
    innerScale = 0.6,
    trailingSpeed = 8,
    clickables = DEFAULT_CLICKABLES
  }) {
    const cursorOuterRef = useRef()
    const cursorInnerRef = useRef()
    const requestRef = useRef()
    const previousTimeRef = useRef()
    const coordsRef = useRef({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isActiveClickable, setIsActiveClickable] = useState(false)
    let endX = useRef(0)
    let endY = useRef(0)
  
    /**
     * Primary Mouse move event
     * @param {number} clientX - MouseEvent.clientx
     * @param {number} clientY - MouseEvent.clienty
     */
    const onMouseMove = useCallback(({ clientX, clientY }) => {
      const innerCursor = cursorInnerRef.current
      if (!innerCursor) return

      innerCursor.style.top = `${clientY}px`
      innerCursor.style.left = `${clientX}px`
      endX.current = clientX
      endY.current = clientY
    }, [])
  
    // Outer Cursor Animation Delay
    const animateOuterCursor = useCallback(
      (time) => {
        const outerCursor = cursorOuterRef.current
        if (!outerCursor) return

        if (previousTimeRef.current !== undefined) {
          const coords = coordsRef.current
          coords.x += (endX.current - coords.x) / trailingSpeed
          coords.y += (endY.current - coords.y) / trailingSpeed
          outerCursor.style.top = `${coords.y}px`
          outerCursor.style.left = `${coords.x}px`
        }
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animateOuterCursor)
      },
      [trailingSpeed]
    )
  
    // RAF for animateOuterCursor
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animateOuterCursor)
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current)
        requestRef.current = undefined
        previousTimeRef.current = undefined
      }
    }, [animateOuterCursor])
  
    // Mouse Events State updates
    const onMouseDown = useCallback(() => setIsActive(true), [])
    const onMouseUp = useCallback(() => setIsActive(false), [])
    const onMouseEnterViewport = useCallback(() => setIsVisible(true), [])
    const onMouseLeaveViewport = useCallback(() => setIsVisible(false), [])
  
    useEventListener('mousemove', onMouseMove)
    useEventListener('mousedown', onMouseDown)
    useEventListener('mouseup', onMouseUp)
    useEventListener('mouseover', onMouseEnterViewport)
    useEventListener('mouseout', onMouseLeaveViewport)
  
    // Cursors Hover/Active State
    useEffect(() => {
      const innerCursor = cursorInnerRef.current
      const outerCursor = cursorOuterRef.current
      if (!innerCursor || !outerCursor) return

      if (isActive) {
        innerCursor.style.transform = `translate(-50%, -50%) scale(${innerScale})`
        outerCursor.style.transform = `translate(-50%, -50%) scale(${outerScale})`
      } else {
        innerCursor.style.transform = 'translate(-50%, -50%) scale(1)'
        outerCursor.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }, [innerScale, outerScale, isActive])
  
    // Cursors Click States
    useEffect(() => {
      const innerCursor = cursorInnerRef.current
      const outerCursor = cursorOuterRef.current
      if (!innerCursor || !outerCursor) return

      if (isActiveClickable) {
        innerCursor.style.transform = `translate(-50%, -50%) scale(${
          innerScale * 1.2
        })`
        outerCursor.style.transform = `translate(-50%, -50%) scale(${
          outerScale * 1.4
        })`
      }
    }, [innerScale, outerScale, isActiveClickable])
  
    // Cursor Visibility State
    useEffect(() => {
      const innerCursor = cursorInnerRef.current
      const outerCursor = cursorOuterRef.current
      if (!innerCursor || !outerCursor) return

      if (isVisible) {
        innerCursor.style.opacity = 1
        outerCursor.style.opacity = 1
      } else {
        innerCursor.style.opacity = 0
        outerCursor.style.opacity = 0
      }
    }, [isVisible])
  
    useEffect(() => {
      const clickableEls = document.querySelectorAll(clickables.join(','))
      const handleMouseOver = () => setIsActive(true)
      const handleClick = () => {
        setIsActive(true)
        setIsActiveClickable(false)
      }
      const handleMouseDown = () => setIsActiveClickable(true)
      const handleMouseUp = () => setIsActive(true)
      const handleMouseOut = () => {
        setIsActive(false)
        setIsActiveClickable(false)
      }

      clickableEls.forEach((el) => {
        el.style.cursor = 'none'
        el.addEventListener('mouseover', handleMouseOver)
        el.addEventListener('click', handleClick)
        el.addEventListener('mousedown', handleMouseDown)
        el.addEventListener('mouseup', handleMouseUp)
        el.addEventListener('mouseout', handleMouseOut)
      })

      return () => {
        clickableEls.forEach((el) => {
          el.style.cursor = ''
          el.removeEventListener('mouseover', handleMouseOver)
          el.removeEventListener('click', handleClick)
          el.removeEventListener('mousedown', handleMouseDown)
          el.removeEventListener('mouseup', handleMouseUp)
          el.removeEventListener('mouseout', handleMouseOut)
        })
      }
    }, [clickables])
  
    // Cursor Styles
    const styles = {
      cursorInner: {
        zIndex: 999,
        display: 'block',
        position: 'fixed',
        borderRadius: '50%',
        width: innerSize,
        height: innerSize,
        pointerEvents: 'none',
        backgroundColor: `rgba(${color}, 1)`,
        ...(innerStyle && innerStyle),
        transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
      },
      cursorOuter: {
        zIndex: 999,
        display: 'block',
        position: 'fixed',
        borderRadius: '50%',
        pointerEvents: 'none',
        width: outerSize,
        height: outerSize,
        backgroundColor: `rgba(${color}, ${outerAlpha})`,
        transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
        willChange: 'transform',
        ...(outerStyle && outerStyle)
      }
    }
  
    // Hide the native cursor while this component is mounted.
    useEffect(() => {
      const previousCursor = document.body.style.cursor
      document.body.style.cursor = 'none'
      return () => {
        document.body.style.cursor = previousCursor
      }
    }, [])
  
    return (
      <React.Fragment>
        <div ref={cursorOuterRef} style={styles.cursorOuter} />
        <div ref={cursorInnerRef} style={styles.cursorInner} />
      </React.Fragment>
    )
  }
  
  /**
   * AnimatedCursor
   * Calls and passes props to CursorCore if not a touch/mobile device.
   */
  function AnimatedCursor({
    outerStyle,
    innerStyle,
    color,
    outerAlpha,
    innerSize,
    innerScale,
    outerSize,
    outerScale,
    trailingSpeed,
    clickables
  }) {
    if (typeof navigator !== 'undefined' && IsDevice.any()) {
      return <React.Fragment></React.Fragment>
    }
    return (
      <CursorCore
        outerStyle={outerStyle}
        innerStyle={innerStyle}
        color={color}
        outerAlpha={outerAlpha}
        innerSize={innerSize}
        innerScale={innerScale}
        outerSize={outerSize}
        outerScale={outerScale}
        trailingSpeed={trailingSpeed}
        clickables={clickables}
      />
    )
  }
  
 
export default AnimatedCursor
