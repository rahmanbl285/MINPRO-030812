import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  eventImage: string;
  setFiles: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function EventImage({
  eventImage,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    eventImage,
  );

  useEffect(() => {
    setPreviewImage(eventImage);
  }, [eventImage]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setFiles(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = reader.result as string;
        setPreviewImage(fileData);
        onFieldChange(fileData);
      };
      reader.readAsDataURL(file);
    }
  }

  function removePhoto() {
    setPreviewImage(undefined);
    onFieldChange('');
    setFiles(null);
  }

  const placeHolderImage =
    'https://images.unsplash.com/photo-1590884056072-0248bac7797e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <>
      {eventImage ? (
        <div className="flex relative justify-center max-h-52 md:max-h-[350px]">
          <Image
            src={previewImage || placeHolderImage}
            alt={''}
            width={1000}
            height={350}
            className="object-cover"
            priority
          ></Image>
          <div className="absolute bottom-4 right-4">
            <div className="flex transform gap-3">
              <button onClick={removePhoto}>
                <MdDelete className="text-2xl text-putih" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex relative justify-center max-h-52 md:max-h-[350px]">
            <Image
              src={previewImage || placeHolderImage}
              alt={''}
              width={1000}
              height={350}
              className="object-cover"
              priority
            ></Image>
            <div className="absolute bottom-4 right-4">
              <div className="flex transform gap-3">
                <label>
                  <FaEdit className="text-2xl text-putih cursor-pointer" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
