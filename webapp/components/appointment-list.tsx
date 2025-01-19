"use client"

export default function AppointmentList({ appointments }: { appointments: any[] }) {
    return (
      <ul className="space-y-2">
        {appointments.map((appt) => (
          <li
            key={appt.id}
            className="flex justify-between rounded-lg bg-gray-100 p-4"
          >
            <div>
              <p className="font-bold">{appt.date}</p>
              <p>{appt.time}</p>
            </div>
            <p className="text-blue-600">{appt.doctor}</p>
          </li>
        ))}
      </ul>
    );
  }
  