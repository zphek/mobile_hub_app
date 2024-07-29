import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { faArrowLeft, faArrowRight, faFilter, faParagraph, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { useEffect, useState } from "react";
import sendRequest from "../utilities/sendRequest";

function Logs() {
    const [logs, setLogs] = useState<any[]>();
    const [pages, setPages] = useState({
        totalPages: 2,
        currentPage: 2
    })

    useEffect(()=>{
        sendRequest(`/user/logs`, "get", null, localStorage.getItem('token')?.toString())
        .then((response)=>{
            setLogs(response.data);
            console.log(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    return (<div className="flex min-w-screen min-h-screen bg-slate-200/80">
        <Sidebar/>

        <div className="w-full h-full px-10 py-8">
            <h2 className="text-4xl font-extrabold">Logs Page</h2>

            <h4 className="text-slate-600 mt-5">Logs user page</h4>

            <table className="min-w-full bg-white border rounded-lg mt-10">
    <thead>
        <tr className="w-full bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <th className="px-5 py-2 border-b-2 border-gray-200">Id</th>
            <th className="px-5 py-2 border-b-2 border-gray-200">Action</th>
            <th className="px-5 py-2 border-b-2 border-gray-200">Date</th>
        </tr>
    </thead>
    <tbody className="max-h-[50em]">
        {logs && logs.map((log)=> <tr className="hover:bg-gray-100">
            <td className="px-5 py-2 border-b border-gray-200 text-sm">{log.logId}</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {log.action}
            </td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {log.createdAt}
            </td>
        </tr>)}
    </tbody>
    <div className="p-5 flex justify-center items-center w-full gap-x-4">
        <button className="flex items-center justify-center p-2 rounded-full border-2"
        onClick={()=>{
            setPages((page)=> ({...page, currentPage: page.currentPage - 1 < 1 ? page.currentPage : page.currentPage - 1}))
        }}>
            <FontAwesomeIcon icon={faArrowLeft} className="h-2"/>
        </button>
        <h2><strong>{pages.currentPage}</strong> of <strong>{pages.totalPages}</strong></h2>
        <button className="flex items-center justify-center p-2 rounded-full border-2"
        onClick={()=>{
            setPages((page)=> ({...page, currentPage: page.currentPage + 1 > pages.totalPages ? page.currentPage : page.currentPage + 1}))
        }}>
            <FontAwesomeIcon icon={faArrowRight} className="h-2"/>
        </button>
    </div>
</table>
        </div>
    </div>);
}

export default Logs;