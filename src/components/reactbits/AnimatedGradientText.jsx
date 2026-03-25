'use client';

export default function AnimatedGradientText({ as: Tag = 'span', className = '', children }) {
  return (
    <Tag className={`relative inline-block bg-clip-text text-transparent ${className}`}>
      <span className="animated-gradient-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-[length:200%_200%] bg-clip-text text-transparent">
        {children}
      </span>
    </Tag>
  );
}
