import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import { faCopy, faPlusCircle, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import sendRequest from "../utilities/sendRequest";
import TokenRow from "../components/TokenRow";

function NewTokenDialog() {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        read: false,
        insert: false,
        update: false,
        delete: false
    });
    const [token, setToken] = useState('');

    const handleClose = () => {
        setFormData({
            read: false,
            insert: false,
            update: false,
            delete: false
        });

        setShow(false);
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };

    async function handleGenerate(e){
        e.preventDefault();

        try {
           const response = await sendRequest('/token/create', 'POST', formData, localStorage.getItem('token'))
           setToken(response.data.token)
           console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(token).then(() => {
            alert('Token copied to clipboard!');
        });

        // handleClose();
    };

    const isGenerateDisabled = !Object.values(formData).some(value => value);

    return (
        <>
            <button className="flex justify-center items-center gap-x-2 py-2 px-4 text-white bg-blue-600"
                onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faPlusCircle} className="h-4" />
                <h3>Add new token</h3>
            </button>

            {show && (
                <div className="absolute w-screen h-screen top-0 left-0 bg-black/60 backdrop-blur-xl flex items-center justify-center"
                    onClick={handleClose}>
                    <form className="w-[20em] bg-white flex flex-col items-start p-5"
                        onClick={e => e.stopPropagation()}>
                        <h2 className="text-black font-bold text-xl">NEW TOKEN</h2>

                        <h2 className="text-black mt-5">Permissions:</h2>
                        <div className="text-black flex flex-col items-start">
                            <div>
                                <input type="checkbox" id="read" className="mb-2" checked={formData.read} onChange={handleCheckboxChange} />
                                <label htmlFor="read" className="ml-2">Read</label><br />
                            </div>

                            <div>
                                <input type="checkbox" id="insert" className="mb-2" checked={formData.insert} onChange={handleCheckboxChange} />
                                <label htmlFor="insert" className="ml-2">Write</label><br />
                            </div>

                            <div>
                                <input type="checkbox" id="update" className="mb-2" checked={formData.update} onChange={handleCheckboxChange} />
                                <label htmlFor="update" className="ml-2">Update</label><br />
                            </div>

                            <div>
                                <input type="checkbox" id="delete" className="mb-2" checked={formData.delete} onChange={handleCheckboxChange} />
                                <label htmlFor="delete" className="ml-2">Delete</label>
                            </div>
                        </div>

                        <button className={`w-full py-2 rounded-lg mt-5 ${isGenerateDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
                            onClick={handleGenerate}
                            disabled={isGenerateDisabled}>
                            Generate
                        </button>

                        {token.length > 1 && (
                            <div className="bg-green-500 w-full p-2 rounded-xl mt-5 flex items-center justify-between">
                                <div>
                                    <h2 className="font-thin text-white">GENERATED TOKEN</h2>
                                    <h2 className="text-white">{`${token.slice(0, 10)}...${token.slice(-4)}`}</h2>
                                </div>
                                <FontAwesomeIcon icon={faCopy} className="text-white h-4 hover:bg-green-800 p-1 cursor-pointer transition-[400ms]" onClick={handleCopy} />
                            </div>
                        )}
                    </form>
                </div>
            )}
        </>
    );
}


export default function Token(){
    const [tokens, setTokens] = useState<any[]>([])
    const [toDelete, setToDelete] = useState<number[]>([])


    useEffect(()=>{
        console.log(toDelete);
    }, [toDelete])

    useEffect(()=>{
        async function getTokens(){
            try {
                const response = await sendRequest('/token/get', 'GET', null, localStorage.getItem('token'))
                console.log(response.data.data)
                setTokens(response.data.data)
            } catch (error) {
                
            }
        }

        getTokens();
    }, [])

    const handleDelete = () => {
        toDelete.forEach((id) => {
            sendRequest(`/token/delete/${id}`, 'DELETE', null, localStorage.getItem('token'))
                .then(response => {
                    console.log(`Token with ID ${id} deleted successfully.`);
                    // Optionally, update the products state to remove the deleted item
                    setTokens(prev => prev.filter(token => token.tokenId !== id));
                })
                .catch(err => {
                    console.error(`Error deleting token with ID ${id}`, err);
                });
        });
        setToDelete([]);
    };

    return (<div className="flex min-w-screen min-h-screen bg-slate-200/80">
        <Sidebar/>

        <div className="w-full h-full px-10 py-8">
            <h2 className="text-4xl font-extrabold">Tokens Page</h2>

            <h4 className="text-slate-600 mt-5">API Tokens user page</h4>

            <div className="flex justify-end items-center w-full gap-x-4">
                <NewTokenDialog/>

                <div className="flex items-center gap-x-6">
                <button
                        className={"py-2 px-4 rounded-xl text-white flex gap-x-2 items-center " + ((toDelete.length > 0) ? "bg-red-500" : "bg-red-300")}
                        disabled={toDelete.length == 0 ? true : false}
                        onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} className="h-3" />
                        Delete
                    </button>
                </div>
            </div>

            <table className="min-w-full bg-white border rounded-lg mt-10">
                <thead>
                    <tr className="w-full bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="px-5 py-2 border-b-2 border-gray-200">Id</th>
                        <th className="px-5 py-2 border-b-2 border-gray-200">Reference</th>
                        <th className="px-5 py-2 border-b-2 border-gray-200">Date</th>
                        <th className="px-5 py-2 border-b-2 border-gray-200"></th>
                    </tr>
                </thead>

                <tbody className="h-[10em] overflow-y-auto">
                    {(tokens && tokens.length > 0) 
                    ? tokens.map((token)=><TokenRow token={token} setToDelete={setToDelete}/>) 
                    : <h2>There's no tokens to show.</h2>}
                </tbody>
            </table>
        </div>
    </div>);
}