import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputText';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { getCompanies } from '../../services/companyService';
import { getSuppliers } from '../../services/supplierService';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const ProductForm = () => {
  const { id } = useParams(); // Obtener el ID del producto si está en modo edición
  const navigate = useNavigate();

  // Estado del producto
  const [product, setProduct] = useState({
    codigo_barras: '',
    nombre: '',
    descripcion: '',
    id_categoria: '',
    precio_compra: null,
    precio_venta: null,
    stock_minimo: null,
    stock_maximo: null,
    id_empresa: '',
    id_proveedor: '',
  });

  // Datos para los dropdowns
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, companiesData, suppliersData] = await Promise.all([
          getCategories(),
          getCompanies(),
          getSuppliers(),
        ]);
        setCategories(categoriesData);
        setCompanies(companiesData);
        setSuppliers(suppliersData);

        // Si estamos en modo edición, cargar los datos del producto
        if (id) {
          const productData = await getProductById(id);
          setProduct({
            ...productData,
            id_categoria: productData.categoria.id_categoria,
            id_empresa: productData.empresa.id_empresa,
            id_proveedor: productData.proveedor.id_proveedor,
          });
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [id]);

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Modo edición: Actualizar solo los campos permitidos
        const { nombre, precio_venta, stock_minimo } = product;
        await updateProduct(id, { nombre, precio_venta, stock_minimo });
      } else {
        // Modo creación: Crear un nuevo producto
        await createProduct(product);
      }
      navigate('/products'); // Redirigir a la lista de productos
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-xl shadow-lg rounded-xl bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {id ? 'Actualizar Producto' : 'Crear Producto'}
          </h2>
          <Divider className="my-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            {/* Código de Barras */}
            <div>
              <label htmlFor="codigo_barras" className="block text-sm font-medium text-gray-700 mb-1">
                Código de Barras
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-barcode px-3" />
                <InputText
                  id="codigo_barras"
                  value={product.codigo_barras}
                  onChange={(e) => setProduct({ ...product, codigo_barras: e.target.value })}
                  className="w-full p-3 px-6 rounded-lg"
                  required
                  disabled={!!id} // Deshabilitar en modo edición
                />
              </span>
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-tag px-3" />
                <InputText
                  id="nombre"
                  value={product.nombre}
                  onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
                  className="w-full p-3 px-6 rounded-lg"
                  required
                />
              </span>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <span className="p-input-icon-left w-full">
                <i className="pi pi-align-left px-3" />
                <InputText
                  id="descripcion"
                  value={product.descripcion}
                  onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
                  className="w-full p-3 px-6 rounded-lg"
                  required
                />
              </span>
            </div>

            {/* Categoría */}
            <div>
              <label htmlFor="id_categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <Dropdown
                id="id_categoria"
                value={product.id_categoria}
                options={categories.map((category) => ({
                  label: category.nombre,
                  value: category.id_categoria,
                }))}
                disabled={!!id}
                onChange={(e) => setProduct({ ...product, id_categoria: e.value })}
                placeholder="Seleccione una categoría"
                className="w-full p-inputtext-sm rounded-lg p-2"
                required
              />
            </div>

            {/* Precio de Compra */}
            <div>
              <label htmlFor="precio_compra" className="block text-sm font-medium text-gray-700 mb-1">
                Precio de Compra
              </label>
              <InputNumber
                id="precio_compra"
                value={product.precio_compra}
                onValueChange={(e) => setProduct({ ...product, precio_compra: e.value })}
                mode="currency"
                currency="USD"
                className="w-full p-3 px-6 rounded-lg"
                required
                disabled={!!id}
              />
            </div>

            {/* Precio de Venta */}
            <div>
              <label htmlFor="precio_venta" className="block text-sm font-medium text-gray-700 mb-1">
                Precio de Venta
              </label>
              <InputNumber
                id="precio_venta"
                value={product.precio_venta}
                onValueChange={(e) => setProduct({ ...product, precio_venta: e.value })}
                mode="currency"
                currency="USD"
                className="w-full p-3 px-6 rounded-lg"
                required
                disabled={!!id}
              />
              
            </div>

            {/* Stock Mínimo */}
            <div>
              <label htmlFor="stock_minimo" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Mínimo
              </label>
              <InputNumber
                id="stock_minimo"
                value={product.stock_minimo}
                onValueChange={(e) => setProduct({ ...product, stock_minimo: e.value })}
                className="w-full p-3 px-6 rounded-lg"
                required
              />
            </div>

            {/* Stock Máximo */}
            <div>
              <label htmlFor="stock_maximo" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Máximo
              </label>
              <InputNumber
                id="stock_maximo"
                value={product.stock_maximo}
                onValueChange={(e) => setProduct({ ...product, stock_maximo: e.value })}
                className="w-full p-3 px-6 rounded-lg"
                required
                disabled={!!id}
              />
            </div>

            {/* Empresa */}
            <div>
              <label htmlFor="id_empresa" className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <Dropdown
                id="id_empresa"
                value={product.id_empresa}
                options={companies.map((company) => ({
                  label: company.nombre,
                  value: company.id_empresa,
                }))}
                onChange={(e) => setProduct({ ...product, id_empresa: e.value })}
                placeholder="Seleccione una empresa"
                className="w-full p-inputtext-sm rounded-lg p-2"
                required
                disabled={!!id}
              />
            </div>

            {/* Proveedor */}
            <div>
              <label htmlFor="id_proveedor" className="block text-sm font-medium text-gray-700 mb-1">
                Proveedor
              </label>
              <Dropdown
                id="id_proveedor"
                value={product.id_proveedor}
                options={suppliers.map((supplier) => ({
                  label: supplier.nombre,
                  value: supplier.id_proveedor,
                }))}
                onChange={(e) => setProduct({ ...product, id_proveedor: e.value })}
                placeholder="Seleccione un proveedor"
                className="w-full p-inputtext-sm rounded-lg p-2"
                required
                disabled={!!id}
              />
            </div>
          </div>

          {/* Botones */}
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
              onClick={() => navigate('/products')}
              className="w-1/2 p-3 font-medium rounded-lg text-center transition-colors duration-200 bg-gray-200 text-gray-700"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;