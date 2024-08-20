import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { faArrowLeft, faArrowRight, faFilter, faTrash, faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import sendRequest from "../utilities/sendRequest";
import PhoneDialog from "../components/PhoneDialog";
import ProductRow from "../components/ProductRow";

const ProgressCircle = ({ progress }) => {
    const radius = 16;
    const stroke = 2;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = progress;

    return (
        <div className="relative h-12 w-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="18"
                    cy="18"
                    r={normalizedRadius}
                    fill="none"
                    className="stroke-current text-gray-200"
                    strokeWidth={stroke}
                />
                <circle
                    cx="18"
                    cy="18"
                    r={normalizedRadius}
                    fill="none"
                    className="stroke-current text-blue-600"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
                <span className="text-center text-xs font-bold text-white-600">
                    {progress}%
                </span>
            </div>
        </div>
    );
};

function Products() {
    const [products, setProducts] = useState([]);
    const socket = io("http://localhost:3000/", {
        extraHeaders: {
            authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    const [percent, setPercent] = useState(0);
    const [deletePercent, setDeletePercent] = useState(0);
    const [toDelete, setToDelete] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [pages, setPages] = useState({
        totalPages: 1,
        currentPage: 1
    });

    useEffect(() => {
        if(deletePercent == 100){
            setProducts([]);
        }
    }, [deletePercent]);

    useEffect(() => {
        socket.connect();

        socket.on("loadPhoneResponse", (response) => {
            setPercent(response);
            console.log(response, "XD");
        });

        socket.on("deletePhoneResponse", (response)=>{
            setDeletePercent(response);
        })

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        sendRequest(`/phone/get?page=${pages.currentPage}`, "get", null, localStorage.getItem('token')?.toString())
            .then((response) => {
                console.log(response.data);

                setProducts(response.data.data);

                setPages({
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pages.currentPage]);

    const handleDelete = () => {
        if(selectAll){
            console.log("DELETE ")
            socket.emit("deletePhones", true);

            return;
        }

        toDelete.forEach((id) => {
            sendRequest(`/phone/delete/${id}`, 'DELETE', null, localStorage.getItem('token'))
                .then(response => {
                    console.log(`Phone with ID ${id} deleted successfully`);
                    // Optionally, update the products state to remove the deleted item
                    setProducts(prev => prev.filter(phone => phone.phoneId !== id));
                })
                .catch(err => {
                    console.error(`Error deleting phone with ID ${id}`, err);
                });
        });
        setToDelete([]); // Clear the toDelete list after processing
    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setToDelete(products.map(product => product.phoneId));
        } else {
            setToDelete([]);
        }
    };

    return (
        <div className="flex min-w-screen min-h-screen bg-slate-200/80">
            <Sidebar />

            <div className="w-full h-full px-10 py-8">
                <h2 className="text-4xl font-extrabold">Products Page</h2>

                <h4 className="text-slate-600 mt-5">Smartphones page</h4>

                <div className="flex gap-x-4 items-center">
                    <div className="flex flex-grow items-center bg-white px-5 gap-x-2 rounded-full">
                        <FontAwesomeIcon icon={faSearch} className="h-5 text-slate-500" />
                        <input type="text" name="" id="" className="grow outline-none py-3" placeholder="Search by name, year and more..." />
                    </div>

                    <button className="flex items-center justify-center border-2 py-3 px-4 bg-white">
                        <FontAwesomeIcon icon={faFilter} className="h-5" />
                        Filter
                    </button>

                    <PhoneDialog isNew={false} phoneId={1} />

                    <button className="bg-blue-600 py-3 px-4 rounded-xl flex items-center text-white gap-x-4"
                        onClick={() => socket.emit("loadPhones", true)}>
                        {(percent > 0 && percent < 100) ?
                            <>
                                <ProgressCircle progress={percent} />
                                Loading
                            </>
                            : <>
                                <FontAwesomeIcon icon={faUpload} className="h-5" />
                                Load
                            </>}
                    </button>
                </div>

                <div className="flex justify-end mt-5 gap-x-6">
                    <div className="flex items-center justify-center gap-x-2">
                        <input
                            type="checkbox"
                            className="cursor-pointer accent-red-500"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />

                        All
                    </div>

                    <button
                        className={"py-2 px-4 rounded-xl text-white flex gap-x-2 items-center " + ((toDelete.length > 0) ? "bg-red-500" : "bg-red-300")}
                        disabled={toDelete.length > 0 ? false : true}
                        onClick={handleDelete}>
                        {(deletePercent > 0 && deletePercent < 100) 
                        ?
                            <>
                                <ProgressCircle progress={deletePercent}/>
                                Deleting
                            </>
                        :
                        <>
                            <FontAwesomeIcon icon={faTrash} className="h-3" />
                            Delete
                        </>}
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
                            <th className="px-5 py-2 border-b-2 border-gray-200"></th>
                            <th className="px-5 py-2 border-b-2 border-gray-200"></th>
                        </tr>
                    </thead>
                    <tbody className="max-h-[50em]">
                        {(products && products.length > 0) ?
                            products.map((pro) => (
                                <ProductRow
                                    key={pro.phoneId}
                                    pro={pro}
                                    setToDelete={setToDelete}
                                    selectAll={selectAll}
                                />
                            ))
                            : <h2 className="w-full p-5 flex justify-center items-center">There's no phones to show.</h2>}
                    </tbody>
                    <div className="p-5 flex justify-center items-center w-full gap-x-4">
                        <button className="flex items-center justify-center p-2 rounded-full border-2"
                            onClick={() => {
                                setPages((page) => ({ ...page, currentPage: page.currentPage - 1 < 1 ? page.currentPage : page.currentPage - 1 }))
                            }}>
                            <FontAwesomeIcon icon={faArrowLeft} className="h-2" />
                        </button>
                        <h2 className="min-w-[50px] flex items-center justify-center gap-x-2"><strong>{pages.currentPage}</strong> of <strong>{pages.totalPages}</strong></h2>
                        <button className="flex items-center justify-center p-2 rounded-full border-2"
                            onClick={() => {
                                setPages((page) => ({ ...page, currentPage: page.currentPage + 1 > pages.totalPages ? page.currentPage : page.currentPage + 1 }))
                            }}>
                            <FontAwesomeIcon icon={faArrowRight} className="h-2" />
                        </button>
                    </div>
                </table>
            </div>
        </div>
    );
}

export default Products;
