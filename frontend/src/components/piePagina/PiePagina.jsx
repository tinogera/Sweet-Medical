const PiePagina = () => {
  return (
    <footer className="bg-bg-dark dark:bg-black w-full py-section-padding px-margin-mobile md:px-gutter flex flex-col md:flex-row justify-between items-start gap-8">
      <div>
        <div className="font-h3-subtitle text-h3-subtitle text-white mb-4">SWISS MEDICAL</div>
        <p className="font-body-sm text-body-sm text-text-dark-mode">© 2024 Swiss Medical Group. Todos los derechos reservados.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Términos y Condiciones</a>
        <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Privacidad</a>
        <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Defensa del Consumidor</a>
        <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Ética y Cumplimiento</a>
      </div>
    </footer>
  );
};

export default PiePagina;