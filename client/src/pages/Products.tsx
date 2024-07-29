import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { faArrowLeft, faArrowRight, faFilter, faParagraph, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { useEffect, useState } from "react";
import sendRequest from "../utilities/sendRequest";

function Products() {
    const [products, setProducts] = useState();
    const [pages, setPages] = useState({
        totalPages: 2,
        currentPage: 2
    })

    useEffect(()=>{
        sendRequest(`/phone/get?page=${pages.currentPage}`, "get", null, localStorage.getItem('token')?.toString())
        .then((response)=>{
            console.log(response.data);

            setPages({
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    return (<div className="flex min-w-screen min-h-screen bg-slate-200/80">
        <Sidebar/>

        <div className="w-full h-full px-10 py-8">
            <h2 className="text-4xl font-extrabold">Products Page</h2>

            <h4 className="text-slate-600 mt-5">Smartphones page</h4>

            <div className="flex gap-x-4 items-center">
                <div className="flex flex-grow items-center bg-white px-5 gap-x-2 rounded-full">
                    <FontAwesomeIcon icon={faSearch} className="h-5 text-slate-500"/>
                    <input type="text" name="" id="" className="grow outline-none py-3" placeholder="Search by name, year and more..."/>
                </div>

                <button className="flex items-center justify-center border-2 py-3 px-4 bg-white">
                    <FontAwesomeIcon icon={faFilter} className="h-5"/>
                    Filter
                </button>

                <button className="bg-blue-600 py-3 px-4 rounded-xl flex items-center text-white gap-x-4">
                    <FontAwesomeIcon icon={faPlus} className="h-5"/>
                    <h2 className="font-normal">Add new phone</h2>
                </button>
            </div>

            <table className="min-w-full bg-white border rounded-lg mt-10">
    <thead>
        <tr className="w-full bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <th className="px-5 py-2 border-b-2 border-gray-200">Id</th>
            <th className="px-5 py-2 border-b-2 border-gray-200">Image</th>
            <th className="px-5 py-2 border-b-2 border-gray-200">Name</th>
            <th className="px-5 py-2 border-b-2 border-gray-200">Description</th>
            <th className="px-5 py-2 border-b-2 border-gray-200">State</th>
        </tr>
    </thead>
    <tbody className="max-h-[50em]">
        {/* Example row - repeat for each row of data */}
        <tr className="hover:bg-gray-100">
            <td className="px-5 py-2 border-b border-gray-200 text-sm">1</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">
                <img src="image_url" alt="Phone" className="h-20 w-20 rounded-full object-cover" />
            </td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">Phone Name</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">Phone Description</td>
            <td className="px-5 py-2 border-b border-gray-200 text-sm">Active</td>
        </tr>
        {/* Add more rows here */}
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

export default Products;