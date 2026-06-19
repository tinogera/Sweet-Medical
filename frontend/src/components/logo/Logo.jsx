const Logo = ({ color = "oklch(57.42% 0.2339 26.83)", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
      role="img"
      aria-label="Sweet Medical"
      fill={color}
    >
      <defs>
        <path
          id="petalo"
          d="M 30,30 L 135,30 A 105,105 0 0,1 240,135 L 240,210 A 30,30 0 0,1 210,240 L 135,240 A 105,105 0 0,1 30,135 Z"
          fill={color}
        />
      </defs>
      <g>
        <use href="#petalo" />
        <use href="#petalo" transform="rotate(90, 250, 250)" />
        <use href="#petalo" transform="rotate(180, 250, 250)" />
        <use href="#petalo" transform="rotate(270, 250, 250)" />
      </g>
    </svg>
  );
};

export default Logo;
