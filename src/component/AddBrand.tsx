import { useState } from 'react';
import { api } from '~/utils/api';
import { Brand } from '@prisma/client';

const AddBrand: React.FC = () => {

    //  Mutation för att skapa ett varumärke.
    const createBrand = api.admin.createBrand.useMutation();

    const [brandData, setBrandData] = useState<Pick<Brand, 'name' | 'logoId'>>({ name: '', logoId: null });

    const brandSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createBrand.mutateAsync({
            name: brandData.name,
            logoId: brandData.logoId || undefined
        });
    }

    return (
        <div className="flex flex-col gap-4 border-b py-4 px-2 bg-slate-300">
            <div className="text-2xl">
                Add a brand
            </div>
            <form onSubmit={brandSubmit} className="flex gap-12">
                <div className="flex gap-4">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="border-slate-300 border rounded-lg"
                        onChange={(e) => {
                            setBrandData(prev => ({ ...prev, name: e.target.value }));
                        }}
                    />
                </div>
                {/*  Fler fält för varumärket kan läggas till här. */}
                <button type='submit' className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg px-2 py-1'>Submit</button>
            </form>
        </div>
    )
}

export default AddBrand;
