import { useState, useEffect} from 'react';
import { InputText } from 'primereact/inputText';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { registerUser } from '../../services/authService';
import { Company, getCompanies } from '../../services/companyService';
import { Dropdown } from 'primereact/dropdown';

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [idEmpresa, setIdEmpresa] = useState(0);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser({
        nombre_completo: nombreCompleto,
        email,
        telefono,
        password,
        id_empresa: idEmpresa,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {

        fetchCompanies();

    });

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col ">
        <label htmlFor="nombreCompleto" className=" text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <span className="p-input-icon-left w-full">
          <i className="pi pi-user px-3" />
          <InputText
            id="nombreCompleto"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            placeholder="Ingresa tu nombre completo"
            className="w-full p-3 px-6"
            required
          />
        </span>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
          Correo electrónico
        </label>
        <span className="p-input-icon-left w-full">
          <i className="pi pi-envelope px-3" />
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="w-full p-3 px-6"
            required
          />
        </span>
      </div>

      <div className="flex flex-col">
        <label htmlFor="telefono" className="text-sm font-medium text-gray-700 mb-1">
          Teléfono
        </label>
        <span className="p-input-icon-left w-full">
          <i className="pi pi-phone px-3" />
          <InputText
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Tu número de teléfono"
            className="w-full p-3 px-6"
            required
          />
        </span>
      </div>
      <div>
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
          Empresa
        </label>
        <Dropdown
          id="empresa"
          value={idEmpresa}
          options={companies.map((company) => ({
            label: company.nombre,
            value: company.id_empresa,
          }))}
          onChange={(e) => setIdEmpresa(e.value)}
          placeholder="Selecciona una empresa"
          className="w-full p-inputtext-sm rounded-lg p-2"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 col-2">
          Contraseña
        </label>
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crea una contraseña segura"
          toggleMask
          className="w-full block"
          inputClassName="w-full p-3"
          feedback={true}
          required
          autoComplete="current-password"
        />
      </div>

      <div className="pt-4">
        <Button
          label="Crear cuenta"
          type="submit"
          className="w-full p-3 font-medium"
          loading={loading}
          style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
        />
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        Al registrarte, aceptas nuestros <a href="#" className="text-blue-600 hover:underline">Términos de servicio</a> y <a href="#" className="text-blue-600 hover:underline">Política de privacidad</a>
      </p>
    </form>
  );
};

export default RegisterForm;