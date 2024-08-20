import { useState } from "react"

export default function TokenRow({ token, setToDelete }){
    const [mark, setMark] = useState(false);

    function handleMark(){
        setMark(!mark)

        if(!mark){
            setToDelete(prev => [...prev, token.tokenId]);
        } else {
            setToDelete(prev => prev.filter(id => id !== token.tokenId));
        }
    }

    return <tr className={`w-full text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${mark ? 'bg-red-200' : 'bg-gray-100'}`}>
        <td className="px-5 py-2 border-b-2 border-gray-200">{token.tokenId}</td>
        <td className="px-5 py-2 border-b-2 border-gray-200">{token.tokenReference}</td>
        <td className="px-5 py-2 border-b-2 border-gray-200">{token.createdAt}</td>
        <td className="px-5 py-2 border-b-2 border-gray-200">
            <input type="checkbox" name="" id="" className="accent-red-500 cursor-pointer" 
            checked={mark}
            onChange={handleMark}/>
        </td>
    </tr>
}