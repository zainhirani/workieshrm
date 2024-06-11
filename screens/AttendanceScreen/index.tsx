//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer, Event, Views } from 'react-big-calendar';
import { format, parse,parseISO , startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';
import PageLayout from 'components/PageLayout';
import { useMe } from 'providers/Login';
import { useAttendanceListing, useCreateAttendance } from 'providers/Attendance';

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
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const me = useMe({});
  const markAttendance = useCreateAttendance();
  const employeeAttendanceCalendar = useAttendanceListing();

  useEffect(() => {
    if (employeeAttendanceCalendar?.data?.data) {
      const dataLength = employeeAttendanceCalendar.data.data.length;
      const slicedData = employeeAttendanceCalendar.data.data.slice(dataLength - 60, dataLength);
      const mappedEvents = employeeAttendanceCalendar.data.data.map((event) => ({
        id: event._id,
        start: parseISO(event.Arrival),
        end: parseISO(event.Departure),
        title: event.AttendanceStatus,
        notes: event.LeaveApprovalStatus ? 'Approved' : 'Pending',
      }));
      setEvents(mappedEvents);
    }
  }, [employeeAttendanceCalendar?.data?.data]);
  

  const handleSelectSlot = ({ start }) => {
    setSelectedEvent(null); // Reset selected event
    setSelectedDate(start);
    setTimeIn('');
    setTimeOut('');
    setNotes('');
    setModalOpen(true);
  };

  const handleSave = () => {
    if (selectedDate) {
      const inTime = new Date(`1970-01-01T${timeIn}:00`);
      const outTime = new Date(`1970-01-01T${timeOut}:00`);
      const diffInHours = (outTime - inTime) / (1000 * 60 * 60); // Difference in hours
  
      let attendanceStatus = 'Leave';
      if (diffInHours < 9) {
        attendanceStatus = 'LeaveEarlier';
      } else if (diffInHours >= 9 && diffInHours <= 24) {
        attendanceStatus = 'Present';
      }
  
      markAttendance.mutate({ Arrival: inTime, Departure: outTime });
  
      if (outTime <= inTime) {
        alert('Time Out should be after Time In');
        return;
      }
  
      const newEvent = {
        id: selectedDate.getTime(), // Use timestamp as unique id
        start: selectedDate,
        end: selectedDate,
        title: attendanceStatus,
        status: attendanceStatus,
      };
  
      setEvents([...events, newEvent]); // Add the new event to the events state
    }
  
    setModalOpen(false);
    setTimeIn('');
    setTimeOut('');
    setNotes('');
    setSelectedEvent(null);
  };
  

  const eventStyleGetter = (event) => {
    let backgroundColor = 'lightgray';
    if (event.title === 'Leave') backgroundColor = 'orange';
    if (event.title === 'LeaveEarlier') backgroundColor = 'red';
    if (event.title === 'Present') backgroundColor = 'green';

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
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            eventPropGetter={eventStyleGetter}
        />

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ModalBox>
            <Box sx={{width:"100%",mb:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Typography variant="h6" id="modal-title">Add Attendance</Typography>
              <Close onClick={() => setModalOpen(false)} />
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
