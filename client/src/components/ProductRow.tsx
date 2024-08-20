import { faUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ProductRow({ pro, setToDelete, selectAll }) {
    const [mark, setMark] = useState(false);

    useEffect(() => {
        setMark(selectAll);
        if (selectAll) {
            setToDelete(prev => {
                if (!prev.includes(pro.phoneId)) {
                    return [...prev, pro.phoneId];
                }
                return prev;
            });
        } else {
            setToDelete(prev => prev.filter(id => id !== pro.phoneId));
        }
    }, [selectAll, pro.phoneId, setToDelete]);

    const handleCheckboxChange = () => {
        setMark(!mark);
        if (!mark) {
            setToDelete(prev => [...prev, pro.phoneId]);
        } else {
            setToDelete(prev => prev.filter(id => id !== pro.phoneId));
        }
    };

    return (
        <tr className={`${mark ? 'bg-red-200' : 'hover:bg-gray-100'}`} key={pro.phoneId}>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">{pro.phoneId}</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {pro.imageUrl ? (
                    <img src={pro.imageUrl} alt="Phone" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                    <div className="h-10 w-10 bg-slate-200 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="h-3 text-slate-500" />
                    </div>
                )}
            </td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">{pro.phoneName}</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">{pro.phoneDescription}</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">{pro.phoneState}</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">
                <FontAwesomeIcon icon={faPencil} className="h-4 hover:text-blue-500 cursor-pointer transition-[400ms]" />
            </td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">
                <input
                    type="checkbox"
                    className="cursor-pointer accent-red-500"
                    checked={mark}
                    onChange={handleCheckboxChange}
                />
            </td>
        </tr>
    );
}
