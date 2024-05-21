'use client'

import {  createEvent } from '@/lib/event'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import EventImage from './imageEvent'
import { FiUpload } from 'react-icons/fi'
import { useState } from 'react'
import { useAppDispatch } from '@/lib/features/hooks'
import Cookies from 'js-cookie'
import { setEvent } from '@/lib/features/event/eventSlice'

const categories = ['Festival', 'Konser', 'Pertandingan', 'Pameran', 'Workshop', 'Pertunjukan', 'Seminar']

const CreateEventSchema = yup.object().shape({
    eventTitle: yup.string().required('event title required'),
    startDate: yup.date().required('event start date required'),
    endDate: yup.date().required('event end date required'),
    eventCategory: yup.string()
    .oneOf(categories, 'event category invalid')
    .required('event category required'),
    eventLocation: yup.string().required('event location required'),
    description: yup.string().required('description required'),
    ticketName: yup.string().required('ticket name required'),
    availableSeat: yup.number().required('available seat required'),
    ticketPrice: yup.number().required('ticket price required'),
    startSaleDate: yup.date().required('start sale date required'),
    endSaleDate: yup.date().required('end sale date required'),    
})
export default function CreateEventAll() {
    const [eventImage, setEventImage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    // const dispatch = useAppDispatch()

    //event image
    const handleFieldChange = (url: string) => {
        setEventImage(url);
    };

    // tabs
    const [activeTab, setActiveTab] = useState("kategori tiket")
    const handleTabClick = (tab:any, tiket:any) => {
        tiket.preventDefault(); // Mencegah scroll ke atas
        setActiveTab(tab);
      };

    const onCreateEvent = async (data: any) => {
        console.log(file);
        
        try {
            // const token = Cookies.get('token')
            // if(!token) {
            //     console.log('No Token Found');
            //     return 
            // }

            const startDate = new Date (data.startDate)
            const endDate = new Date (data.endDate)
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.error('Invalid date format');
                return;
              }

            const formData = new FormData()
            formData.set('eventTitle', data.eventTitle)
            formData.set('startDate', data.startDate)
            formData.set('endDate', data.endDate)
            formData.set('eventCategory', data.eventCategory)
            formData.set('eventLocation', data.eventLocation)
            formData.set('description', data.description)
            formData.set('ticketName', data.ticketName)
            if(file) {
                formData.set('file', file)
            }
            formData.set('availableSeat', data.availableSeat)
            formData.set('ticketPrice', data.ticketPrice)
            formData.set('startSaleDate', data.startSaleDate)
            formData.set('endSaleDate', data.endSaleDate)
            console.log(formData);
          
            const res = await createEvent(formData)
            if(res.error) {
                console.error('Error post new event: ', res.error);
                return;
            }

            alert('Event added successfully');
            console.log('res from createEvent:', res);

        } catch (err) {
            console.log('error on edit createnewevent:', err);
        }
    }
    

    return (
        <Formik
        initialValues={{
            eventTitle: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            eventCategory: '',
            eventLocation: '',
            description: '',
            ticketName: '',
            availableSeat: '',
            ticketPrice: '',
            startSaleDate: new Date().toISOString().split('T')[0],
            endSaleDate: new Date().toISOString().split('T')[0],
            
        }}
        validationSchema={CreateEventSchema}
        onSubmit={(values, action) => {
            console.log(values);
            onCreateEvent(values);
            action.resetForm()
        }}
        >
            {() => {
                    return (

                        <Form className='flex flex-col lg:flex-row w-full gap-3 lg:gap-10 justify-center lg:px-2'>
                            <div className="card card-compact max-w-full  bg-putih shadow-xl">
                                
                                <EventImage
                                eventImage={eventImage}
                                onFieldChange={handleFieldChange}
                                setFiles={setFile}
                            />
                                
                                <div className="card-body w-full">
                                    <div className="flex flex-col gap-1">
                                        <label className='input input-bordered flex w-full items-center gap-2'>
                                            Nama Event
                                            <Field
                                                name="eventTitle"
                                                type="text"
                                                className="grow"
                                            />
                                            <ErrorMessage
                                                name='eventTitle'
                                                component={'div'}
                                                className='text-sm text-merah'
                                            />
                                        </label>
                                        <Field 
                                            as='select'
                                            name='eventCategory'
                                            className="select select-bordered bg-putih w-full"
                                        >
                                            <option disabled value=''>Pilih Kategori</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name='eventCategory'
                                            component={'div'}
                                            className='text-sm text-merah'
                                            />
                                    </div>  

                                    <hr className="my-3 text-biru/80"/>
                                          
                                                <div className="flex flex-col gap-3">
                                                    <h6 className="text-lg text-nowrap text-biru/50">Tanggal dan Waktu</h6>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex flex-col text-biru text-nowrap w-full gap-1 ">
                                                            <p>Tanggal Mulai</p>
                                                            <Field
                                                                name='startDate'
                                                                type='date'
                                                                className='input-sm input border-abu border w-full'
                                                            />
                                                            <ErrorMessage
                                                                name='startDate'
                                                                component={'div'}
                                                                className='text-sm text-merah'
                                                            />
                                                        </div>
                                                        <div className="flex flex-col text-biru text-nowrap w-full gap-1 ">
                                                            <p>Tanggal Berakhir</p>
                                                            <Field
                                                                name='endDate'
                                                                type='date'
                                                                className='input-sm input border-abu border w-full'
                                                            />
                                                            <ErrorMessage
                                                                name='endDate'
                                                                component={'div'}
                                                                className='text-sm text-merah'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                               
                                                <div className="flex flex-col gap-3">
                                                    <h6 className="text-lg text-biru/50">Lokasi</h6>
                                                    <div className="flex flex-col text-biru text-nowrap w-full gap-1">
                                                        <p>Pilih Lokasi</p>
                                                        <Field
                                                            name='eventLocation'
                                                            type='text'
                                                            className='input border border-abu input-sm max-w-full'
                                                        />
                                                        <ErrorMessage
                                                            name='eventLocation'
                                                            component={'div'}
                                                            className='text-sm text-merah'
                                                        /> 
                                                    </div>
                                                </div>
                                    </div>

                                    {/* tabs kategori tiket & deskripsi event */}
                                    <div>
                                    <div className="pt-6 max-w-full">
          <div role="tablist" className="tabs tabs-bordered">
            <button className={`tab text-birutua text-nowrap text-sm font-bold ${activeTab === "kategori tiket" ? 'tab-active' : ''}`} onClick={(e) => handleTabClick("kategori tiket", e)}>
                KATEGORI TIKET
            </button>
            <button className={`tab text-birutua text-nowrap text-sm font-bold ${activeTab === "deskripsi event" ? 'tab-active' : ''}`} onClick={(e) => handleTabClick("deskripsi event", e)}>
              DESKRIPSI EVENT
            </button>
          </div>
          
          <div className="mt-5 px-5">
            {activeTab === "kategori tiket" && (
              <div className="flex flex-col gap-2">

                {/* Konten untuk kategori tiket */}
                <h6 className="font-bold text-lg">FORM TIKET</h6>
                <div className='flex flex-col gap-3'>
                        <label className="input input-bordered text-sm text-nowrap bg-putih flex items-center gap-2">
                            Nama Tiket
                            <Field
                                name='ticketName'
                                type='text'
                                className='grow'
                            />
                            <ErrorMessage
                                name='ticketName'
                                component={'div'}
                                className='text-sm text-merah'
                            />
                        </label>

                        <label className="input input-bordered text-sm text-nowrap bg-putih flex items-center gap-2">
                            Jumlah Tiket
                            <Field
                                name='availableSeat'
                                type='number'
                                className='grow'
                            />
                            <ErrorMessage
                                name='availableSeat'
                                component={'div'}
                                className='text-sm text-merah'
                            />
                        </label>

                        <label className="input input-bordered text-sm text-nowrap bg-putih flex items-center gap-2">
                            Rp
                            <Field
                                name='ticketPrice'
                                type='number'
                                className='grow'
                            />
                            <ErrorMessage
                                name='ticketPrice'
                                component={'div'}
                                className='text-sm text-merah'
                            />
                        </label>

                        <label className="input bg-putih input-bordered flex text-sm text-nowrap items-center gap-2">
                            Start Sale
                            <Field
                                name='startSaleDate'
                                type='date'
                                className='input-sm input border-abu border w-full'
                            />
                            <ErrorMessage
                                name='startSaleDate'
                                component={'div'}
                                className='text-sm text-merah'
                            />
                        </label>

                        <label className="input bg-putih input-bordered flex text-sm text-nowrap items-center gap-2">
                            End Sale
                            <Field
                                name='endSaleDate'
                                type='date'
                                className='input-sm input border-abu border w-full'
                            />
                            <ErrorMessage
                                name='endSaleDate'
                                component={'div'}
                                className='text-sm text-merah'
                            />
                        </label>
                    </div>

              </div>
            )}
            {activeTab === "deskripsi event" && (
              <div className="flex flex-col gap-2">

                {/* Konten untuk deskripsi event */}
                    <h6 className="font-bold text-lg">DESKRIPSI EVENT</h6>
                    <div>
                    <label className="form-control">
                        <Field
                            name='description'
                            type='text'
                            className='textarea textarea-bordered h-52'
                        />
                    </label>
                    </div>
              </div>
            )}
          </div>
        </div>

                                    </div>

                                    <div>
                                    
                                    {/* button submit */}
                                    <div className="card-actions justify-end">
                                        <button type='submit' className="btn text-putih bg-biru border-none btn-primary">Buat Event Sekarang</button>
                                    </div>

                                </div>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}