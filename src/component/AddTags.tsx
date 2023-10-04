import { type Tags } from '@prisma/client';
import { useState } from 'react';
import { api } from '~/utils/api';

const AddTags = () => {

    const createTags = api.admin.createTags.useMutation();

    const [tagData, setTagData] = useState<
        Pick<Tags, 'name'>
    >({ name: '' });

    const tagSubmit = async () => {

        await createTags.mutateAsync({ ...tagData })
    }

    return (
        <div className="flex flex-col gap-4 border-b py-4 px-2 bg-slate-300">
            <div className="text-2xl">
                Add tags
            </div>
            <form onSubmit={tagSubmit} className="flex gap-12">
                <div className="flex gap-4">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="border-slate-300 border rounded-lg"
                        onChange={(e) => {
                            setTagData({ name: e.target.value })
                        }}
                    />
                </div>
                <button type='submit' className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg px-2 py-1'>Submit</button>
            </form>
        </div>
    )
}

export default AddTags;