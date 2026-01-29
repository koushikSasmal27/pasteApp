import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFrompastes } from '../features/PasteApp/pasteSlice'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faTrash, faShare, faCopy } from '@fortawesome/free-solid-svg-icons'
const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();
  const filterData = pastes.filter(
    (obj) => obj.title.toLowerCase().includes(searchContent.toLowerCase())    //Every string contains an empty string
  )
  const dispatch = useDispatch();
  function handleDelete(pasteId) {
    if (confirm("Are you sure you want to delete this paste?")) {
      dispatch(deleteFrompastes(pasteId))
    }
  }
  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    toast.success('copied')
  }
  function handleView(id) {
    navigate(`/paste/${id}`);
  }
  function handleEdit(id) {
    navigate(`/?pasteId=${id}`);
  }
  function handleShare(id) {
    const link = `${window.location.origin}/paste/${id}`;
    navigator.clipboard.writeText(link);
    toast.success("Share link copied!");
  }
  return (
    <div className='w-full'>
      <div className='max-w-4xl mx-auto shadow-2xl my-8 p-4 rounded-2xl'>
        <input type="search" placeholder='search here...' className='w-full outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 hover:border-indigo-300 rounded-lg px-3 py-2  border border-gray-300  placeholder:text-gray-400 transition-all duration-300 shadow-sm cursor-text disabled:opacity-60 disabled:cursor-not-allowed
' onChange={(e) => setSearchContent(e.target.value)} value={searchContent} />

        <div className='flex flex-col gap-5 w-full mx-auto mt-10 border border-gray-200 rounded-2xl p-4 bg-white'>
          {
            filterData.length === 0 && (<p className="text-center text-gray-500 py-6">
              No pastes found 😕
            </p>)
          }
          {
            filterData.map(
              (obj) => (
                <div key={obj._id} className='w-full border border-gray-300 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-gray-50 relative '>
                  <h2 className='text-lg md:text-lg font-semibold text-gray-800 mb-2'>{obj.title}</h2>
                  <p className='text-sm text-gray-600 mb-3 line-clamp-3'>{obj.content}</p>
                  <div className="flex gap-2 absolute top-2 right-2  backdrop-blur px-2 py-1 rounded-lg shadow-sm"
                  >
                    <button className='text-gray-500 hover:text-indigo-700 transition transform hover:scale-110' onClick={() => handleView(obj?._id)}><FontAwesomeIcon icon={faEye} /></button>
                    <button className='text-gray-500 hover:text-indigo-700 transition transform hover:scale-110' onClick={() => handleEdit(obj?._id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button className='text-gray-500 hover:text-indigo-700 transition transform hover:scale-110' onClick={() => handleDelete(obj?._id)}><FontAwesomeIcon icon={faTrash} /></button>
                    <button className='text-gray-500 hover:text-indigo-700 transition transform hover:scale-110' onClick={() => handleCopy(obj?.content)}><FontAwesomeIcon icon={faCopy} /></button>
                    <button className='text-gray-500 hover:text-indigo-700 transition transform hover:scale-110' onClick={() => handleShare(obj?._id)}><FontAwesomeIcon icon={faShare} /></button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(obj.createdAt).toDateString()}
                  </div>
                </div>

              )
            )
          }
        </div>
      </div>

    </div>
  )
}
export default Pastes
