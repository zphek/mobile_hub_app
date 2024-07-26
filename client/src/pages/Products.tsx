import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { faFilter, faParagraph, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

function Products() {
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
        </div>
    </div>);
}

export default Products;