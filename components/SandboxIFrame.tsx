import React from 'react';

export default function SandboxIFrame({ innerRef, ...props }) {
  return (
    <iframe
      height={500}
      width={500}
      frameBorder="0"
      sandbox="allow-pointer-lock allow-same-origin allow-scripts"
      ref={props.innerRef}
      {...props}
    />
  );
}
