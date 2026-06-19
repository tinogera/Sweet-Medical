import { Link } from "react-router-dom";

const BusquedasEspecificas = ({ icon, title, description, to }) => {
  return (
    <Link to={to} className="block bg-bg-alternate rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-surface-container hover:shadow-sm group border border-transparent hover:border-outline-variant">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
        <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-3">{title}</h2>
      <p className="font-body-sm text-body-sm text-text-secondary mb-6">{description}</p>
    </Link>
  );
};

export default BusquedasEspecificas;