import React from 'react';
import { Product } from '../../types/Product';
import Image from 'next/image';
import { formatToCurrencyBRL } from '../../utils/format';
import { PiPenFill, PiTrash } from 'react-icons/pi';
import { BiPencil } from 'react-icons/bi';

interface ProductCardProps {
    product: Product;
    onEdit: () => void;
    onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    return (
        <div className="border p-4 rounded shadow-sm flex items-center bg-white">
            <div className="flex-shrink-0 mr-4">
                {product.image && (
                    <Image src={decodeURIComponent(product.image)} alt={product.name} width={100} height={100} className="object-cover rounded" />
                )}
            </div>
            <div className="flex-grow">
                <h2 className="text-sm font-bold text-zinc-500">{product.brand}</h2>
                <h3 className="text-md font-bold text-zinc-700">{product.name}</h3>
                <p>{formatToCurrencyBRL(product.price)}</p>
            </div>
            <div className="ml-4 flex-shrink-0 text-xl flex items-start">
                <span onClick={onEdit} className="text-zinc-500 px-2 py-1 rounded mr-2 hover:text-zinc-700 cursor-pointer">
                    <BiPencil />
                </span>
                <span onClick={onDelete} className="text-red-500 px-2 py-1 rounded hover:text-zinc-700 cursor-pointer">
                    <PiTrash />
                </span>
            </div>
        </div>
    );
}

export default ProductCard;
