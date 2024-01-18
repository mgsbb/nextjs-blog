import { ChangeEvent } from 'react';

type Props = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	id: string;
	type: string;
	label: string;
};

export default function AuthInput({ value, onChange, id, type, label }: Props) {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={id} className='text-sm font-semibold'>
				{label}
			</label>
			<input
				type={type}
				id={id}
				name={id}
				value={value}
				onChange={onChange}
				className='rounded-md border border-gray-300 p-2'
			/>
		</div>
	);
}
