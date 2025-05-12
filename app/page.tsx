"use client";
import BusinessCard from "@/components/BusinessCard";
import { useState, useEffect } from "react";

interface BusinessCard {
  name: string;
  job: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo: string;
  slogan_recto: string;
  slogan_verso: string;
  partners_certifs: string[];
}


export default function Home() {
  const [businessCard, setBusinessCard] = useState<BusinessCard | null>(null);
  
  useEffect(() => {
    return () => {
      if (businessCard) {
        if (businessCard.logo) {
          URL.revokeObjectURL(businessCard.logo);
        }
        businessCard.partners_certifs.forEach(url => {
          URL.revokeObjectURL(url);
        });
      }
    };
  }, [businessCard]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const logoFile = formData.get("logo") as Blob;
    const partnersCertifsFiles = Array.from(formData.getAll("partners_certifs")) as File[];

    const businessCard: BusinessCard = {
      name: formData.get("name") as string,
      job: formData.get("job") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
      address: formData.get("address") as string,
      logo: logoFile ? URL.createObjectURL(logoFile) : "",
      slogan_recto: formData.get("slogan_recto") as string,
      slogan_verso: formData.get("slogan_verso") as string,
      partners_certifs: partnersCertifsFiles.map(file => URL.createObjectURL(file)),
    };
    setBusinessCard(businessCard);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-50">
      <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-[#8b1432] mb-8">Business Card Maker</h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
            <input type="text" name="job" placeholder="Job" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
            <input type="email" name="email" placeholder="Email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
            <input type="text" name="phone" placeholder="Phone" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
            <input type="text" name="website" placeholder="Website" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
            <input type="text" name="address" placeholder="Address" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
            <input type="file" name="logo" id="logo" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0d9e1] file:text-[#8b1432] hover:file:bg-[#e9c8d4]" />
          </div>
          <div>
            <label htmlFor="slogan_recto" className="block text-sm font-medium text-gray-700">Slogan Recto</label>
            <input type="text" name="slogan_recto" placeholder="Slogan Recto" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
          </div>
          <div>
            <label htmlFor="slogan_verso" className="block text-sm font-medium text-gray-700">Slogan Verso</label>
            <input type="text" name="slogan_verso" placeholder="Slogan Verso" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b1432] focus:border-[#8b1432] sm:text-sm" />
          </div>
          <div>
            <label htmlFor="partners_certifs" className="block text-sm font-medium text-gray-700">Partners Certifications (select multiple)</label>
            <input type="file" name="partners_certifs" id="partners_certifs" multiple className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0d9e1] file:text-[#8b1432] hover:file:bg-[#e9c8d4]" />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8b1432] hover:bg-[#7a122c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b1432]">
            Create Business Card
          </button>
        </form>
        {/* Preview business card */}
        {businessCard && (
          <div className="mt-12 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Preview</h2>
            <BusinessCard {...businessCard} />
          </div>
        )}
      </div>
    </div>
  );
}
