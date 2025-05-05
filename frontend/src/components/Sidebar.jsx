import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-slate-200 p-4 flex flex-col bg-white'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-xl bg-slate-50 text-slate-800 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-indigo-500 hover:bg-indigo-600 text-white border-none'>
                    <BiSearchAlt2 className='w-5 h-5'/>
                </button>
            </form>
            <div className="divider px-3 bg-slate-200"></div> 
            <OtherUsers/> 
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border-none'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar