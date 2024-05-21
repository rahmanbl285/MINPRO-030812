"use client"
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/features/hooks';
import Cookies from 'js-cookie';

// Definisikan interface IUser di sini
interface IUser {
  id: number;
  fullName: string;
  email: string;
  profileImg: string;
  referral : string | null,
  usedReferralCode: string | null;
  isEventOrganizer: boolean;
  Points: number;
  Discount: {
    discountStatus: string;
    currentDiscount: number;
    expired_date: string;
  }[];
  Event: {
    id: number;
    name: string;
    date: string;
  }[];
  
}

const MainProfile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
//   const token = useAppSelector((state) => state.user.value)
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          console.log('Login first');
          return;
        }

        const res = await fetch(`http://localhost:8000/api/users/user-profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }

        const responseData = await res.json();
        setUser(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  function formatNumber(number: number) {
    return new Intl.NumberFormat('de-DE').format(number);
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-profile mx-10">
      <div className="container flex flex-col pb-10">
        <div className="card bg-biru shadow-xl p-4">
          <div className="card-title">{user.fullName}</div>
          <div className="card-body text-putih">
            {user.Discount.length > 0 ? (
              user.Discount.map((voucher, index) => (
                <div key={index} className="voucher-item">
                  <p>Voucher: <br /> Diskon {voucher.discountStatus}%</p>
                  <p>Kadaluarsa: <br />
                    {new Date(voucher.expired_date).toLocaleDateString('id', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p>No active vouchers</p>
            )}
            <p>Poin: <br /> {formatNumber(user.Points)}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card bg-biru text-putih shadow-xl p-4">
          <div className="card-title">Biodata Diri</div>
          <div className="card-body">
            <div className="biodata-grid">
              <div className="container max-md:w-[50%]">
                <img
                  src={user.profileImg || 'N/A'}
                  alt="Profile"
                  className="w-[17rem] h-[17rem] object-cover max-md:w-[13rem] max-md:h-[13rem] max-sm:w-[9rem] max-sm:h-[9rem]"
                />
              </div>
              <div className="container max-md:w-[100%]">
                <table className="w-full h-auto">
                  <tbody>
                    <tr>
                      <td className="w-[40%] text-left">Username </td>
                      <td className="w-[60%] text-center">{user.fullName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="w-[40%] text-left">Email </td>
                      <td className="w-[60%] text-center">{user.email || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="w-[40%]">Kode Referral</td>
                      <td className="w-[60%] text-center">{user.referral || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="w-[40%]">Used Referral Code</td>
                      <td className="w-[60%] text-center">{user.usedReferralCode || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="w-[40%]">Event Organizer</td>
                      <td className="w-[60%] text-center">{user.isEventOrganizer ? 'Yes' : 'No'}</td>
                    </tr>
                  </tbody>
                </table>
                <a href="/profile/edit-profile" className="btn btn-primary w-auto mt-10">
                  Edit Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
