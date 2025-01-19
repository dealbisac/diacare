"use client"

export default function AlertList({ alerts }: { alerts: any[] }) {
    return (
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="flex justify-between rounded-lg bg-gray-100 p-4"
          >
            <div>
              <p className="font-bold">{alert.type}</p>
              <p>{alert.threshold}</p>
            </div>
            <p>{alert.enabled ? "Enabled" : "Disabled"}</p>
          </li>
        ))}
      </ul>
    );
  }
  