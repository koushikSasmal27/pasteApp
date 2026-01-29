import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addTopastes, updateTopastes } from '../features/PasteApp/pasteSlice';
import toast from 'react-hot-toast';
const Home = () => {
    const [title, setTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const pastes = useSelector((state) => state.paste.pastes);
    useEffect(
        () => {
            if (pasteId) {
                const oldPaste = pastes.find((obj) => obj._id === pasteId);
                setTitle(oldPaste.title)
                setTextContent(oldPaste.content)
            }
        }, [pasteId]
    )

    function createPaste() {
        if (textContent && title) {
            const paste = {
                title: title,
                content: textContent,
                _id: pasteId || Date.now().toString(36),
                createdAt: new Date().toISOString()
            }

            if (pasteId) {
                dispatch(updateTopastes(paste))
            } else {
                dispatch(addTopastes(paste))
            }


            //after creation

            setSearchParams({})
            setTitle('')
            setTextContent('')
        }
        else {
            toast.error('Enter content')
        }

    }
    return (
        <div className='w-full py-10 bg-gray-50 min-h-screen '>
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">


                <div className=' flex flex-col md:flex-row items-center gap-4 mb-6 '>
                    <input className="w-full md:flex-1 border  rounded-lg border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 placeholder-gray-400"  type="text" placeholder='Enter title here' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <button className='w-full md:w-auto rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 shadow-md  transform' onClick={createPaste}>
                        {
                            pasteId ? 'update my Paste' : 'Create my Paste'
                        }
                    </button>
                </div>

                
                    <textarea
                        required
                        value={textContent}
                        placeholder="Enter your content here..."
                        onChange={(e) => setTextContent(e.target.value)}
                        rows={18}
                        className="w-full resize-none rounded-2xl border border-gray-300 p-4 text-sm text-gray-700  outline-none transition focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 placeholder-gray-400"
                    />

                
            </div>
        </div>

    )
}

export default Home
