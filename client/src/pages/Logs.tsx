import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { faArrowLeft, faArrowRight, faFilter, faParagraph, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { useEffect, useState } from "react";
import sendRequest from "../utilities/sendRequest";

function Logs() {
    const [logs, setLogs] = useState<any[]>([]);
    const [pages, setPages] = useState({
        totalPages: 2,
        currentPage: 2
    })

    useEffect(()=>{
        sendRequest(`/user/logs`, "get", null, localStorage.getItem('token')?.toString())
        .then((response)=>{
            setLogs(response.data.data);
            console.log(response.data.data);
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
                <tbody className="block max-h-[20em] w-full overflow-y-auto">
                    {logs.length > 0 && logs.map((log) => (
                        <tr className="hover:bg-gray-100 flex w-full" key={log.logId}>
                            <td className="px-5 py-2 border-b border-gray-200 text-sm flex-shrink-0 w-1/3">{log.logId}</td>
                            <td className="px-5 py-2 border-b border-gray-200 text-sm flex-shrink-0 w-1/3">{log.action}</td>
                            <td className="px-5 py-2 border-b border-gray-200 text-sm flex-shrink-0 w-1/3">{log.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default Logs;