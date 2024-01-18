import { Dialog } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

const ConfirmationDialog = ({
	isOpen,
	setIsOpen,
	confirmFunction,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	confirmFunction: () => void;
}) => {
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='fixed inset-0 flex w-full items-center justify-center p-4'>
				<Dialog.Panel className='bg-white p-10 rounded-md flex flex-col gap-6'>
					<Dialog.Title className='font-bold text-gray-700 text-2xl text-center'>
						Are you sure?
					</Dialog.Title>

					<div className='flex gap-6'>
						<button
							onClick={() => {
								confirmFunction();
								setIsOpen(false);
							}}
							className='border border-red-600 text-red-600 hover:bg-red-100 font-bold
						 rounded-md py-2 size-fit px-4'
						>
							Confirm
						</button>
						<button
							onClick={() => setIsOpen(false)}
							className='bg-black text-white rounded-md py-2 size-fit px-4'
						>
							Cancel
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default ConfirmationDialog;
