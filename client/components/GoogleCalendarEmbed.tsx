import React from "react";

export default function GoogleCalendarEmbed({
  calendarId,
  timeZone = "Asia/Kolkata",
  height = 600,
}: {
  calendarId?: string;
  timeZone?: string;
  height?: number;
}) {
  const src = calendarId
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
        calendarId,
      )}&ctz=${encodeURIComponent(
        timeZone,
      )}&mode=AGENDA&showTitle=0&showPrint=0&showTabs=0&showDate=0&showNav=1&showCalendars=0&showTz=0&wkst=1&bgcolor=%23ffffff`
    : null;

  return (
    <section className="overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        {calendarId && (
          <a
            href={`https://calendar.google.com/calendar/u/0?cid=${encodeURIComponent(
              calendarId,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary underline"
          >
            Open in Google Calendar
          </a>
        )}
      </div>
      {src ? (
        <div className="bg-background">
          <iframe
            title="Google Calendar - Upcoming Events"
            src={src}
            className="w-full"
            style={{ height }}
            frameBorder={0}
            scrolling="no"
          />
        </div>
      ) : (
        <div className="px-4 py-6 text-sm text-muted-foreground border-t">
          Add a public Google Calendar ID to VITE_GOOGLE_CALENDAR_ID to show upcoming events.
        </div>
      )}
    </section>
  );
}
