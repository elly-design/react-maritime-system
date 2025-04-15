import React, { useState } from 'react';

interface StaffMember {
  idPassport: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  vesselType: string;
  status: string;
}

export default function StaffDataManagement() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState<StaffMember>({
    idPassport: '',
    fullName: '',
    gender: '',
    phoneNumber: '',
    vesselType: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (!formData.idPassport) return;

    const newStaff = { ...formData };
    setStaffMembers((prev) => [...prev, newStaff]);
    handleClear();
  };

  const handleDelete = () => {
    if (!selectedStaff) return;

    setStaffMembers((prev) =>
      prev.filter((staff) => staff.idPassport !== selectedStaff.idPassport)
    );
    handleClear();
  };

  const handleUpdate = () => {
    if (!selectedStaff || !formData.idPassport) return;

    setStaffMembers((prev) =>
      prev.map((staff) =>
        staff.idPassport === selectedStaff.idPassport ? formData : staff
      )
    );
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      idPassport: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      vesselType: '',
      status: '',
    });
    setSelectedStaff(null);
  };

  const handleImport = async () => {
    console.log('Import functionality');


    console.log('Fetching staff data from the backend...');
    
    try {
      // Fetch data from your backend API
      const response = await fetch('https://your-backend-api.com/staff'); // Replace with your real API endpoint
      const data: StaffMember[] = await response.json();
  
      // Validate and process the data
      const validatedData = data.map((staff) => {
        // Validate phone number (must start with a country code)
        const phoneRegex = /^\+\d{1,3}\d{4,14}$/; // Example: +1234567890
        if (!phoneRegex.test(staff.phoneNumber)) {
          throw new Error(`Invalid phone number for ${staff.fullName}: ${staff.phoneNumber}`);
        }
  
        // Validate ID/Passport format
        const passportRegex = /^[A-Za-z]{2}\d{6}$/; // Example: AB123456
        const idRegex = /^\d{8}$/; // Example: 12345678
        if (!passportRegex.test(staff.idPassport) && !idRegex.test(staff.idPassport)) {
          throw new Error(`Invalid ID/Passport format for ${staff.fullName}: ${staff.idPassport}`);
        }
  
        // Ensure status is either "Active" or "Pending"
        if (staff.status !== 'Active' && staff.status !== 'Pending') {
          staff.status = 'Pending'; // Default to "Pending" if invalid
        }
  
        return staff;
      });
  
      // Update the state with validated data
      setStaffMembers((prev) => [...prev, ...validatedData]);
      console.log('Staff data imported successfully:', validatedData);
    } catch (error) {
      console.error('Error importing staff data:', error);
      if (error instanceof Error) {
        alert(`Error importing staff data: ${error.message}`);
      } else {
        alert('An unknown error occurred while importing staff data.');
      }
    }
  };

  const selectStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setFormData(staff);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Staff Members Data</h1>

      {/* Staff Data Display Area */}
      <div className="mb-6 bg-gray-200 rounded-md p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
        {staffMembers.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Vessel Type</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((staff) => (
                <tr
                  key={staff.idPassport}
                  className={`hover:bg-gray-100 cursor-pointer ${
                    selectedStaff?.idPassport === staff.idPassport
                      ? 'bg-blue-100'
                      : ''
                  }`}
                  onClick={() => selectStaff(staff)}
                >
                  <td className="p-2">{staff.idPassport}</td>
                  <td className="p-2">{staff.fullName}</td>
                  <td className="p-2">{staff.gender}</td>
                  <td className="p-2">{staff.phoneNumber}</td>
                  <td className="p-2">{staff.vesselType}</td>
                  <td className="p-2">{staff.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No staff data available
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            STAFF ID
          </label>
          <input
            type="text"
            name="idPassport"
            value={formData.idPassport}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>

        <div className="row-span-3">
  <div className="h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4 shadow-md">
    <label
      htmlFor="photo-upload"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Upload Staff Photo
    </label>
    <input
      id="photo-upload"
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          console.log('Selected file:', file);
          // You can handle the file upload here
          // For example, upload it to a server or display a preview
        }
      }}
      className="mb-4 w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
    <button
      onClick={() => alert('Upload functionality not implemented yet!')}
      className="bg-indigo-800 text-white px-6 py-2 rounded-lg hover:bg-indigo-900 transition-colors"
    >
      Upload Photo
    </button>
  </div>
</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vessel Type
          </label>
          <input
            type="text"
            name="vesselType"
            value={formData.vesselType}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleAdd}
          className="flex-1 bg-indigo-800 text-white py-2 rounded hover:bg-indigo-900"
        >
          ADD
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-indigo-800 text-white py-2 rounded hover:bg-indigo-900"
        >
          Delete
        </button>

        <button
          onClick={handleUpdate}
          className="flex-1 bg-indigo-800 text-white py-2 rounded hover:bg-indigo-900"
        >
          Update
        </button>

        <button
          onClick={handleClear}
          className="flex-1 bg-indigo-800 text-white py-2 rounded hover:bg-indigo-900"
        >
          Clear
        </button>
        <button
          onClick={handleImport}
          className="flex-1 bg-indigo-800 text-white py-2 rounded hover:bg-indigo-900"
        >
          Import
        </button>
      </div>
    </div>
  );
}