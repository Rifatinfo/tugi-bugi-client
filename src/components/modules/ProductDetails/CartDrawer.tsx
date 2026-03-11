"use client";
import  { useEffect } from 'react'
import { XIcon, Trash2Icon } from 'lucide-react'
interface Product {
  name: string
  image: string
  price: number
  quantity: number
  size: string
  color: string
}
interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}
export function CartDrawer({ isOpen, onClose, product }: CartDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  if (!isOpen) return null
  const subtotal = product ? product.price * product.quantity : 0
  const formattedSubtotal = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  })
    .format(subtotal)
    .replace('BDT', 'Tk')
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2
            id="cart-title"
            className="text-lg font-bold text-gray-900 uppercase tracking-wide"
          >
            Shopping Bag
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close cart"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {product ? (
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-20 h-24 flex-shrink-0 bg-gray-50 border border-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h3>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-1 text-sm text-gray-500 space-y-0.5">
                  <p>Size: {product.size || 'Not selected'}</p>
                  <p>Color: {product.color || 'Not selected'}</p>
                  <p>Qty: {product.quantity}</p>
                </div>

                <div className="mt-auto pt-2 text-sm font-bold text-gray-900">
                  Tk{' '}
                  {product.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Your bag is empty.
            </div>
          )}
        </div>

        {/* Footer / Calculation Section */}
        {product && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  {formattedSubtotal}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formattedSubtotal}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white h-12 font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors">
              PROCEED TO CHECKOUT
            </button>

            <div className="text-center pt-2">
              <button
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
