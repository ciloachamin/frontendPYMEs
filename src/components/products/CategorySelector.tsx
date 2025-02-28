// src/components/products/CategorySelector.tsx

import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/categoryService'; // Importar desde services

interface CategorySelectorProps {
  value: number | string;
  onChange: (value: number) => void;
}

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  const [categories, setCategories] = useState<{ id_categoria: number; nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Cargando categorías...</div>;

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border p-2 rounded-md"
    >
      <option value="">Seleccione una categoría</option>
      {categories.map((category) => (
        <option key={category.id_categoria} value={category.id_categoria}>
          {category.nombre}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;