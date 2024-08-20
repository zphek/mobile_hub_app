import { faLess } from "@fortawesome/free-brands-svg-icons";
import { faMinus, faPlus, faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import sendRequest from "../utilities/sendRequest";


function ImageUploader({ images, setImages, setFiles }) {
    function Image({ image, imgIndex }) {
        const [showDelete, setShowDelete] = useState(false);

        return (
            <div
                key={imgIndex}
                className="h-20 w-20 flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setImages((imgs) => imgs.filter((_, index) => index !== imgIndex))}
                onMouseOver={() => setShowDelete(true)}
                onMouseOut={() => setShowDelete(false)}
            >
                {showDelete && (
                    <div className="bg-red-500/80 w-full h-full flex flex-col items-center justify-center">
                        <FontAwesomeIcon icon={faMinus} className="text-white" />
                        <h2 className="text-xs text-white">Delete</h2>
                    </div>
                )}
            </div>
        );
    }

    const handleAddImage = (event) => {
        const files = event.target.files;
        const newImages = [];
        const totalImages = images.length + files.length;

        if (totalImages > 5) {
            alert('You can only upload a maximum of 5 images.');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setFiles((prev:any)=> [...prev, files[i]]);

            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(reader.result);
                if (newImages.length === files.length) {
                    setImages((prevImages) => [...prevImages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-start mb-5">
            <h2>Images</h2>
            <div className="flex overflow-y-scroll py-2 px-4 gap-2">
                {images.map((image, index) => (
                    <Image image={image} imgIndex={index} />
                ))}
                {images.length < 5 && (
                    <div className="h-20 w-20 flex flex-col gap-y-2 items-center justify-center bg-orange-500 text-white hover:shadow-xl relative">
                        <FontAwesomeIcon icon={faPlus} className="h-3" />
                        <h3 className="text-xs text-center">
                            Add
                            <br />
                            image
                        </h3>
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleAddImage}
                            multiple={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PhoneDialog({ isNew, phoneId }) {
    const [show, setShow] = useState(false);
    const [phoneName, setPhoneName] = useState("");
    const [phoneDescription, setPhoneDescription] = useState("");
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState<any>([])

    useEffect(() => {
        console.log(show);
    }, [show]);

    async function handleSubmit(e:any) {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("phoneName", phoneName);
            formData.append("phoneDescription", phoneDescription);
            formData.append("brandId", 1);
            formData.append("phoneState", 1);
            images.forEach((image, index) => formData.append(`files`, image));

            const response = await sendRequest('/phone/create', 'POST', formData, localStorage.getItem('token'), "multipart/form-data");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button className="bg-blue-600 py-3 px-4 rounded-xl flex items-center text-white gap-x-4"
            onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={faPlus} className="h-5" />
            <h2 className="font-normal">Add new phone</h2>

            {show && (
                <div className="h-screen w-screen top-0 left-0 absolute top-0 left-0 bg-slate-500/50 backdrop-blur-sm z-20 flex items-center justify-center absolute"
                    onClick={(e) => e.stopPropagation()}>
                    <form className="bg-white text-black min-w-[30em] flex flex-col items-start p-5 relative"
                    onSubmit={handleSubmit}>
                        <h2 className="text-xl font-extrabold mb-6">Add new phone</h2>

                        <div className="flex flex-col w-full items-start mb-5">
                            <h2>Phone name</h2>
                            <input
                                type="text"
                                name="phoneName"
                                id="phoneName"
                                className="w-full inputStylized"
                                value={phoneName}
                                onChange={(e) => setPhoneName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col w-full items-start mb-5">
                            <h2>Phone description</h2>
                            <textarea
                                name="phoneDescription"
                                id="phoneDescription"
                                rows={4}
                                className="w-full inputStylized text-xs"
                                value={phoneDescription}
                                onChange={(e) => setPhoneDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <ImageUploader images={images} setImages={setImages} setFiles={setFiles} />

                        <button
                            className="bg-orange-600 text-white w-full rounded-xl py-2 flex items-center justify-center gap-x-2">
                            Save
                            <FontAwesomeIcon icon={faSave} className="h-4" />
                        </button>

                        <FontAwesomeIcon
                            icon={faX}
                            className="h-5 absolute text-black top-3 right-3"
                            onClick={() => setShow(false)}
                        />
                    </form>
                </div>
            )}
        </button>
    );
}