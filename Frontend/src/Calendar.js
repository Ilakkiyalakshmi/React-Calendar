import React, { useState, useEffect } from "react";
import BigCalendar, { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

//import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

// import TimePicker from '@mui/lab/TimePicker';
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Circle from "@uiw/react-color-circle";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

import Checkbox from "@mui/material/Checkbox";
//import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TimePicker from "@mui/lab/TimePicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import logo from "./calend.png";
//import DialogContentText from '@mui/material/DialogContentText';

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { Button, Modal } from "antd";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import NavBar from "./Components/NavBar";
import DisabledContext from "antd/es/config-provider/DisabledContext";

// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//BigCalendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(dayjs().format("DD"));
  const [end, setEnd] = useState(dayjs());
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(moment());
  const [displayDetails, setDisplayDetails] = useState([]);
  const [User, setUser] = useState([]);
  const [temp, setTemp] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [token, setToken] = useState(props.token);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hex, setHex] = useState("#F44E3B");
 const [startTime,setStartTime]=useState('')
 const [endTime,setEndTime]=useState('')


  //console.log(currentDate(moment("d")),"www")

  // console.log(start, "start");


  console.log(props,"props")

  const Category = ["Everyone", "Rooms"];
  console.log(selectedCategory, "select");

  let currentTime = currentHour;

  if (currentTime < 12) currentTime = currentTime + "AM";
  else if (currentTime == "12") currentTime = currentTime + "PM";
  else currentTime = currentTime - 12 + "PM";

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const users = User.filter((a) => a.email != props.userEmail);

//   console.log(users,"2222")

//  console.log(User,"user")

console.log(start,typeof(start),"start");
console.log(end,typeof(start),"end")

  useEffect(() => {
    if (selectedCategory == "Everyone") {
      setSelectedUsers(User);
    }else{
      setSelectedUsers([])
    }
  }, [selectedCategory,User]);

 

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
  };

  const handleSlotSelected = (slotInfo) => {
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setTitle("");
    setDesc("");
    setStartTime("");
    setEndTime("");
    setSelectedCategory("");
    setSelectedUsers([]);
    setOpenSlot(true);
  };



  const handleEventSelected = (event) => {
   
    setTemp(event);
    setClickedEvent(event);
    setStart(new Date(event.start).toISOString());
    //setStart(new Date(JSON.parse(JSON.stringify(event.start))));
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.description);
    // const arr=event.visibility.filter((name)=>User.find((i)=>i._id===name&&i.username))
    const arr = User?.filter((name) =>
      event?.visibility?.find((i) => i === name?._id)
    );
    const arr1 = arr.map((a) => a.username);
    setSelectedUsers(arr1);

    setOpenEvent(true);
  };

  const handleStartTime = (date) => {
    //console.log(date,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    setStart(JSON.stringify(date));
  };
  //console.log(start,"start")

  const handleEndTime = (date) => {
    setEnd(JSON.stringify(date));
  };

  const setNewAppointment = async () => {
    const appointment = { title, start: start, end: end, description: desc };
    //console.log(appointment)
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    
    await axios.post(
      "http://localhost:3000/api/events/createEvents",
      { ...appointment, selectedUsers },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const response = await axios.get(
      "http://localhost:3000/api/events/getEvents",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setDisplayDetails(response.data.data);
    console.log(displayDetails, "iiii");
    handleClose();
  };

  

  const updateEvent = async () => {
    if (temp && temp._id) {
      const updatedEvent = { title, description: desc, start: start, end: end };

      try {
        const response = await axios.patch(
          `http://localhost:3000/api/events/updateEvents/${temp._id}`,
          updatedEvent,
          {
            headers: { Authorization: `Bearer ${props.token}` },
          }
        );

        // Update the events state with the updated event
        console.log(response.data.data, "44444");
        if (response.data.data)
          setDisplayDetails((prevDetails) =>
            prevDetails.map((detail) =>
              detail._id === temp._id ? response.data.data : detail
            )
          );
        handleClose();
      } catch (error) {
        console.error("Error updating event:", error);
        if (error.message) {
          alert(error.response.data.message);
        }
      }
    } else {
      console.error(
        "Error: temp is undefined or does not have an _id property"
      );
    }
  };

  const deleteEvent = () => {
    //const updatedEvents = events.filter((event) => event.start !== start);
    const id = temp._id;
    //console.log(id, "gggg");
    axios
      .delete(`http://localhost:3000/api/events/deleteEvents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res,"res")
        setDisplayDetails((r) => r.filter((e) => e._id !== id));
        if (res.data.message) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message, "lllllll");
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      });
    //setEvents(updatedEvents);
  };

  const handleNavigate = (date, view) => {
    setCurrentDate(moment(date));
    // Handle navigation logic here if needed
    // For example, you might fetch new data for the specified date and view
    //console.log("Navigating to:", date, "View:", view);
  };

  const handleViewChange = (view) => {
    // Handle view change logic here
    // For example, you might fetch new data for the selected view
    // console.log("Changing view to:", view);

    // Update the state to reflect the new view
    setCurrentView(view);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/events/getEvents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const responseUser = await axios.get(
          "http://localhost:3000/api/users/getUser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(responseUser.data.data);

        const arrayData = response.data.data?.length
          ? response.data.data?.map((x) => ({
              description: x?.description,
               end: new Date(x?.endDate || x?.end),
               start: new Date(x?.startDate || x?.start),
              // start:moment(start).toDate(),
              // end:moment(end).toDate(),
              title: x?.title,
              user_id: x?.user_id,
              visibility: x?.visibility,
              _id: x?._id,
            }))
          : [];

        setDisplayDetails(arrayData);
      } catch (error) {
        console.log(error, "err");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //console.log(selectedUsers, "sssss");

  const eventActions = [
    <Button
      label="Cancel"
      primary={false}
      keyboardFocused={true}
      onClick={handleClose}
    >
      Cancel
    </Button>,
    <Button
      label="Delete"
      secondary={true}
      keyboardFocused={true}
      onClick={() => {
        deleteEvent();
        handleClose();
      }}
    >
      Delete
    </Button>,
    <Button
      label="Confirm Edit"
      primary={true}
      keyboardFocused={true}
      onClick={() => {
        updateEvent();
        handleClose();
      }}
    >
      Confirm Edit
    </Button>,
  ];

  const appointmentActions = [
    <Button secondary={true} onClick={handleClose}>
      cancel
    </Button>,
    <Button
      primary={true}
      keyboardFocused={true}
      onClick={() => {
        setNewAppointment();
        handleClose();
        //console.log(events,"events")
      }}
      {...console.log(title.length,desc.length,startTime.length,endTime.length,'kkkkkkkkk')}
      disabled={title.length===0||desc.length===0||startTime.length===0||endTime.length===0}
    >
      submit
    </Button>,
  ];

  //console.log(users,"users")
  //console.log(users,User,'kkkkkkkkkkkkk')
  let date = new Date();
  let current = new Date(start);
  var hour = date.getHours();
  var minute = date.getMinutes();
  current.setHours(hour);
  current.setMinutes(minute);
  current.setSeconds(0);
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <BigCalendar
        events={displayDetails}
        
        localizer={localizer}
       
        timeslots={2}
        view={currentView}
        defaultDate={new Date()}
        selectable={true}
        onSelectEvent={handleEventSelected}
        onSelectSlot={handleSlotSelected}
        components={{
          toolbar: (props) => (
            <header className="px-4 py-2 flex items-center ">
              <img src={logo} alt="calendar" className="mr-2 w-12 h-12"></img>
              <h1 className="mr-10 text-xl font-bold text-gray-500">
                Calendar Scheduler App
              </h1>

              <button
                className="text-green-300 border rounded py-2 px-4 mr-5"
                onClick={() => props.onNavigate("TODAY")}
              >
                Today
              </button>
              <div>
                <button
                  className="text-blue-300 mr-2"
                  onClick={() => props.onNavigate("PREV")}
                >
                  <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    <ArrowLeftIcon></ArrowLeftIcon>
                  </span>
                </button>
                <button
                  className="text-blue-300 mr-2"
                  onClick={() => props.onNavigate("NEXT")}
                >
                  <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    <ArrowRightIcon></ArrowRightIcon>
                  </span>
                </button>
              </div>
              <div className="ml-4 text-xl text-gray-500 font-bold">
                {props.label}
              </div>

              

              <div className="ml-auto">
                <button
                  className={`mr-2 border rounded py-2 px-4 ${
                    props.view === "month" ? "border rounded py-2 px-4 " : ""
                  }`}
                  onClick={() => setCurrentView("month")}
                >
                  Month
                </button>
                <button
                  className={`mr-2 border rounded py-2 px-4 ${
                    props.view === "week" ? "border rounded py-2 px-4" : ""
                  }`}
                  onClick={() => setCurrentView("week")}
                >
                  Week
                </button>
                <button
                  className={`mr-2 border rounded py-2 px-4 ${
                    props.view === "day" ? "border rounded py-2 px-4 " : ""
                  }`}
                  onClick={() => setCurrentView("day")}
                >
                  Day
                </button>
                <button
                  className={`mr-2 border rounded py-2 px-4 ${
                    props.views === "agenda" ? "font-bold" : ""
                  }`}
                  onClick={() => setCurrentView("agenda")}
                >
                  Agenda
                </button>
              </div>
            </header>
          ),
        }}
        onNavigate={handleNavigate}
        onView={handleViewChange}
      />

      <Dialog
        title={`Book an appointment on ${moment(start).format("MMMM Do YYYY")}`}
        actions={appointmentActions}
        modal={false}
        open={openSlot}
        onRequestClose={handleClose}
        // style={
        //   {maxHeight:"500px",width:'100%'}
        // }
      >
        <DialogTitle>{`Book an appointment on ${moment(start).format(
          "MMMM Do YYYY"
        )}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Title"
            label="Title"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="des"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="start-Date"
                value={dayjs(start)}
                onChange={(e) => handleStartTime(e)}
                sx={{width:270}}
              />


            </DemoContainer>
          </LocalizationProvider>


       
          <input
            type="time"
            className="border border-box p-2 mt-2 rounded-lg mx-2"
            placeholder="Start-time"
           
            // {...console.log( current.toLocaleTimeString('en-US', { hour12: true }),'kkkkkkkkk')}
            min={
              moment(start).format("ddd MMM DD YYYY") ===
              date.toDateString(date)
                ? current.toLocaleTimeString("en-US", { hour12: true })
                : null
            }
            onChange={(e) => {
             
              let currentDate = new Date(start);
              currentDate.setHours(parseInt(e.target.value.split(":")[0]));
              currentDate.setMinutes(parseInt(e.target.value.split(":")[1]));
              currentDate.setSeconds(0);
              setStartTime(e.target.value)
          
              setStart(currentDate);
            }}
          />

</div>

<div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="end-Date"
                value={dayjs(end)}
                onChange={(e) => handleEndTime(e)}
                minDate={start}
                sx={{width:270}}
              />
            </DemoContainer>
          </LocalizationProvider>
        
          <br></br>
        
          <input
            type="time"
            className="border border-box p-2 mt-2 rounded-lg mx-2"
            placeholder="End-Time"
          
            onChange={(e) => {
              let currentDate = new Date(end);
              currentDate.setHours(parseInt(e.target.value.split(":")[0]));
              currentDate.setMinutes(parseInt(e.target.value.split(":")[1]));
              currentDate.setSeconds(0);

              setEndTime(e.target.value)
            
              setEnd(currentDate);
            }}
          />

</div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={selectedCategory}
            options={Category}
            onChange={(event, newValue) => {
              setSelectedCategory(newValue);
            }}
            sx={{ width: 400, paddingTop: "10px" }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          {selectedCategory === "Rooms" && (
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              // options={top100Films}
              value={selectedUsers}
              options={[...users]}
              disableCloseOnSelect
              getOptionLabel={(option) => option.username} // Assuming 'username' is the property containing the user's name
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  {
                  
                    new Date(option.loginTime).getHours() * 60 +
                      new Date(option.loginTime).getMinutes() <=
                      new Date(start).getHours() * 60 +
                        new Date(start).getMinutes() &&
                    new Date(option.logoutTime).getHours() * 60 +
                      new Date(option.logoutTime).getMinutes() >=
                      new Date(end).getHours() * 60 +
                        new Date(end).getMinutes() ? (
                      <div className="flex">
                        <Circle
                          colors={["#13DA63"]}
                          color={hex}
                          onChange={(color) => {
                            setHex(color.hex);
                          }}
                        />

                        {option.username}
                      </div>
                    ) : (
                      <div className="flex">
                        <Circle
                          colors={["#DA1313"]}
                          color={hex}
                          onChange={(color) => {
                            setHex(color.hex);
                          }}
                        />
                        {option.username}
                      </div>
                    )
                  }
                </li>
              )}
              onChange={(event, newValue) => {

               
                newValue.map((val) => {
                  new Date(val.loginTime).getHours() * 60 +
                    new Date(val.loginTime).getMinutes() <=
                    new Date(start).getHours() * 60 +
                      new Date(start).getMinutes() &&
                    new Date(val.logoutTime).getHours() * 60 +
                      new Date(val.logoutTime).getMinutes() >=
                      new Date(end).getHours() * 60 +
                        new Date(end).getMinutes() &&
                    setSelectedUsers((prev) => [...new Set([...prev, val])]);
                });
              }}
              sx={{ width: 400, paddingTop: "10px" }}
              renderInput={(params) => <TextField {...params} label="Users" />}
              disabled={selectedCategory === "Everyone"}
            />
          )}
          <Switch {...label} /> All day
        </DialogContent>

        <DialogActions>{appointmentActions}</DialogActions>
      </Dialog>

      <Dialog
        title={`View/Edit Appointment of ${moment(start).format(
          "MMMM Do YYYY"
        )}`}
        actions={eventActions}
        modal={false}
        open={openEvent}
        onRequestClose={handleClose}
      >
        <DialogTitle>{`Book an appointment on ${moment(start).format(
          "MMMM Do YYYY"
        )}`}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Title"
            label="Title"
            defaultValue={title}
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="desc"
            label="Description"
            defaultValue={desc}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="flex ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="start-Date"
                value={dayjs(start)}
                onChange={(e) => handleStartTime(e)}
                sx={{width:270}}
              />
            </DemoContainer>
          </LocalizationProvider>

         
          <input
            type="time"
            className="border border-box p-2 mt-2 rounded-lg mx-2"
            value={new Date(start).getHours()+":"+new Date(start).getMinutes()}
            onChange={(e) => {
              let currentDate = new Date(start);
              currentDate.setHours(parseInt(e.target.value.split(":")[0]));
              currentDate.setMinutes(parseInt(e.target.value.split(":")[1]));
              currentDate.setSeconds(0);
              //console.log(currentDate);
              // console.log(e.target.value)
              setStart(currentDate);
            }}
          />

</div>
<div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="end-Date"
                value={dayjs(end)}
                onChange={(e) => handleEndTime(e)}
                sx={{width:270}}
              />
            </DemoContainer>
          </LocalizationProvider>
         
          <br></br>
        
          <input
            type="time"
            className="border border-box p-2 mt-2 rounded-lg mx-2"
            value={new Date(end).getHours()+":"+new Date(end).getMinutes()}
            onChange={(e) => {
              let currentDate = new Date(end);
              currentDate.setHours(parseInt(e.target.value.split(":")[0]));
              currentDate.setMinutes(parseInt(e.target.value.split(":")[1]));
              currentDate.setSeconds(0);
              //console.log(currentDate);
              // console.log(e.target.value)
              setEnd(currentDate);
            }}
          />
          </div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Category}
            defaultValue={selectedCategory}
            sx={{ width: 400, paddingTop: "10px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                onChange={(e) => {
                  setSelectedCategory(e);
                }}
                value={selectedCategory}
              />
            )}
          />
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={User}
            // getOptionLabel={(option) => option.title}
            defaultValue={selectedUsers}
            //{...console.log(selectedUsers,"uuuuuu")}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            style={{ width: 400, paddingTop: "10px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Users"
                placeholder="View"
                onChange={(e) => {
                  setSelectedUsers(e);
                }}
                value={selectedUsers}
              />
            )}
          />
          <Switch {...label} /> All day
        </DialogContent>

        <DialogActions>{eventActions}</DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendar;
