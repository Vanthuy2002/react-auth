import PropTypes from 'prop-types'
export default function Toasty({ title, status, onClose }) {
  return (
    <>
      {status && (
        <div className='fixed top-5 left-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400'>
          <div className='ms-3 text-sm font-normal'>{title}</div>
          <button
            onClick={onClose}
            className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8'
          >
            X
          </button>
        </div>
      )}
    </>
  )
}
Toasty.propTypes = {
  title: PropTypes.string,
  status: PropTypes.bool,
  onClose: PropTypes.func
}
