import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputText';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/userService';
import { Company, getCompanies } from '../../services/companyService';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    password: '',
    id_empresa: '',
  });

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    if (id) {
      fetchUser();
    } else {
      fetchCompanies();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await getUserById(Number(id));
      setUser({
        nombre_completo: data.nombre_completo,
        email: data.email,
        telefono: data.telefono,
        password: '',
        id_empresa: data.id_empresa, 
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        const updatePayload = {
          nombre_completo: user.nombre_completo,
          telefono: user.telefono,
          password: user.password,
        };
        await updateUser(Number(id), updatePayload);
      } else {

        const createPayload = {
          nombre_completo: user.nombre_completo,
          email: user.email,
          telefono: user.telefono,
          password: user.password,
          id_empresa: Number(user.id_empresa),
          roles:[]
        };
        console.log(createPayload);

        await createUser(createPayload);
      }
      navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-xl shadow-lg rounded-xl bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {id ? 'Actualizar Usuario' : 'Crear Usuario'}
          </h2>
          <Divider className="my-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-user px-3" />
                <InputText
                  id="nombre_completo"
                  value={user.nombre_completo}
                  onChange={(e) => setUser({ ...user, nombre_completo: e.target.value })}
                  className="w-full p-3  px-6 rounded-lg"
                  required
                />
              </span>
            </div>

            {/* Mostrar estos campos solo en creación */}
            {!id && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <span className="p-input-icon-left w-full">
                    <i className="pi pi-envelope px-3" />
                    <InputText
                      id="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full p-3  px-6 rounded-lg"
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
                    value={user.id_empresa}
                    options={companies.map((company) => ({
                      label: company.nombre,
                      value: company.id_empresa,
                    }))}
                    onChange={(e) => setUser({ ...user, id_empresa: e.value })}
                    placeholder="Selecciona una empresa"
                    className="w-full p-inputtext-sm rounded-lg p-2"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-phone px-3" />
                <InputText
                  id="telefono"
                  value={user.telefono}
                  onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                  className="w-full p-3 px-6 rounded-lg "
                  required
                />
              </span>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              
              <Password
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                toggleMask
                className="w-full p-password-input rounded-lg block"
                inputClassName="w-full p-3 rounded-lg"
                feedback={false}
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between"> 
            <Button
              label={id ? 'Actualizar' : 'Crear'}
              icon={id ? "pi pi-refresh" : "pi pi-plus"}
              type="submit"
              className="w-1/2 p-3 font-medium rounded-lg text-center transition-colors duration-200 mr-2" 
              style={{ background: '#3B82F6', borderColor: '#3B82F6'}}
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => window.history.back()}
              className="w-1/2 p-3 font-medium rounded-lg text-center transition-colors duration-200 bg-gray-200 text-gray-700"
              style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;
