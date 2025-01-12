import React from 'react'

interface ConfirmationDialogProps {
    Toggle: () => void;
    Show: boolean;
    ConfirmButton: string,
    ButtonColor: string,
    Message: string,
    OnConfirm: () => void
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props: ConfirmationDialogProps) => {

    const handleConfirm = () => {
        props.OnConfirm();
        setTimeout(() => {
            props.Toggle();
        }, 500)
    }

    return (
        <dialog className={`modal ${props.Show && 'modal-open'}`} >
            <div className="modal-box p-[35px]">
                <h3 className="font-bold text-lg text-[21px]">{props.Message}</h3>
                <div className='flex justify-end mt-5 gap-2'>
                    <button onClick={() => props.Toggle()} className='btn btn-gray btn-outline  btn-sm p-1 px-3'>Cancel</button>
                    <button onClick={() => handleConfirm()} className={`btn btn-sm btn-outline btn-${props.ButtonColor}`}>
                        {props.ConfirmButton}
                    </button>
                </div>
            </div>

        </dialog>
    )
}

export default ConfirmationDialog
