import React from 'react'

interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}


const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
    return (
        <>
            <div className="flex pl-64 justify-center gap-0 py-28 ">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded-md hover:bg-gray-50">Prev</button>
                <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">{page}</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">{page + 1}</button>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
            </div>
        </>
    )
}

export default Pagination
