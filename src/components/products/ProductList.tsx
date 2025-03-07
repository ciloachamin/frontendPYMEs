import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { getProducts, deleteProduct, Product, ProductFilters } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import { Category, getCategories } from '../../services/categoryService';
import { Company, getCompanies } from '../../services/companyService';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';

type Severity = "danger" | "success" | "info" | "warning" | "secondary" | "contrast" | null | undefined;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    categoriaId: null,
    empresaId: null,
    minPrecio: null,
    maxPrecio: null,
    limit: 10,
    offset: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCompanies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(filters);
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
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

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (key: keyof ProductFilters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      categoriaId: null,
      empresaId: null,
      minPrecio: null,
      maxPrecio: null,
      limit: 10,
      offset: 0,
    });
  };

  // Formatear el precio con el símbolo de moneda
  const priceTemplate = (rowData: Product) => {
    return `$${parseFloat(Number(rowData.precio_venta).toString()).toFixed(2)}`;
  };

  // Plantilla para el estado del stock
  const stockTemplate = (rowData: Product) => {
    const stock = rowData.stock_actual;
    let severity: Severity = 'success'; // Tipar como Severity
    
    if (stock <= 5) {
      severity = 'danger';
    } else if (stock <= 20) {
      severity = 'warning';
    }
    
    return <Tag value={stock} severity={severity} />;
  };

  // Plantilla para las acciones
  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div className="flex justify-center gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-outlined"
          onClick={() => navigate(`/products/edit/${rowData.id_producto}`)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-outlined p-button-danger"
          onClick={() => handleDelete(Number(rowData.id_producto))}
        />
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card className="shadow-sm border-0 mb-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light text-gray-700">Filtros</h3>
            <Button 
              icon="pi pi-filter-slash" 
              className="p-button-text p-button-sm" 
              onClick={clearFilters}
              tooltip="Limpiar filtros"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Dropdown
                value={filters.categoriaId}
                options={categories}
                optionLabel="nombre"
                optionValue="id_categoria"
                placeholder="Categoría"
                onChange={(e) => handleFilterChange('categoriaId', e.value)}
                className="w-full p-inputtext-sm"
                showClear
              />
            </div>
            
            <div>
              <Dropdown
                value={filters.empresaId}
                options={companies}
                optionLabel="nombre"
                optionValue="id_empresa"
                placeholder="Empresa"
                onChange={(e) => handleFilterChange('empresaId', e.value)}
                className="w-full p-inputtext-sm"
                showClear
              />
            </div>
            
            <div>
              <InputNumber
                placeholder="Precio mínimo"
                value={filters.minPrecio}
                onValueChange={(e) => handleFilterChange('minPrecio', e.value)}
                className="w-full p-inputtext-sm"
                mode="currency"
                currency="USD"
                locale="es-MX"
                minFractionDigits={0}
              />
            </div>
            
            <div>
              <InputNumber
                placeholder="Precio máximo"
                value={filters.maxPrecio}
                onValueChange={(e) => handleFilterChange('maxPrecio', e.value)}
                className="w-full p-inputtext-sm"
                mode="currency"
                currency="USD"
                locale="es-MX"
                minFractionDigits={0}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="shadow-sm border-0">
        <DataTable 
          value={products} 
          paginator 
          rows={10} 
          emptyMessage="No se encontraron productos"
          className="p-datatable-sm"
          responsiveLayout="scroll"
          stripedRows
          showGridlines={false}
          rowHover
        >
          <Column field="codigo_barras" header="Código de Barras" sortable />
          <Column field="nombre" header="Nombre" sortable />
          <Column field="descripcion" header="Descripción" />
          <Column field="categoria.nombre" header="Categoría" sortable />
          <Column field="precio_venta" header="Precio" body={priceTemplate} sortable />
          <Column field="stock_actual" header="Stock" body={stockTemplate} sortable />
          <Column field="empresa.nombre" header="Empresa" sortable />
          <Column body={actionBodyTemplate} header="Acciones" style={{ width: '120px' }} />
        </DataTable>
      </Card>
    </div>
  );
};

export default ProductList;