import React from 'react';

const MsMobileLogo = (props) => (
  <svg width={props.width || 40} height={props.height || 40} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="30" cy="30" r="28" stroke="#febd69" strokeWidth="4" fill="#232f3e" />
    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="22" fill="#febd69" fontFamily="Arial Black, Arial, sans-serif">Ms</text>
    <text x="50%" y="72%" textAnchor="middle" dy=".3em" fontSize="12" fill="#fff" fontFamily="Arial Black, Arial, sans-serif">Mobile</text>
  </svg>
);

export default MsMobileLogo;
