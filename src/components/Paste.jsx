

import {useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
const Paste = () => {
  const {id}= useParams();
   const pastes=useSelector((state)=>state.paste.pastes);
  const oldPaste=pastes.find((obj)=> obj._id === id);
  function handleClick()
  {
            navigator.clipboard.writeText(oldPaste.content)
            toast.success('copied')
  }
  return (
    <div className='w-full py-10 bg-gray-50 min-h-screen '>
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">


                <div className=' flex flex-col md:flex-row items-center gap-4 mb-6 '>
                    <input className="w-full md:flex-1 border  rounded-lg border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 placeholder-gray-400"  type="text" placeholder='Enter title here' value={oldPaste.title} disabled/>
                    
                </div>

                <div className='relative'>
                    <button className='absolute right-2 top-1' onClick={handleClick}>
                    <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <textarea
                        disabled
                        value={oldPaste.content}
                        placeholder="Enter your content here..."
                        onChange={(e) => setTextContent(e.target.value)}
                        rows={18}
                        className="w-full resize-none rounded-2xl border border-gray-300 p-4 text-sm text-gray-700  outline-none transition focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 placeholder-gray-400"
                    />
                </div>
                
            </div>
        </div>
  )
}

export default Paste
