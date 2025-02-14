import { useState, useEffect } from "react";

import TicketReady from "@/components/TicketReady";
import TicketSelection from "@/components/TicketSelection";
import AttendeeDetails from "@/components/AttendeeDetails";

const Events = () => {
  const [isShowTicketSelection, setIsShowTicketSelection] = useState(true);
  const [isShowAttendeeDetails, setIsShowAttendeeDetails] = useState(false);
  const [, setIsShowTicketReady] = useState(false);

  const [ticketDetails, setTicketDetails] = useState({
    ticketType: "",
    numberOfTickets: "1",
    name: "",
    email: "",
    specialRequest: "",
    userImageUrl: "",
  });

  const showTicketSelection = () => {
    setIsShowTicketSelection(true);
    setIsShowAttendeeDetails(false);
    setIsShowTicketReady(false);
  };

  const showAttendeeDetails = () => {
    setIsShowAttendeeDetails(true);
    setIsShowTicketSelection(false);
    setIsShowTicketReady(false);
  };

  const showTicketReady = () => {
    setIsShowTicketReady(true);
    setIsShowTicketSelection(false);
    setIsShowAttendeeDetails(false);
  };

  const bookAnotherTicket = () => {
    setIsShowTicketSelection(true);
    setIsShowAttendeeDetails(false);
    setIsShowTicketReady(false);

    setTicketDetails({
      ticketType: "",
      numberOfTickets: "1",
      name: "",
      email: "",
      specialRequest: "",
      userImageUrl: "",
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("ticketDetails");
    if (savedData) {
      setTicketDetails(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
  }, [ticketDetails]);

  return (
    <section>
      {isShowTicketSelection ? (
        <TicketSelection
          next={showAttendeeDetails}
          ticketDetails={ticketDetails}
          setTicketDetails={setTicketDetails}
        />
      ) : isShowAttendeeDetails ? (
        <AttendeeDetails
          previous={showTicketSelection}
          next={showTicketReady}
          ticketDetails={ticketDetails}
          setTicketDetails={setTicketDetails}
        />
      ) : (
        <TicketReady
          bookAnotherTicket={bookAnotherTicket}
          ticketDetails={ticketDetails}
        />
      )}
    </section>
  );
};

export default Events;
