import React from 'react';

interface DeleteCountryModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const DeleteCountryModal: React.FC<DeleteCountryModalProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    const handleYesClick = () => {
        // Handle deletion logic here
        // e.g., call a function to delete the country
        // ...
        onClose(); // Close the modal after deletion
    };

    const handleNoClick = () => {
        onClose(); // Close the modal without deletion
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col bg-white p-4 rounded-lg'>
                <p className='text-gray-800 text-lg'>{`Are you sure you want to delete this country?`}</p>
                <div className='flex justify-end mt-4'>
                    <button onClick={handleYesClick} className='w-20 h-10 mr-2 bg-red-500 text-white rounded'>
                        Yes
                    </button>
                    <button onClick={handleNoClick} className='w-20 h-10 bg-white border border-gray-300 rounded'>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCountryModal;
