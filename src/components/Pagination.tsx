import React from 'react';

interface PaginationProps {
    currentPage: number;
    perPage: number;
    siblingsCount?: number;
    total: number;
    changePage(page: number): void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    perPage,
    total,
    siblingsCount = 4,
    changePage
}) => {
    const lastPage = total;

    const pagesArray = (from: number, to: number) => {
        return [...new Array(to - from)]
            .map((_, index) => {
                return from + index + 1;
            })
            .filter(page => page > 0);
    }

    const previousPages = currentPage > 1
        ? pagesArray((currentPage - 1 - siblingsCount), (currentPage - 1))
        : [];

    const nextPages = currentPage < lastPage
        ? pagesArray(currentPage, (Math.min(currentPage + siblingsCount, lastPage)))
        : [];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {lastPage < 1 && null}

            {lastPage > 1 &&
                <>
                    <div className='w-full flex justify-center items-center gap-3 pb-5'>

                        {previousPages.map(page => (
                            <button
                                className='text-black border border-zinc-500 rounded px-2 py-2 min-w-[50px] w-[50px] transform bg-transparent font-light cursor-pointer hover:border-primary hover:bg-zinc-500 hover:text-white transition-all duration-200 ease-in-out'
                                key={page}
                                onClick={() => { changePage(page); scrollToTop(); }}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className='text-primary border border-primary rounded px-2 py-2 min-w-[50px] w-[50px] transform bg-transparent font-light cursor-pointer'
                            onClick={() => { changePage(currentPage); scrollToTop(); }}
                        >
                            {currentPage}
                        </button>

                        {nextPages.map(page => (
                            <button
                                className='text-black border border-zinc-500 rounded px-2 py-2 min-w-[50px] w-[50px] transform bg-transparent font-light cursor-pointer hover:border-primary hover:bg-zinc-500 hover:text-white transition-all duration-200 ease-in-out'
                                key={page}
                                onClick={() => { changePage(page); scrollToTop() }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </>
            }
        </>
    );
}
