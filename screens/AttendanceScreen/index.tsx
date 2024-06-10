//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer, Event, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';
import PageLayout from 'components/PageLayout';
import { useMe } from 'providers/Login';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface AttendanceEvent {
  start?: any;
  end?: any;
  title?:string;
  notes?: string;
  status?: string;
}

const StyledBox = styled(Box)({
  padding: '20px',
});

const HeaderBox = styled(Box)({
  marginBottom: '20px',
});

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#fff',
  borderRadius:"16px",
//   border: '2px solid #000',
  boxShadow: 24,
  padding: '16px',
});

const AttendanceCalendar: React.FC = () => {
    const [events, setEvents] = useState<AttendanceEvent[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [timeIn, setTimeIn] = useState<string>('');
    const [timeOut, setTimeOut] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [selectedEvent, setSelectedEvent] = useState<AttendanceEvent | null>(null);
    const me = useMe({});
    console.log(me,"me")
  
    useEffect(() => {
      initializeEvents();
    }, []); // Empty dependency array ensures this effect runs only once on mount
  
    const initializeEvents = () => {
        const today = new Date();
        const updatedEvents: AttendanceEvent[] = [];
      
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(today.getDate() - i);
      
          if (date >= today || date.getDay() === 0 || date.getDay() === 6) continue; // Skip future dates and weekends
      
          // Check if there is an event for this date where status is not "Leave"
          const existingEvent = events.find(
            (event) => event.start.toDateString() === date.toDateString() && event.status != 'Absent'
          );
      
          // If no existing event is found, add a "Leave" event
          if (!existingEvent) {
            updatedEvents.push({
              id: date.getTime().toString(), // Use timestamp as unique id
              start: date,
              end: date,
              title: 'Absent',
              status: 'Absent',
            });
          }
        }
      
        setEvents([...events, ...updatedEvents]);
      };
      
    
      const handleSelectSlot = ({ start }: { start: Date }) => {
        setSelectedEvent(null); // Reset selected event
        setSelectedDate(start);
        setTimeIn('');
        setTimeOut('');
        setNotes('');
        setStatus('');
        setModalOpen(true);
      };
    
    //   const handleEditEvent = (event: AttendanceEvent) => {
    //     setSelectedEvent(event);
    //     setSelectedDate(event.start);
    //     setTimeIn('');
    //     setTimeOut('');
    //     setNotes(event.notes || '');
    //     setStatus(event.status || '');
    //     setModalOpen(true);
    //   };
      
    const handleEditEvent = (event: AttendanceEvent) => {
        setSelectedEvent(event);
        setSelectedDate(event.start);
        const inTime = event.title?.match(/In: (\d{2}:\d{2})/)?.[1] || '';
        const outTime = event.title?.match(/Out: (\d{2}:\d{2})/)?.[1] || '';
        setTimeIn(inTime);
        setTimeOut(outTime);
        setNotes(event.notes || '');
        setStatus(event.status || '');
        setModalOpen(true);
      };

      const handleSave = () => {
        if (selectedDate) {
          const inTime = new Date(`1970-01-01T${timeIn}:00`);
          const outTime = new Date(`1970-01-01T${timeOut}:00`);
    
          if (outTime <= inTime) {
            alert('Time Out should be after Time In');
            return;
          }
    
          if (selectedEvent) {
            // Editing existing event
            const updatedEvents = events.map((event) =>
              event.id === selectedEvent.id
                ? {
                    ...event,
                    start: selectedDate,
                    end: selectedDate,
                    title: `In: ${timeIn}, Out: ${timeOut}`,
                    notes,
                    status: 'Present',
                  }
                : event
            );
            setEvents(updatedEvents);
          } else {
            // Creating new event
            setEvents([
              ...events,
              {
                id: selectedDate.getTime().toString(), // Use timestamp as unique id
                start: selectedDate,
                end: selectedDate,
                title: `In: ${timeIn}, Out: ${timeOut}`,
                notes,
                status: 'Present',
              },
            ]);
          }
        }
        setModalOpen(false);
        setTimeIn('');
        setTimeOut('');
        setNotes('');
        setStatus('');
        setSelectedEvent(null);
      };
      
      const eventStyleGetter = (event: AttendanceEvent) => {
        let backgroundColor = 'lightgray';
        if (event.status === 'Late') backgroundColor = 'orange';
        if (event.status === 'Absent') backgroundColor = 'red';
        if (event.status === 'Present') backgroundColor = 'green';
    
        const style = {
          backgroundColor,
          borderRadius: '4px',
          opacity: 0.8,
          color: 'white',
          border: '0px',
          display: 'block',
          padding: '4px',
          textAlign: 'center',
        };
        return {
          style,
        };
      };
  
    return (
    <PageLayout>
      <StyledBox>  
        {/* Calendar */}
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEditEvent} // Add onSelectEvent prop
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            eventPropGetter={eventStyleGetter}
        />
  
        {/* Modal for adding events */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ModalBox>
            <Box sx={{width:"100%",mb:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Typography variant="h6" id="modal-title">Add Attendance</Typography>
            <Close onClick={()=>setModalOpen(false)} />
            </Box>
            <TextField
              label="Time In"
              type="time"
              fullWidth
              value={timeIn}
              onChange={(e) => setTimeIn(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Time Out"
              type="time"
              fullWidth
              value={timeOut}
              onChange={(e) => setTimeOut(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Notes"
              multiline
              fullWidth
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </ModalBox>
        </Modal>
      </StyledBox>
    </PageLayout>
    );
  };
  
  export default AttendanceCalendar;
