import { useState } from 'react';
import { InputText } from 'primereact/inputText';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import useAuth from '../../hooks/useAuth';
import RegisterForm from './RegisterForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const { handleLogin } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 ">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg shadow-md rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="mb-2">
            <i className="pi pi-user-circle text-5xl text-blue-600"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {showRegister ? 'Crear una cuenta' : 'Inicia sesión'}
          </h2>
          <p className="text-gray-600 text-sm">
            {showRegister
              ? 'Complete el formulario para registrarse'
              : 'Ingrese sus credenciales para continuar'}
          </p>
        </div>

        {showRegister ? (
          <RegisterForm onSuccess={() => setShowRegister(false)} />
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Correo electrónico
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-envelope mx-3"></i>
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-6"
                  required
                />
              </span>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Contraseña
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                toggleMask
                className="w-full  block"
                inputClassName="w-full"
                feedback={false}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 focus:ring focus:ring-blue-200"
                />
                Recordarme
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              label="Iniciar sesión"
              type="submit"
              className="w-full"
              style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
            />
          </form>
        )}

        <Divider align="center">
          <span className="text-gray-500 text-sm">O</span>
        </Divider>

        <div className="text-center">
          <Button
            label={showRegister ? 'Ya tengo una cuenta' : '¿No tienes cuenta? Regístrate'}
            onClick={() => setShowRegister(!showRegister)}
            className="p-button-text text-blue-600 hover:text-blue-800"
          />
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
