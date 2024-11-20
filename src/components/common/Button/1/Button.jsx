// // components/common/Button/Button.jsx
// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { 
//   BUTTON_VARIANTS, 
//   BUTTON_SIZES, 
//   BUTTON_TEXTS, 
//   BUTTON_ICONS 
// } from './ButtonTypes';
// import styles from './Button.module.css';

// const Button = memo(function Button({
//   variant = BUTTON_VARIANTS.PRIMARY,
//   size = BUTTON_SIZES.MEDIUM,
//   onClick,
//   disabled = false,
//   className,
//   children,
//   ariaLabel,
//   iconOnly = false,
//   ...props
// }) {
//   const baseClassName = styles.button;
//   const variantClassName = styles[variant];
//   const sizeClassName = styles[size];
//   const iconOnlyClassName = iconOnly ? styles.iconOnly : '';
//   const finalClassName = `${baseClassName} ${variantClassName} ${sizeClassName} ${iconOnlyClassName} ${className || ''}`.trim();

//   const buttonText = !iconOnly && (children || BUTTON_TEXTS[variant]);
//   const Icon = BUTTON_ICONS[variant];

//   return (
//     <button
//       className={finalClassName}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label={ariaLabel || buttonText}
//       {...props}
//     >
//       {Icon && (
//         <span className={styles.icon}>
//           <Icon size={24} />
//         </span>
//       )}
//       {buttonText}
//     </button>
//   );
// });

// Button.propTypes = {
//   variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
//   size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
//   onClick: PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
//   children: PropTypes.node,
//   ariaLabel: PropTypes.string,
//   iconOnly: PropTypes.bool
// };

// export { Button, BUTTON_VARIANTS, BUTTON_SIZES };