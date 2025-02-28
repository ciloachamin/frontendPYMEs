import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputText';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { createSupplier, updateSupplier, getSupplierById } from '../../services/supplierService';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const SupplierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  useEffect(() => {
    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const fetchSupplier = async () => {
    try {
      const data = await getSupplierById(Number(id));
      setSupplier(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateSupplier(Number(id), supplier);
      } else {
        await createSupplier(supplier);
      }
      navigate('/suppliers');
    } catch (error) {
      console.error('Error al guardar el proveedor:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-xl shadow-lg rounded-xl bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {id ? 'Editar Proveedor' : 'Crear Proveedor'}
          </h2>
          <Divider className="my-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-user px-3" />
                <InputText
                  value={supplier.nombre}
                  onChange={(e) => setSupplier({ ...supplier, nombre: e.target.value })}
                  required
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contacto:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-user px-3" />
                <InputText
                  value={supplier.contacto}
                  onChange={(e) => setSupplier({ ...supplier, contacto: e.target.value })}
                  required
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-phone px-3" />
                <InputText
                  value={supplier.telefono}
                  onChange={(e) => setSupplier({ ...supplier, telefono: e.target.value })}
                  required
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-envelope px-3" />
                <InputText
                  value={supplier.email}
                  onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
                  required
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección:
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-map-marker px-3" />
                <InputText
                  value={supplier.direccion}
                  onChange={(e) => setSupplier({ ...supplier, direccion: e.target.value })}
                  required
                  className="w-full p-3 px-6 rounded-lg"
                />
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              label={id ? 'Actualizar' : 'Crear'}
              icon={id ? 'pi pi-refresh' : 'pi pi-plus'}
              type="submit"
              className="w-1/2 p-3 font-medium rounded-lg text-center transition-colors duration-200 mr-2"
              style={{ background: '#3B82F6', borderColor: '#3B82F6' }}
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

export default SupplierForm;