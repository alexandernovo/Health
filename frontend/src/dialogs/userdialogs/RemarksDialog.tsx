import React from 'react'

interface RemarksDialogDialogProps {
    isOpen: boolean;
    remarks: string;
    setRemarkDialog: () => void;
}

const RemarksDialog: React.FC<RemarksDialogDialogProps> = (props: RemarksDialogDialogProps) => {
    return (
        <div>
            <div tabIndex={-1} aria-hidden="true" className={`${props.isOpen ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 flex right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow border">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Decline Remarks
                            </h3>
                            <button onClick={props.setRemarkDialog} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <textarea readOnly rows={3} value={props.remarks} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Remarks..."></textarea>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default RemarksDialog
