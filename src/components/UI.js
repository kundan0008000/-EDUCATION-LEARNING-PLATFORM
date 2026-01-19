import React from 'react';
import clsx from 'clsx';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Card Component
 * Flexible container for content grouping
 */
export const Card = ({ children, className, header, footer }) => {
  return (
    <div className={clsx('bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden', className)}>
      {header && <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">{header}</div>}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>}
    </div>
  );
};

/**
 * Badge Component
 * Status and category indicator
 */
export const Badge = ({ children, variant = 'primary', size = 'md', className }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    danger: 'bg-danger-100 text-danger-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={clsx('font-medium rounded-full inline-block', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
};

/**
 * Breadcrumb Component
 * Navigation aid showing current page in hierarchy
 */
export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-primary-600 transition-colors">
        <Home size={18} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

/**
 * Alert Component
 * Display alerts/notifications with different severity levels
 */
export const Alert = ({ type = 'info', title, message, onClose, className }) => {
  const typeClasses = {
    success: 'bg-success-50 border-success-200 text-success-800',
    error: 'bg-danger-50 border-danger-200 text-danger-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    info: 'bg-primary-50 border-primary-200 text-primary-800',
  };

  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-l-4 transition-all duration-200',
        typeClasses[type],
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          {message && <p className="text-sm">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-current hover:opacity-75 transition-opacity"
          >
            <span className="text-xl">&times;</span>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Progress Bar Component
 * Display progress with percentage
 */
export const ProgressBar = ({ value = 0, max = 100, showLabel = true, className }) => {
  const percentage = Math.min(Math.max(value, 0), max);
  const ratio = (percentage / max) * 100;

  return (
    <div className={clsx('w-full', className)}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${ratio}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-2">
          {percentage}% complete
        </p>
      )}
    </div>
  );
};

/**
 * Skeleton Loader Component
 * Placeholder while content is loading
 */
export const Skeleton = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'bg-gray-200 rounded-lg animate-pulse',
            className
          )}
        />
      ))}
    </>
  );
};

/**
 * Empty State Component
 * Display when no content is available
 */
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {Icon && <Icon size={64} className="text-gray-300 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-6 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

/**
 * Tab Component
 * Tabbed interface for organizing content
 */
export const Tabs = ({ tabs, defaultTab = 0, onChange }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 gap-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={clsx(
              'px-4 py-3 font-medium text-sm transition-all duration-200 border-b-2 -mb-px',
              activeTab === index
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};
