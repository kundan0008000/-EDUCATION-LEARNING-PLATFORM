import clsx from 'clsx';

/**
 * Button Component
 * Versatile button component with multiple variants and sizes
 * 
 * @param {Object} props
 * @param {string} props.variant - Button variant (primary, secondary, danger, success, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.isLoading - Show loading state
 * @param {boolean} props.disabled - Disable button
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Button element
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  onClick,
  className,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500 disabled:bg-danger-300',
    success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 disabled:bg-success-300',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:text-gray-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading && <span className="spinner" style={{ width: '16px', height: '16px' }} />}
      {children}
    </button>
  );
};

/**
 * Input Component
 * Form input with label and error handling
 * 
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.error - Error message
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Input element with label and error
 */
export const Input = ({
  label,
  type = 'text',
  placeholder,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'px-4 py-2.5 border border-gray-300 rounded-lg text-base',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-gray-400 transition-all duration-200',
          error && 'border-danger-500 focus:ring-danger-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-danger-500">{error}</p>}
    </div>
  );
};

/**
 * Textarea Component
 * Form textarea with label and error handling
 */
export const Textarea = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  rows = 4,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={clsx(
          'px-4 py-2.5 border border-gray-300 rounded-lg text-base',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-gray-400 transition-all duration-200 resize-none',
          error && 'border-danger-500 focus:ring-danger-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-danger-500">{error}</p>}
    </div>
  );
};

/**
 * Select Component
 * Form select with label and error handling
 */
export const Select = ({
  label,
  options = [],
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          'px-4 py-2.5 border border-gray-300 rounded-lg text-base',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'bg-white transition-all duration-200',
          error && 'border-danger-500 focus:ring-danger-500',
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-danger-500">{error}</p>}
    </div>
  );
};

/**
 * Badge Component
 * Display status badges with different variants
 */
export const Badge = ({ label, variant = 'primary', className }) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    danger: 'bg-danger-100 text-danger-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
};

/**
 * Card Component
 * Flexible card container with optional header and footer
 */
export const Card = ({ title, subtitle, children, footer, className, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{footer}</div>}
    </div>
  );
};

/**
 * Modal Component
 * Flexible modal dialog with header, body, and footer
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-xl border border-gray-200 w-full mx-4',
          sizeClasses[size],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2 justify-end">{footer}</div>}
      </div>
    </div>
  );
};
