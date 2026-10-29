import React from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App.jsx'
import './index.css'

// Google Translate replaces text nodes behind React's back; when React later removes or inserts
// next to a node that Google moved, the browser throws and the page goes blank. Ignore those
// mismatched calls (the well-known patch for React + Google Translate).
if (typeof Node === 'function' && Node.prototype) {
  const removeChild = Node.prototype.removeChild
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child
    return removeChild.call(this, child)
  }
  const insertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node
    return insertBefore.call(this, node, ref)
  }
}
createRoot(document.getElementById('root')).render(
  <React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>
)
