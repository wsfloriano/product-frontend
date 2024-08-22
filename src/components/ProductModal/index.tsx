import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Cleave from 'cleave.js';
import { createProduct, updateProduct } from '../../api/services/productService';
import { Product } from '../../types/Product';

const MySwal = withReactContent(Swal);

interface ProductModalProps {
    product?: Product;
    onClose: () => void;
    onRefresh: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onRefresh }) => {
    const [formData] = useState<FormData>(new FormData());
    const priceInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (product) {
            formData.set('name', product.name);
            formData.set('brand', product.brand);
            formData.set('price', product.price.toString());
            if (product.image) {
                formData.set('image', product.image);
            }
        }
    }, [product, formData]);

    useEffect(() => {
        if (priceInputRef.current) {
            new Cleave(priceInputRef.current, {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                prefix: 'R$ ',

            });
        }
    }, [priceInputRef]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        formData.set(e.target.name, e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            formData.set('image', e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        try {
            if (product) {
                await updateProduct(product.id, formData);
                MySwal.fire('Success', 'Product updated successfully', 'success');
            } else {
                await createProduct(formData);
                MySwal.fire('Success', 'Product created successfully', 'success');
            }
            onRefresh();
            onClose();
        } catch (error) {
            MySwal.fire('Error', 'An error occurred while saving the product', 'error');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {product ? 'Editar Produto' : 'Adicionar Produto'}
                </h2>
                <label className="text-sm text-gray-500">Nome</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    defaultValue={product?.name || ''}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="text-sm text-gray-500">Marca</label>
                <input
                    type="text"
                    name="brand"
                    placeholder="Marca"
                    defaultValue={product?.brand || ''}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="text-sm text-gray-500">Preço</label>
                <input
                    type="text"
                    name="price"
                    placeholder="Preço"
                    defaultValue={product?.price || ''}
                    ref={priceInputRef}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="text-sm text-gray-500">Imagem</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder='Imagem'
                />

                {product?.image && (
                    <img
                        src={decodeURIComponent(product.image)}
                        alt={product.name}
                        className="w-full h-40 object-cover mb-4 rounded"
                    />
                )}
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
