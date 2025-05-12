import { QRCodeSVG } from "qrcode.react";
import { MapPinIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import Image from "next/image";

interface BusinessCardProps {
  name: string;
  job: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo: string; // URL.createObjectURL(blob) expected
  slogan_recto: string;
  slogan_verso: string;
  partners_certifs: string[]; // array of URL.createObjectURL(blob)
}

export default function BusinessCard({
  name,
  job,
  email,
  phone,
  website,
  address,
  logo,
  slogan_recto,
  slogan_verso,
  partners_certifs,
}: BusinessCardProps) {

  const vcardData = `
BEGIN:VCARD
VERSION:3.0
N:${name.split(" ").reverse().join(";")};
FN:${name}
TITLE:${job}
TEL;TYPE=WORK,VOICE:${phone}
EMAIL:${email}
URL:${website}
ADR:;;24, Bld. Martin Luther King (Corniche);Dakar;;;
END:VCARD
`.trim();

  return (
    <div>
    {/* Recto */}
    <div className="w-[800px] h-[450px] bg-white shadow-xl rounded-lg py-8 px-12 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="flex justify-between items-center w-full">
          <p className="text-gray-400 italic text-sm mb-2">{slogan_recto}</p>
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-[#8b1432]">{name}</h1>
                <p className="text-lg text-gray-700">{job}</p>
            </div>
            <div className="flex space-x-2 items-center">
                {partners_certifs.map((certif, idx) => (
                    <Image key={idx} src={certif} alt={`partner-${idx}`} width={40} height={40} className="object-contain" />
                ))}
            </div>

        </div>
        <div className="w-full h-[10px] bg-[#8b1432] my-4"></div>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-y-3 text-gray-800">
          <div className="flex items-center space-x-2">
            <div className="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
              <MapPinIcon className="w-4 h-4 text-[#8b1432]" />
            </div>
            <p>{address}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
              <EnvelopeIcon className="w-4 h-4 text-[#8b1432]" />
            </div>
            <p>{email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
              <PhoneIcon className="w-4 h-4 text-[#8b1432]" />
            </div>
            <p>{phone}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-[2.5px] border-2 border-[#8b1432] rounded-full flex items-center justify-center">
              <GlobeAltIcon className="w-4 h-4 text-[#8b1432]" />
            </div>
            <p>{website}</p>
          </div>
        </div>

        <div className="">
          <QRCodeSVG value={vcardData} size={120} fgColor="#000000" />
        </div>
      </div>
    </div>

    {/* Verso */}
    <div className="w-[800px] h-[450px] bg-[#8b1432] shadow-xl rounded-lg py-8 px-12 flex flex-col justify-between">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          width={250}
          height={100}
          className="object-contain"
        />
        <p className="text-lg text-white">{slogan_verso}</p>
      </div>
    </div>
    </div>
  );
}
