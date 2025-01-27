import { UserModel } from '@/types/userType';
import React, { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import axios from 'axios';
import { getMiddleInitial } from '@/utils/CommonFunctions';

const AvailableStaff: React.FC = () => {
    const [availableStaff, setAvailableStaff] = useState<UserModel[]>([]);
    const [filteredavailableStaff, setFilteredAvailableStaff] = useState<UserModel[]>([]);
    const token: string | null = localStorage.getItem('token');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getStaff();
    }, []);

    const handleRefresh = () => {
        getStaff();
    }

    const getStaff = async () => {
        setLoading(true);
        const response = await axios.get("/api/users/getAvailableStaff", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            setAvailableStaff(response.data.staff);
            setFilteredAvailableStaff(response.data.staff);
        }
        setLoading(false);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        const filteredData = availableStaff.filter(staff =>
            staff.firstname?.toLowerCase().includes(value) ||
            staff.lastname?.toLowerCase().includes(value) ||
            staff.contact_number?.toLowerCase().includes(value) ||
            staff.address?.toLowerCase().includes(value)
        );
        setFilteredAvailableStaff(filteredData);
    };

    const columns: TableColumn<UserModel>[] = [
        {
            name: 'Staff Name',
            selector: (row: UserModel) => `${row.firstname || ''} ${getMiddleInitial(row.middlename || '')} ${row.lastname || ''} ${row.extension || ''}`,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row: UserModel) => row.gender || '',
            sortable: true,
        },
        {
            name: 'Contact No.',
            selector: (row: UserModel) => row.contact_number || '', // Provide a default value
            sortable: true,
        }
        ,
        {
            name: 'Position',
            selector: (row: UserModel) => row.position || 'None', // Provide a default value
            sortable: true,
        }
    ];


    return (
        <>
            <div className='m-3'>
                <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                    <div className="card-body p-0">
                        <div className='flex justify-between p-5 pb-0 px-5'>
                            <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mb-[2px]">
                                    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                </svg>
                                Available Staff
                            </h1>
                            <div className='flex gap-1'>
                                <button className='btn btn-ghost btn-sm' onClick={() => handleRefresh()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <input
                                    type="search"
                                    placeholder="Search"
                                    onChange={handleSearch}
                                    className="input input-bordered input-sm w-full max-w-xs"
                                />
                            </div>
                        </div>
                        <div className='pb-5 px-5'>
                            <DataTable
                                columns={columns}
                                data={filteredavailableStaff}
                                pagination
                                highlightOnHover
                                paginationPerPage={10}
                                noHeader
                                // dense
                                striped
                                paginationRowsPerPageOptions={[10, 20, 30]}
                                persistTableHead={true}
                                progressPending={loading}
                                progressComponent={<span className="loading loading-spinner text-info mt-2"></span>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AvailableStaff
