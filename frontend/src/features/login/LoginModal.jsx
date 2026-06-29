import { useState } from 'react';
import { Button, Modal } from '@heroui/react';

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal>
      <Modal.Trigger>
        <Button color="primary" variant="solid" className="bg-red-600 text-white font-bold hover:bg-red-700">
          Iniciar sesión
        </Button>
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">
            <Modal.Header>
              <Modal.Heading className="text-2xl font-bold text-foreground">
                Iniciá sesión
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="font-body-main text-body-main text-text-secondary mb-4">
                Ingresá tus datos para acceder a tu cuenta.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-cta-label text-cta-label text-on-surface" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@email.com"
                    className="h-14 px-5 rounded-full border border-outline-variant bg-surface text-on-surface font-body-main text-body-main focus:outline-none focus:border-primary transition-colors placeholder:text-secondary-fixed-dim shadow-sm"
                  />
                </div>

                {/* Contraseña */}
                <div className="flex flex-col gap-2">
                  <label className="font-cta-label text-cta-label text-on-surface" htmlFor="login-password">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-14 px-5 pr-14 rounded-full border border-outline-variant bg-surface text-on-surface font-body-main text-body-main focus:outline-none focus:border-primary transition-colors placeholder:text-secondary-fixed-dim shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-on-surface transition-colors"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  className="w-full h-14 rounded-full font-cta-label text-cta-label mt-1"
                >
                  Iniciar sesión
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer className="flex flex-col items-center gap-2">
              <p className="font-body-main text-body-main text-text-secondary">
                ¿Olvidaste tu contraseña?{' '}
                <a href="#" className="text-primary hover:underline">
                  Recuperala acá
                </a>
              </p>
              <Button variant="ghost" className="w-full" slot="close">
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
