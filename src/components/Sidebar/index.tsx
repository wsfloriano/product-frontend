import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Sidebar: React.FC = () => {

    return (
        <div className="w-64 h-screen bg-white text-zinc-800 p-6">
            <div className="flex items-center justify-center mb-6">
                <Image src="/logo.png" alt="Logo" width={150} height={80} />
            </div>
            <nav>
                <ul>
                    <li
                        className="cursor-pointer mb-2 hover:bg-zinc-700 p-2 rounded font-semibold hover:text-white"
                    >
                        <Link href="/">
                            Produtos
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
