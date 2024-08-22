import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../api/services/productService';
import { Product } from '../../types/Product';
import ProductModal from '../ProductModal';
import ProductCard from '../ProductCard';
import Sidebar from '../Sidebar'; // Importar o Sidebar
import { Pagination } from '../Pagination';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(12);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchQuery]);

    const fetchProducts = async () => {
        const data = await getProducts(searchQuery, currentPage, itemsPerPage);
        setProducts(data.data);
        setTotalPages(data.totalPages);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Resetar a página ao pesquisar
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex">
            <Sidebar /> {/* Adicionar o Sidebar */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Produtos</h1>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => { setSelectedProduct(null); setModalOpen(true); }}
                    >
                        Adicionar Produto
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="mb-4 p-2 border rounded"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={() => handleEdit(product)}
                            onDelete={() => handleDelete(product.id)}
                        />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    total={totalPages}
                    changePage={handlePageChange}
                    perPage={itemsPerPage}
                />
                {modalOpen && (
                    <ProductModal
                        product={selectedProduct || undefined}
                        onClose={closeModal}
                        onRefresh={fetchProducts}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductList;
