import React, { useState, useEffect } from 'react';
import Avatar from '@images/default.jpg';
import axios from 'axios';
import { UserModel } from '@datatypes/userType';
import AddUserDialog from '@dialogs/userdialogs/AddUserDialog';
import UpdateUserDialog from '@dialogs/userdialogs/UpdateUserDialog';
import ConfirmationDialog from '@dialogs/confirmationdialog/ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';

const ManageUsers: React.FC = () => {
    const token: string | null = localStorage.getItem('token');
    const [originalUsers, setOriginalUsers] = useState<UserModel[]>([]); // Maintain original list
    const [users, setUsers] = useState<UserModel[]>([]);

    const [addUserModal, setAddUserModel] = useState<boolean>(false);
    const [updateUserModal, setUpdateUserModel] = useState<boolean>(false);
    const [activateUserModal, setActivateUserModel] = useState<boolean>(false);

    const dispatch = useDispatch();

    const [confirmData, setConfirmData] = useState({
        buttonColor: "",
        buttonText: "",
        message: "",
    });

    const toggleAddUser = () => {
        setAddUserModel(!addUserModal);
    }
    const toggleUpdateUser = () => {
        setUpdateUserModel(!updateUserModal);
    }
    const toggleActivateUser = () => {
        setActivateUserModel(!activateUserModal);
    }

    const [toUpdate, setToUpdate] = useState<UserModel>({
        firstname: '',
        lastname: '',
        username: '',
        contact_number: '',
        address: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    const AddUserData = (data: UserModel) => {
        setUsers((prevUsers) => [data, ...prevUsers]);
    };

    const UpdateUserData = (data: UserModel) => {
        setUsers((prevUsers) => {
            const index = prevUsers.findIndex((user) => user.id === data.id);
            if (index !== -1) {
                const updatedUsers = [...prevUsers];
                updatedUsers[index] = data;
                return updatedUsers;
            }
            return prevUsers;
        });
    };

    const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === '') {
            // If search input is empty, revert to original list
            setUsers(originalUsers);
        } else {
            const filteredUsers = originalUsers.filter((user) => {
                const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
                return fullName.includes(searchValue);
            });
            setUsers(filteredUsers);
        }
    };

    const HandleUpdateData = (data: UserModel) => {
        setToUpdate(data);
        toggleUpdateUser();
    };

    const ConfirmationModal = (data: UserModel) => {
        setToUpdate(data);
        const Modaldata = {
            buttonColor: `${data.userstatus == 0 ? 'success' : 'error'}`,
            buttonText: `${data.userstatus == 0 ? 'Activate' : 'Deactivate'}`,
            message: `${data.userstatus == 0 ? 'Are you sure you want to activate this user?' : 'Are you sure you want to deactivate this user?'}`,
        };
        setConfirmData(Modaldata);
        toggleActivateUser();
    };

    const HandleActivation = () => {
        ActivationUsers();
    }

    const ActivationUsers = async () => {
        try {
            const response = await axios.put(`/api/users/activation/${toUpdate.id}/${toUpdate.userstatus}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status == 'success') {
                UpdateUserData(response.data.user);
                const message: string = toUpdate.userstatus == 0 ? "Activated Successfully" : "Deactivated Successfully";
                dispatch(setToastState({ toast: true, toastMessage: message, toastSuccess: true }));
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        GetUsers();
    }, []);

    const handleRefresh = () => {
        GetUsers();
    };

    const GetUsers = async () => {
        try {
            const response = await axios.get('/api/users/getUsers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status == 'success') {
                setOriginalUsers(Object.values(response.data.users)); // Set original list
                setUsers(Object.values(response.data.users)); // Set users with fetched data
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            Manage Users
                        </h1>
                        <div className='flex gap-1'>
                            <button className='btn btn-ghost btn-sm' onClick={() => handleRefresh()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <input type="text" placeholder="Search something..." onInput={HandleSearch} className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="overflow-x-auto px-5 pb-5 h-[74vh]">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Address</th>
                                    <th>Contact No.</th>
                                    <th>Status</th>
                                    <th>
                                        <button onClick={() => toggleAddUser()} className='btn btn-success btn-outline btn-xs flex gap-1 px-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                                            </svg>
                                            User
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={Avatar} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{`${user.firstname} ${user.lastname}`}</div>
                                                    <div className="text-sm opacity-50">{user.gender}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.usertype == 0 ?
                                                'Admin'
                                                :
                                                'Patient'
                                            }
                                        </td>
                                        <td>
                                            {user.address}
                                        </td>
                                        <td>{user.contact_number}</td>
                                        <td className={user.userstatus == 0 ? "text-error" : "text-success"}>
                                            {user.userstatus == 0 ? "Inactive" : "Active"}
                                        </td>

                                        <td>
                                            <button onClick={() => HandleUpdateData(user)} className="btn btn-outline btn-primary btn-xs flex gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                </svg>
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => ConfirmationModal(user)} className={`btn btn-outline w-full btn-xs flex gap-1 ${user.userstatus == 0 ? 'btn-success' : 'btn-error'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                                                </svg>
                                                {user.userstatus == 0 ?
                                                    'Activate'
                                                    :
                                                    'Deactivate'
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {users.length == 0 &&
                                    (
                                        <tr>
                                            <td className='text-center text-[12px] text-gray-300' colSpan={6}>No Data</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddUserDialog Toggle={toggleAddUser} OnAdd={AddUserData} Show={addUserModal} />
            <UpdateUserDialog Toggle={toggleUpdateUser} OnUpdate={UpdateUserData} Data={toUpdate} Show={updateUserModal} />
            <ConfirmationDialog Toggle={toggleActivateUser} Show={activateUserModal} OnConfirm={HandleActivation} Message={confirmData.message} ConfirmButton={confirmData.buttonText} ButtonColor={confirmData.buttonColor} />
        </div>
    )
}

export default ManageUsers
