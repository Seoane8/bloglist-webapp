import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({
  children,
  initVisible = false,
  showLabel = 'show',
  hideLabel = 'hide'
}, ref) => {
  const [visible, setVisible] = useState(initVisible)

  const toggleVisibility = () => setVisible(prevState => !prevState)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  if (!visible) {
    return (
      <div>
        <button onClick={toggleVisibility}>{showLabel}</button>
      </div>
    )
  }

  return (
    <div>
      {children}
      <button onClick={toggleVisibility}>
        {hideLabel}
      </button>
    </div>
  )
})

export default Togglable
